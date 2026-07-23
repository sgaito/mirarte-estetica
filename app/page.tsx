import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HomePhotosSection } from "@/components/home-photos-section"
import { ServicesSection } from "@/components/services-section"
import { SobreEliSection } from "@/components/sobre-eli-section"
import { GallerySection } from "@/components/gallery-section"
import { FeaturedProductSection } from "@/components/featured-product-section"
import { FaqSection } from "@/components/faq-section"
import { ReviewsSection } from "@/components/reviews-section"
import { PrefooterCta } from "@/components/prefooter-cta"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { ELI_CARTA_PRESENTACION_DEFAULT } from "@/lib/eli-presentacion"
import { getSobreEliMedia } from "@/lib/google-drive"
import { detectMobileSafeGridFromUserAgent } from "@/lib/progressive-service-grid"
import { headers } from "next/headers"

export default async function HomePage() {
  const sobreEliMedia = await getSobreEliMedia()
  const ua = (await headers()).get("user-agent") ?? ""
  const mobileSafeGrid = detectMobileSafeGridFromUserAgent(ua)

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HomePhotosSection />
      <ServicesSection mobileSafeGrid={mobileSafeGrid} />
      <SobreEliSection
        cartaParrafos={ELI_CARTA_PRESENTACION_DEFAULT}
        eliPhoto={
          sobreEliMedia.eli
            ? { src: sobreEliMedia.eli.url, alt: `Eli — ${sobreEliMedia.eli.name}` }
            : null
        }
        studioPhotos={sobreEliMedia.estudio.map((img) => ({
          src: img.url,
          alt: `Estudio Mirarte — ${img.name}`,
        }))}
        trabajandoPhotos={(sobreEliMedia.trabajando ?? []).map((img) => ({
          src: img.url,
          alt: `Eli trabajando — ${img.name}`,
        }))}
      />
      <GallerySection />
      {/* Misma superficie: evita junta/corte entre promoter y reseñas */}
      <div className="bg-secondary">
        <FeaturedProductSection />
        <ReviewsSection />
      </div>
      <FaqSection />
      <PrefooterCta />
      <Footer />
      <BackToTop />
    </main>
  )
}
