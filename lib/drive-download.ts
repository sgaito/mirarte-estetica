import { google } from "googleapis"

export interface DriveMediaResult {
  buffer: Buffer
  mimeType: string
}

/**
 * Descarga bytes reales con la cuenta de servicio (evita HTML / descargas truncadas de `uc?export=download`).
 */
export async function downloadDriveMedia(fileId: string): Promise<DriveMediaResult> {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!keyJson) {
    throw new Error("Falta GOOGLE_SERVICE_ACCOUNT_KEY")
  }

  const credentials = JSON.parse(keyJson)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  })

  const drive = google.drive({ version: "v3", auth })

  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "arraybuffer" },
  )

  const buffer = Buffer.from(res.data as ArrayBuffer)
  const raw = res.headers["content-type"]
  const mimeType = typeof raw === "string" && raw ? raw.split(";")[0].trim() : "application/octet-stream"

  return { buffer, mimeType }
}
