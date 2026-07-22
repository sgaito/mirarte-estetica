import { getDriveImages } from "@/lib/google-drive"
import { GalleryMarquee } from "@/components/gallery-marquee"
import { FadeIn } from "@/components/fade-in"
import { SectionSeam } from "@/components/section-seam"

export async function GallerySection() {
  const images = await getDriveImages()

  return (
    <section
      id="galeria"
      className="relative scroll-mt-20 overflow-hidden bg-background py-24 lg:py-32"
    >
      <SectionSeam edge="bottom" to="var(--secondary)" />

      {/* Título centrado */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              Nuestra <span className="heading-emphasis">Galería</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Resultados reales que potencian tu belleza natural y transforman tu mirada.</p>
          </div>
        </FadeIn>
      </div>

      {/* Marquee full-width fuera del contenedor */}
      <div className="relative">
        <GalleryMarquee images={images} />
      </div>
    </section>
  )
}
