import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { SobreEliSection } from "@/components/sobre-eli-section"
import { GallerySection } from "@/components/gallery-section"
import { ReviewsSection } from "@/components/reviews-section"
import { FeaturedProductSection } from "@/components/featured-product-section"
import { FaqSection } from "@/components/faq-section"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"
import { getHeroImage } from "@/lib/google-drive"

export default async function HomePage() {
  const heroImage = await getHeroImage()

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection heroImageSrc={heroImage?.url ?? null} />
      <ServicesSection />
      <SobreEliSection />
      <GallerySection />
      <ReviewsSection />
      <FeaturedProductSection />
      <FaqSection />
      <LocationSection />
      <Footer />
    </main>
  )
}
