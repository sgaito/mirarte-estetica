import { google } from "googleapis"
import { NextRequest, NextResponse } from "next/server"
import type { Readable } from "stream"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Falta el parámetro id" }, { status: 400 })
  }

  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!keyJson) {
    return NextResponse.json({ error: "Credenciales no configuradas" }, { status: 500 })
  }

  try {
    const credentials = JSON.parse(keyJson)

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    })

    const drive = google.drive({ version: "v3", auth })

    const response = await drive.files.get(
      { fileId: id, alt: "media" },
      { responseType: "stream" }
    )

    const nodeStream = response.data as Readable
    const contentType =
      (response.headers as Record<string, string>)["content-type"] ?? "image/jpeg"

    const webStream = new ReadableStream({
      start(controller) {
        nodeStream.on("data", (chunk: Buffer) => {
          controller.enqueue(new Uint8Array(chunk))
        })
        nodeStream.on("end", () => controller.close())
        nodeStream.on("error", (err) => controller.error(err))
      },
      cancel() {
        nodeStream.destroy()
      },
    })

    return new Response(webStream, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      },
    })
  } catch (error) {
    console.error("[drive-image] Error al obtener imagen:", error)
    return NextResponse.json({ error: "No se pudo obtener la imagen" }, { status: 500 })
  }
}
