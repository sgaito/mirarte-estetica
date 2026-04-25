/**
 * Genera public/metadatos-og.webp (1200×630, < ~550 KB) desde public/metadatos.png
 * para Open Graph / X / LinkedIn / WhatsApp.
 *
 * Uso: node scripts/optimize-og-image.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const input = path.join(root, "public", "metadatos.png")
const output = path.join(root, "public", "metadatos-og.webp")
const MAX_BYTES = 580 * 1024 // margen bajo 600 KB

async function main() {
  if (!fs.existsSync(input)) {
    console.error("No existe:", input)
    process.exit(1)
  }

  let quality = 82
  let buf

  for (let attempt = 0; attempt < 12; attempt++) {
    buf = await sharp(input)
      .rotate()
      .resize(1200, 630, { fit: "cover", position: "centre" })
      .webp({ quality, effort: 6 })
      .toBuffer()

    const kb = buf.length / 1024
    console.log(`WebP calidad ${quality}: ${kb.toFixed(1)} KB`)

    if (buf.length <= MAX_BYTES) break
    quality -= 6
    if (quality < 45) {
      console.warn("No se logró < 600 KB con WebP; probá achicar el PNG fuente.")
      break
    }
  }

  fs.writeFileSync(output, buf)
  console.log("Escrito:", output, `→ ${(buf.length / 1024).toFixed(1)} KB`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
