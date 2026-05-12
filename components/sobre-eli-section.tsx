"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { FadeIn } from "@/components/fade-in"

export interface SobreEliImageSlot {
  src: string
  alt: string
}

export interface SobreEliSectionProps {
  /** Párrafos de la carta de presentación. */
  cartaParrafos: string[]
  eliPhoto: SobreEliImageSlot | null
  studioPhotos: SobreEliImageSlot[]
  /** Fotos de Eli trabajando (carpeta TRABAJANDO en Drive). */
  trabajandoPhotos?: SobreEliImageSlot[]
}

/** Banderas como imágenes (los emoji suelen verse como “AR”, “US”, etc. en Windows). */
const CERTIFICACION_FLAGS = [
  { code: "ar", label: "Argentina" },
  { code: "us", label: "Estados Unidos" },
  { code: "mx", label: "México" },
  { code: "gb", label: "Reino Unido" },
  { code: "pe", label: "Perú" },
] as const

/** Detecta si una imagen viene de nuestro proxy Drive (cualquier versión). */
function isDriveProxySrc(src: string) {
  return src.startsWith("/api/image-proxy") || src.startsWith("/api/drive-image")
}

/* ─── Imagen con skeleton crema ─────────────────────────────────────────── */

function ProxyImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: string
  alt: string
  sizes: string
  className?: string
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: "oklch(0.95 0.02 178 / 0.6)" }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={isDriveProxySrc(src)}
        className={`${className ?? ""} transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
      />
    </>
  )
}

/* ─── Lightbox ───────────────────────────────────────────────────────────── */

function StudioLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[90dvh] max-w-[90vw]"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {!loaded && (
          <div
            className="absolute inset-0 animate-pulse rounded-2xl"
            style={{ background: "oklch(0.18 0 0 / 0.5)" }}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`max-h-[88dvh] max-w-[88vw] rounded-2xl object-contain shadow-2xl transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ─── Thumb genérico con skeleton ────────────────────────────────────────── */

function PhotoThumb({
  photo,
  delay,
  onOpen,
}: {
  photo: SobreEliImageSlot
  delay: number
  onOpen: () => void
}) {
  return (
    <FadeIn delay={delay} direction="none">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ver en grande: ${photo.alt}`}
        className="group relative block w-full overflow-hidden rounded-2xl shadow-sm ring-offset-2 ring-offset-secondary transition-transform duration-500 hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]"
      >
        <div className="relative aspect-square w-full">
          <ProxyImage
            src={photo.src}
            alt={photo.alt}
            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 18vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        </div>
        <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium text-primary opacity-0 shadow backdrop-blur-sm transition-opacity group-hover:opacity-100">
          Ampliar
        </span>
      </button>
    </FadeIn>
  )
}

/* ─── Sección principal ──────────────────────────────────────────────────── */

export function SobreEliSection({
  cartaParrafos,
  eliPhoto,
  studioPhotos,
  trabajandoPhotos = [],
}: SobreEliSectionProps) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  const eliSrc = eliPhoto?.src ?? "/placeholder.jpg"
  const eliAlt = eliPhoto?.alt ?? "Eli — fundadora de Mirarte Estética"

  return (
    <section id="sobre-eli" className="relative scroll-mt-20 overflow-hidden bg-secondary py-20 lg:py-28">
      {/* Destellos decorativos */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.12 178) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.14 178) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <FadeIn>
          <div className="mb-12 text-center lg:mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em] text-primary"
              style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
            >
              Nuestra Historia
            </p>
            <h2
              className="mt-1 text-3xl font-light tracking-tight text-foreground sm:text-4xl"
              style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
            >
              Conocé a Eli &amp;{" "}
              <span className="heading-emphasis">Mirarte Estética</span>
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14 lg:gap-20">

          {/* Columna izquierda — foto de Eli */}
          <FadeIn direction="none" className="w-full md:w-[42%] lg:w-[38%]">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -left-6 -top-6 h-[105%] w-[105%] rounded-[40%_60%_55%_45%/45%_55%_60%_40%] opacity-30 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 40% 40%, oklch(0.85 0.10 178) 0%, oklch(0.78 0.13 178 / 0.5) 50%, transparent 75%)",
                }}
              />
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <div className="relative aspect-[3/4] w-full">
                  <ProxyImage
                    src={eliSrc}
                    alt={eliAlt}
                    sizes="(max-width: 768px) 90vw, 38vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div
                className="absolute -bottom-4 -right-4 rounded-2xl bg-background px-4 py-3 shadow-lg"
                style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary leading-snug">
                  Lashista Profesional Certificada
                </p>
                <div
                  className="mt-1.5 flex flex-wrap items-center gap-1"
                  role="img"
                  aria-label={`Certificaciones: ${CERTIFICACION_FLAGS.map((f) => f.label).join(", ")}`}
                >
                  {CERTIFICACION_FLAGS.map(({ code, label }) => (
                    <img
                      key={code}
                      src={`https://flagcdn.com/w40/${code}.png`}
                      alt={label}
                      width={22}
                      height={15}
                      loading="lazy"
                      decoding="async"
                      className="h-[15px] w-auto rounded-[2px] object-cover shadow-sm ring-1 ring-black/10"
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground leading-snug">
                  Fundadora de Mirarte Estética
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Columna derecha — texto */}
          <FadeIn delay={0.12} className="flex w-full flex-col gap-5 md:w-[58%] lg:w-[62%]">
            <div>
              <h3
                className="text-2xl font-semibold uppercase tracking-[0.1em] text-primary sm:text-3xl"
                style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
              >
                Soy Eliana, la Mirada<br className="hidden sm:block" /> detrás de Mirarte Estética
              </h3>
              <p
                className="mt-2 text-xl text-foreground/50 sm:text-2xl"
                style={{ fontFamily: "var(--font-script), Great Vibes, cursive" }}
              >
                Pasión, arte y dedicación
              </p>
            </div>

            <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {cartaParrafos.map((bloque, i) => (
                <p key={i}>{bloque}</p>
              ))}
            </div>

            {/* Fotos de Eli trabajando (si Drive las tiene) */}
            {trabajandoPhotos.length > 0 && (
              <>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <p
                    className="text-base text-primary/60 sm:text-lg"
                    style={{ fontFamily: "var(--font-script), Great Vibes, cursive" }}
                  >
                    Eli trabajando
                  </p>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {trabajandoPhotos.map((photo, i) => (
                    <PhotoThumb
                      key={photo.src}
                      photo={photo}
                      delay={0.05 * i}
                      onOpen={() => setLightbox({ src: photo.src, alt: photo.alt })}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Separador */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <p
                className="text-base text-primary/60 sm:text-lg"
                style={{ fontFamily: "var(--font-script), Great Vibes, cursive" }}
              >
                El estudio
              </p>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Mosaico del estudio */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {studioPhotos.map((photo, i) => (
                <PhotoThumb
                  key={photo.src}
                  photo={photo}
                  delay={0.06 * i}
                  onOpen={() => setLightbox({ src: photo.src, alt: photo.alt })}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <StudioLightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
