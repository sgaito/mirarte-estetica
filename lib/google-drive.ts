import { google } from "googleapis"

export interface DriveImage {
  id: string
  name: string
  mimeType: string
  url: string
  width: number
  height: number
}

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

export async function getDriveImages(): Promise<DriveImage[]> {
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

    const files = response.data.files ?? []

    return files
      .filter((f) => Boolean(f.id && f.name && f.mimeType))
      .map((f) => ({
        id: f.id!,
        name: f.name!,
        mimeType: f.mimeType!,
        url: `/api/drive-image?id=${f.id}`,
        width: (f.imageMediaMetadata as any)?.width ?? 4,
        height: (f.imageMediaMetadata as any)?.height ?? 3,
      }))
  } catch (error) {
    console.error("[google-drive] Error al obtener imágenes de galería:", error)
    return []
  }
}

export async function getHeroImage(): Promise<DriveImage | null> {
  const folderId = process.env.DRIVE_HERO_FOLDER_ID
  const auth = makeAuth()

  if (!auth || !folderId) {
    console.warn("[google-drive] Faltan las variables GOOGLE_SERVICE_ACCOUNT_KEY o DRIVE_HERO_FOLDER_ID")
    return null
  }

  try {
    const drive = google.drive({ version: "v3", auth })

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: "files(id, name, mimeType, imageMediaMetadata)",
      pageSize: 20,
      orderBy: "name",
    })

    const files = (response.data.files ?? []).filter(
      (f) => Boolean(f.id && f.name && f.mimeType),
    )
    if (files.length === 0) return null

    const file = files[Math.floor(Math.random() * files.length)]

    return {
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType!,
      url: `/api/drive-image?id=${file.id}`,
      width: (file.imageMediaMetadata as any)?.width ?? 4,
      height: (file.imageMediaMetadata as any)?.height ?? 3,
    }
  } catch (error) {
    console.error("[google-drive] Error al obtener imagen del Hero:", error)
    return null
  }
}
