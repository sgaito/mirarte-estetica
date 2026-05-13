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
    url: `/api/image-proxy?fileId=${f.id}`,
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
  /* v2: URLs migradas a /api/image-proxy — nueva clave invalida caché vieja */
  ["drive-gallery-images", "v2-proxy"],
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
  ["drive-hero-folder-files", "v2-proxy"],
  { revalidate: DRIVE_REVALIDATE_SECONDS, tags: ["drive-hero"] },
)

export async function getHeroImage(): Promise<DriveImage | null> {
  const images = await _getHeroFilesCached()
  if (images.length === 0) return null
  return images[Math.floor(Math.random() * images.length)]
}

/* ─── Sobre Eli (subcarpetas ELI + ESTUDIO) ───────────────── */

/** Raíz con subcarpetas "ELI" y "ESTUDIO". Sobrescribible por env. */
const SOBRE_ELI_ROOT_FOLDER_ID =
  process.env.DRIVE_SOBRE_ELI_ROOT_FOLDER_ID ?? "1179giSNK8ts495qCqaAy1C-nRg2V2glI"

export interface SobreEliMedia {
  /** Primera imagen de la carpeta ELI */
  eli: DriveImage | null
  /** Hasta 6 imágenes de la carpeta ESTUDIO */
  estudio: DriveImage[]
  /** Fotos de Eli trabajando (carpeta TRABAJANDO / TRABAJO bajo la raíz Sobre Eli) */
  trabajando: DriveImage[]
}

function findChildFolderByName(
  folders: { id?: string | null; name?: string | null }[],
  name: string,
): { id: string; name: string } | null {
  const n = name.trim().toLowerCase()
  const f = folders.find((x) => x.id && x.name?.trim().toLowerCase() === n)
  return f?.id && f.name ? { id: f.id, name: f.name } : null
}

async function _fetchSobreEliMediaUncached(): Promise<SobreEliMedia> {
  const auth = makeAuth()
  if (!auth) {
    console.warn("[google-drive] getSobreEliMedia: falta GOOGLE_SERVICE_ACCOUNT_KEY")
    return { eli: null, estudio: [], trabajando: [] }
  }

  try {
    const drive = google.drive({ version: "v3", auth })

    const foldersRes = await drive.files.list({
      q: `'${SOBRE_ELI_ROOT_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: "files(id, name)",
      pageSize: 50,
    })
    const subfolders = foldersRes.data.files ?? []

    const eliFolder = findChildFolderByName(subfolders, "ELI")
    const estudioFolder = findChildFolderByName(subfolders, "ESTUDIO")
    const trabajandoFolder =
      findChildFolderByName(subfolders, "TRABAJANDO") ??
      findChildFolderByName(subfolders, "TRABAJO") ??
      findChildFolderByName(subfolders, "ELI TRABAJANDO")

    let eli: DriveImage | null = null
    const estudio: DriveImage[] = []
    const trabajando: DriveImage[] = []

    if (eliFolder) {
      const eliRes = await drive.files.list({
        q: `'${eliFolder.id}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: "files(id, name, mimeType, imageMediaMetadata)",
        pageSize: 20,
        orderBy: "name",
      })
      const first = (eliRes.data.files ?? [])[0]
      eli = first ? mapFile(first) : null
    }

    if (estudioFolder) {
      const estRes = await drive.files.list({
        q: `'${estudioFolder.id}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: "files(id, name, mimeType, imageMediaMetadata)",
        pageSize: 20,
        orderBy: "name",
      })
      for (const f of (estRes.data.files ?? []).slice(0, 6)) {
        const m = mapFile(f)
        if (m) estudio.push(m)
      }
    }

    if (trabajandoFolder) {
      const trabRes = await drive.files.list({
        q: `'${trabajandoFolder.id}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: "files(id, name, mimeType, imageMediaMetadata)",
        pageSize: 20,
        orderBy: "name",
      })
      for (const f of (trabRes.data.files ?? []).slice(0, 8)) {
        const m = mapFile(f)
        if (m) trabajando.push(m)
      }
    }

    return { eli, estudio, trabajando }
  } catch (error) {
    console.error("[google-drive] Error al obtener medios Sobre Eli:", error)
    return { eli: null, estudio: [], trabajando: [] }
  }
}

export const getSobreEliMedia = unstable_cache(
  _fetchSobreEliMediaUncached,
  /* v4: estudio pasa a mostrar hasta 6 fotos */
  ["sobre-eli-drive-media", "v4-estudio-6", SOBRE_ELI_ROOT_FOLDER_ID],
  { revalidate: DRIVE_REVALIDATE_SECONDS, tags: ["sobre-eli"] },
)
