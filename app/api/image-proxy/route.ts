import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import sharp from "sharp"

/**
 * /api/image-proxy?fileId={driveId}
 *
 * Descarga la imagen desde Drive (autenticado con la service account),
 * la redimensiona a un máximo de 1200 px de ancho, la convierte a WebP
 * con calidad 80 y la devuelve con cabeceras inmutables (1 año).
 *
 * Soporte HEIC/JPG/PNG → WebP automático gracias a sharp.
 * Nota: requiere runtime Node.js (no Edge).
 */

export const runtime = "nodejs"

const MAX_WIDTH = 1200
const WEBP_QUALITY = 80

function makeAuth() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!keyJson) return null
  try {
    return new google.auth.GoogleAuth({
      credentials: JSON.parse(keyJson),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    })
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const fileId = new URL(req.url).searchParams.get("fileId")

  if (!fileId) {
    return new NextResponse("Falta el parámetro fileId", { status: 400 })
  }

  try {
    let imageBuffer: Buffer

    const auth = makeAuth()

    if (auth) {
      /* ── Descarga autenticada vía service account ── */
      const drive = google.drive({ version: "v3", auth })
      const response = await drive.files.get(
        { fileId, alt: "media" },
        { responseType: "arraybuffer" },
      )
      imageBuffer = Buffer.from(response.data as ArrayBuffer)
    } else {
      /* ── Fallback para archivos públicos en Drive ── */
      console.warn("[image-proxy] Sin service account, intentando URL pública")
      const upstream = await fetch(
        `https://drive.google.com/uc?export=download&id=${fileId}`,
        { headers: { "User-Agent": "Mozilla/5.0" } },
      )
      if (!upstream.ok) {
        return new NextResponse("No se pudo obtener la imagen desde Drive", {
          status: upstream.status,
        })
      }
      imageBuffer = Buffer.from(await upstream.arrayBuffer())
    }

    /* ── Optimización con sharp ── */
    const webp = await sharp(imageBuffer)
      .rotate() // respeta EXIF orientation (fotos de iPhone)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer()

    return new NextResponse(webp, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        "Vary": "Accept",
      },
    })
  } catch (error) {
    console.error("[image-proxy] Error al procesar imagen:", error)
    return new NextResponse("Error interno al procesar la imagen", { status: 500 })
  }
}
