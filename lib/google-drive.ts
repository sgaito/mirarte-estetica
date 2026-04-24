import { unstable_cache } from "next/cache"
import { google } from "googleapis"

export interface DriveImage {
  id: string
  name: string
  mimeType: string
  url: string
  width: number
  height: number
}

/* Un único número para cambiar el TTL en todos lados */
const DRIVE_REVALIDATE_SECONDS = 3600

function makeAuth() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!keyJson) return null
  try {
    const credentials = JSON.parse(keyJson)
    return new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    })
  } catch {
    return null
  }
}

function mapFile(f: {
  id?: string | null
  name?: string | null
  mimeType?: string | null
  imageMediaMetadata?: unknown
}): DriveImage | null {
  if (!f.id || !f.name || !f.mimeType) return null
  const meta = f.imageMediaMetadata as { width?: number; height?: number } | undefined
  return {
    id: f.id,
    name: f.name,
    mimeType: f.mimeType,
    url: `/api/drive-image?id=${f.id}`,
    width: meta?.width ?? 4,
    height: meta?.height ?? 3,
  }
}

/* ─── Galería ─────────────────────────────────────────────── */

async function _fetchGalleryImages(): Promise<DriveImage[]> {
  const folderId = process.env.DRIVE_GALLERY_FOLDER_ID
  const auth = makeAuth()

  if (!auth || !folderId) {
    console.warn("[google-drive] Faltan las variables GOOGLE_SERVICE_ACCOUNT_KEY o DRIVE_GALLERY_FOLDER_ID")
    return []
  }

  try {
    const drive = google.drive({ version: "v3", auth })

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: "files(id, name, mimeType, imageMediaMetadata)",
      pageSize: 100,
      orderBy: "name",
    })

    return (response.data.files ?? [])
      .map(mapFile)
      .filter((img): img is DriveImage => img !== null)
  } catch (error) {
    console.error("[google-drive] Error al obtener imágenes de galería:", error)
    return []
  }
}

/**
 * Lista de imágenes de galería.
 * Se cachea 1 h; tras ese tiempo Next.js la sirve igual (stale) mientras
 * refresca la caché en segundo plano → stale-while-revalidate a nivel de datos.
 */
export const getDriveImages = unstable_cache(
  _fetchGalleryImages,
  ["drive-gallery-images"],
  { revalidate: DRIVE_REVALIDATE_SECONDS, tags: ["drive-gallery"] },
)

/* ─── Hero ────────────────────────────────────────────────── */

async function _fetchHeroFiles(): Promise<DriveImage[]> {
  const folderId = process.env.DRIVE_HERO_FOLDER_ID
  const auth = makeAuth()

  if (!auth || !folderId) {
    console.warn("[google-drive] Faltan las variables GOOGLE_SERVICE_ACCOUNT_KEY o DRIVE_HERO_FOLDER_ID")
    return []
  }

  try {
    const drive = google.drive({ version: "v3", auth })

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: "files(id, name, mimeType, imageMediaMetadata)",
      pageSize: 20,
      orderBy: "name",
    })

    return (response.data.files ?? [])
      .map(mapFile)
      .filter((img): img is DriveImage => img !== null)
  } catch (error) {
    console.error("[google-drive] Error al obtener imágenes del Hero:", error)
    return []
  }
}

/* La lista de archivos se cachea; la selección aleatoria ocurre en cada request */
const _getHeroFilesCached = unstable_cache(
  _fetchHeroFiles,
  ["drive-hero-folder-files"],
  { revalidate: DRIVE_REVALIDATE_SECONDS, tags: ["drive-hero"] },
)

export async function getHeroImage(): Promise<DriveImage | null> {
  const images = await _getHeroFilesCached()
  if (images.length === 0) return null
  return images[Math.floor(Math.random() * images.length)]
}
