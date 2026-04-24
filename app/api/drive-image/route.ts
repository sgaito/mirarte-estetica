import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return new Response("Falta el parámetro id", { status: 400 })
  }

  try {
    const driveUrl = `https://drive.google.com/uc?export=download&id=${id}`

    const upstream = await fetch(driveUrl, {
      headers: {
        // Evitar que Drive devuelva la página de advertencia de virus para archivos grandes
        "User-Agent": "Mozilla/5.0",
      },
      // Cachear el fetch interno de Next.js 1 h (stale-while-revalidate implícito)
      next: { revalidate: 3600 },
    })

    if (!upstream.ok) {
      return new Response("No se pudo obtener la imagen desde Drive", {
        status: upstream.status,
      })
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg"

    // Pasar el stream directamente sin bufferear en memoria
    return new Response(upstream.body, {
      headers: {
        "Content-Type": contentType,
        // 1 h fresco; luego servir stale mientras se revalida en background (SWR)
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("[drive-image] Error al obtener imagen:", error)
    return new Response("Error interno al obtener la imagen", { status: 500 })
  }
}
