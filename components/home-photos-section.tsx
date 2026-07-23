import Image from "next/image"
import { Heart, Sparkles, Star } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { GoogleGIcon, FiveStars } from "@/components/google-rating"
import { CERTIFICACION_FLAGS } from "@/lib/certificacion-flags"

const HOME_PHOTOS = [
  { src: "/home/4.jpg", alt: "Mirarte Estética — ambiente del estudio" },
  { src: "/home/IMG_4900.jpg", alt: "Mirarte Estética — trabajo de pestañas" },
  {
    src: "/home/B763073A-A3AD-4B5B-A1F5-9E58E9F70130.JPG.jpeg",
    alt: "Mirarte Estética — detalle de servicio",
  },
] as const

const TRUST_ITEMS = [
  {
    key: "google",
    text: "N° 1 en Rosario avalado por reseñas Google.",
    Icon: Star,
  },
  {
    key: "pionera",
    text: "Pionera en Rosario.",
    Icon: Sparkles,
  },
  {
    key: "clientas",
    text: "+2.000 clientas satisfechas.",
    Icon: Heart,
  },
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

            <ul
              className="mx-auto mt-5 grid max-w-xl grid-cols-1 gap-2.5 text-left sm:mt-6 sm:grid-cols-3 sm:gap-3"
              style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
              aria-label="Respaldo Mirarte"
            >
              {TRUST_ITEMS.map(({ key, text, Icon }) => {
                const isGoogle = key === "google"
                return (
                  <li
                    key={key}
                    className="flex h-full rounded-2xl border border-primary/12 bg-primary/[0.05] px-3.5 py-3.5 backdrop-blur-[2px]"
                  >
                    {isGoogle ? (
                      <div className="flex w-full flex-col gap-2 sm:items-center sm:gap-2.5 sm:text-center">
                        {/* Logo + texto alineados en el mismo eje vertical */}
                        <div className="flex items-center gap-3 sm:flex-col sm:gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <GoogleGIcon className="h-4 w-4" />
                          </div>
                          <p className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-foreground/80 sm:min-h-[2.5rem] sm:flex-none sm:text-xs">
                            {text}
                          </p>
                        </div>
                        <div className="flex gap-3 sm:block">
                          <span className="h-0 w-8 shrink-0 sm:hidden" aria-hidden />
                          <div className="flex flex-1 justify-center">
                            <FiveStars className="-translate-x-5 sm:translate-x-0" starClassName="h-2.5 w-2.5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full items-center gap-3 sm:flex-col sm:items-center sm:justify-start sm:gap-2.5 sm:text-center">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                        </div>
                        <p className="min-w-0 text-[13px] font-medium leading-snug text-foreground/80 sm:min-h-[2.5rem] sm:text-xs">
                          {text}
                        </p>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
