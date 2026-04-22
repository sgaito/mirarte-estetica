import { google } from "googleapis"

export interface DriveImage {
  id: string
  name: string
  mimeType: string
  url: string
  width: number
  height: number
}

export async function getDriveImages(): Promise<DriveImage[]> {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  const folderId = process.env.DRIVE_FOLDER_ID

  if (!keyJson || !folderId) {
    console.warn("[google-drive] Faltan las variables GOOGLE_SERVICE_ACCOUNT_KEY o DRIVE_FOLDER_ID")
    return []
  }

  try {
    const credentials = JSON.parse(keyJson)

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    })

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
    console.error("[google-drive] Error al obtener imágenes:", error)
    return []
  }
}
