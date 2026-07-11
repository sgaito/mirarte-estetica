import Image from "next/image"
import { FadeIn } from "@/components/fade-in"

const HOME_PHOTOS = [
  { src: "/home/4.jpg", alt: "Mirarte Estética — ambiente del estudio" },
  { src: "/home/IMG_4900.jpg", alt: "Mirarte Estética — trabajo de pestañas" },
  {
    src: "/home/B763073A-A3AD-4B5B-A1F5-9E58E9F70130.JPG.jpeg",
    alt: "Mirarte Estética — detalle de servicio",
  },
] as const

export function HomePhotosSection() {
  return (
    <section
      aria-label="Fotos del estudio"
      className="relative z-10 -mt-5 bg-[var(--hero-services-seam)] pb-3 pt-0 sm:mt-0 sm:pb-4 sm:pt-4"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
          {HOME_PHOTOS.map((photo, i) => (
            <FadeIn key={photo.src} delay={0.08 * i} direction="none">
              <div className="relative overflow-hidden rounded-xl shadow-sm ring-1 ring-black/[0.04] sm:rounded-2xl">
                <div className="relative aspect-[3/4] w-full sm:aspect-[16/10] md:aspect-[5/3]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, 33vw"
                    priority={i === 0}
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
