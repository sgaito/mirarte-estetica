"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { FadeIn } from "@/components/fade-in"

const STUDIO_PHOTOS = [
  { src: "/sobre_mi/estudio-ambiente(1).jpg", alt: "Estudio Mirarte — vista general" },
  { src: "/sobre_mi/estudio-ambiente(2).jpg", alt: "Estudio Mirarte — detalle de trabajo" },
  { src: "/sobre_mi/estudio-ambiente(3).jpg", alt: "Estudio Mirarte — ambiente relajante" },
]

function StudioLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-[88dvh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
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

export function SobreEliSection() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <section id="sobre-eli" className="relative scroll-mt-20 overflow-hidden bg-secondary py-20 lg:py-28">
      {/* Destellos decorativos de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.12 185) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.14 185) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow centrado ── */}
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

        {/* ── Dos columnas: foto + texto ── */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14 lg:gap-20">

          {/* Columna izquierda — foto de Eli */}
          <FadeIn direction="none" className="w-full md:w-[42%] lg:w-[38%]">
            <div className="relative">
              {/* Mancha watercolor turquesa detrás de la foto */}
              <div
                aria-hidden
                className="absolute -left-6 -top-6 h-[105%] w-[105%] rounded-[40%_60%_55%_45%/45%_55%_60%_40%] opacity-30 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 40% 40%, oklch(0.85 0.10 185) 0%, oklch(0.78 0.13 185 / 0.5) 50%, transparent 75%)",
                }}
              />
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/sobre_mi/eli-fundadora.jpg"
                    alt="Eli — fundadora de Mirarte Estética"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 38vw"
                  />
                </div>
              </div>
              {/* Pastilla flotante */}
              <div
                className="absolute -bottom-4 -right-4 rounded-2xl bg-background px-4 py-3 shadow-lg"
                style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  Lashista Profesional
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">Fundadora · Mirarte Estética</p>
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
              <p>
                Desde siempre me apasionó el mundo de la estética y cómo un pequeño detalle puede
                transformar la confianza de una persona. Me certifiqué como{" "}
                <strong className="font-medium text-foreground/80">Lashista Profesional</strong> y
                pasé años perfeccionando técnicas de realce natural.
              </p>
              <p>
                <strong className="font-medium text-foreground/80">Mirarte Estética</strong> nació
                de un sueño: crear un espacio donde la delicadeza, la calidad premium y la atención
                personalizada sean la prioridad.
              </p>
              <p>
                Te invito a mi estudio, diseñado para tu relax, donde cada servicio es un arte
                dedicado a resaltar tu belleza única.
              </p>
            </div>

            {/* Separador decorativo */}
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

            {/* Mosaico de ambiente — 3 cols desktop, 2 cols mobile */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {STUDIO_PHOTOS.map((photo, i) => (
                <FadeIn key={photo.src} delay={0.06 * i} direction="none">
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: photo.src, alt: photo.alt })}
                    aria-label={`Ver en grande: ${photo.alt}`}
                    className="group relative block w-full overflow-hidden rounded-2xl shadow-sm ring-offset-2 ring-offset-secondary transition-transform duration-500 hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 18vw"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                    </div>
                    <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium text-primary opacity-0 shadow backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      Ampliar
                    </span>
                  </button>
                </FadeIn>
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
