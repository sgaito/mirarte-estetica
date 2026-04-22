import { getDriveImages } from "@/lib/google-drive"
import { GalleryMarquee } from "@/components/gallery-marquee"
import { FadeIn } from "@/components/fade-in"

export async function GallerySection() {
  const images = await getDriveImages()

  return (
    <section id="galeria" className="bg-background py-24 scroll-mt-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              Nuestra <span className="font-semibold">Galería</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Conoce nuestros espacios diseñados para tu comodidad y bienestar.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} direction="none">
          <GalleryMarquee images={images} />
        </FadeIn>
      </div>
    </section>
  )
}
