import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { SobreEliSection } from "@/components/sobre-eli-section"
import { GallerySection } from "@/components/gallery-section"
import { FeaturedProductSection } from "@/components/featured-product-section"
import { FaqSection } from "@/components/faq-section"
import { LocationSection } from "@/components/location-section"
import { ReviewsSection } from "@/components/reviews-section"
import { Footer } from "@/components/footer"
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
      <LocationSection />
      <FeaturedProductSection />
      <ReviewsSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
