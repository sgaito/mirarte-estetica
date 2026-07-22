import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { CERTIFICACION_FLAGS } from "@/lib/certificacion-flags"

const HOME_PHOTOS = [
  { src: "/home/4.jpg", alt: "Mirarte Estética — ambiente del estudio" },
  { src: "/home/IMG_4900.jpg", alt: "Mirarte Estética — trabajo de pestañas" },
  {
    src: "/home/B763073A-A3AD-4B5B-A1F5-9E58E9F70130.JPG.jpeg",
    alt: "Mirarte Estética — detalle de servicio",
  },
] as const

const TRUST_LINES = [
  "N° 1 en Rosario avalado por reseñas Google.",
  "Una de las pioneras en especializarse en este servicio en Rosario.",
  "+2.000 clientas satisfechas.",
] as const

function CertificacionFlags({ size = "sm" }: { size?: "sm" | "md" }) {
  const height = size === "sm" ? 12 : 15
  const width = size === "sm" ? 18 : 22

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-1"
      role="img"
      aria-label={`Certificaciones: ${CERTIFICACION_FLAGS.map((f) => f.label).join(", ")}`}
    >
      {CERTIFICACION_FLAGS.map(({ code, label }) => (
        <img
          key={code}
          src={`https://flagcdn.com/w40/${code}.png`}
          alt={label}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="rounded-[2px] object-cover shadow-sm ring-1 ring-black/10"
          style={{ height, width: "auto" }}
        />
      ))}
    </div>
  )
}

export function HomePhotosSection() {
  return (
    <section
      aria-label="Fotos del estudio"
      className="relative z-10 -mt-5 bg-[var(--hero-services-seam)] pb-6 pt-0 sm:mt-0 sm:pb-8 sm:pt-4"
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

        <FadeIn delay={0.2}>
          <div className="mx-auto mt-5 max-w-3xl text-center sm:mt-7">
            <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-center sm:gap-2.5">
              <p
                className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]"
                style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
              >
                Contamos con certificaciones internacionales
              </p>
              <CertificacionFlags />
            </div>

            <ul className="mt-4 space-y-1.5 sm:mt-5 sm:space-y-2">
              {TRUST_LINES.map((line) => (
                <li
                  key={line}
                  className="text-xs leading-snug text-foreground/75 sm:text-sm"
                  style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
