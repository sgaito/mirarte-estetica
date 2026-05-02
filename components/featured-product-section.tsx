"use client"

import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"
import {
  X, Check, Droplets, Zap, Sparkles, ZoomIn,
  Leaf, ShieldCheck, Eye, FlaskConical,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { FadeIn } from "@/components/fade-in"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

/* ─── Constantes ─────────────────────────────────────────── */

const WA_PRODUCT_URL =
  "https://wa.me/5493416367119?text=%C2%A1Hola%20Eli!%20Vi%20el%20Exel%20Promoter%20en%20la%20web%20y%20me%20gustar%C3%ADa%20consultar%20stock%20para%20comprarlo.%20%C2%A1Gracias!"

const THUMBNAILS = [
  { src: "/producto/popup-botella.jpeg",     alt: "Botella Exel Promoter" },
  { src: "/producto/popup-ingredientes.PNG",  alt: "Ingredientes naturales" },
  { src: "/producto/popup-detalle-ojo.PNG",   alt: "Detalle de ojo" },
  { src: "/producto/fotoxtra1.PNG",           alt: "Foto extra 1" },
  { src: "/producto/fotoxtra2.PNG",           alt: "Foto extra 2" },
  { src: "/producto/fotoxtra3.PNG",           alt: "Foto extra 3" },
]

const BENEFITS = [
  { icon: Sparkles, text: "Crecimiento y grosor — pestañas y cejas más largas y tupidas" },
  { icon: Zap,      text: "Acción antioxidante — vitaminas A, C, E, B3, B5 y Biotina" },
  { icon: Droplets, text: "Hidratación periocular — humecta párpados y previene arrugas finas" },
  { icon: Check,    text: "Compatible con extensiones, microblading y lifting" },
]

const BADGES = [
  { icon: Leaf,         label: "Cruelty Free" },
  { icon: ShieldCheck,  label: "Sin Parabenos" },
  { icon: Eye,          label: "Ojos Sensibles" },
  { icon: FlaskConical, label: "Hipoalergénico" },
]

const BADGES_SHORT = BADGES.slice(0, 3)


const STEPS = [
  "Cerrá los ojos.",
  "Rociá el spray a 15–20 cm de distancia.",
  "Mantené los párpados cerrados por 5 segundos.",
]

const SLIDE_INTERVAL = 3000

/* ─── Lightbox ───────────────────────────────────────────── */

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", h)
    return () => document.removeEventListener("keydown", h)
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
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
          onClick={onClose}
          aria-label="Cerrar imagen"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ─── Modal del producto ─────────────────────────────────── */

function ProductModal({ onClose }: { onClose: () => void }) {
  const [mainImg, setMainImg]   = useState(0)
  const [zoomed, setZoomed]     = useState(false)
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null)
  const timerRef                = useRef<ReturnType<typeof setInterval> | null>(null)

  /* Auto-avance cada 3 s — se reinicia al hacer click manual */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setMainImg((prev) => (prev + 1) % THUMBNAILS.length)
    }, SLIDE_INTERVAL)
  }, [])

  useEffect(() => {
    if (zoomed) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer, zoomed])

  const handleThumbClick = (i: number) => {
    setMainImg(i)
    startTimer() // reinicia el timer al seleccionar manualmente
  }

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape" && !zoomed) onClose() },
    [onClose, zoomed],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [handleKey])

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
      >
        {/* Alto fijo = 90dvh → el body llena el espacio restante; scroll solo aparece si el zoom del browser achica el contenido */}
        <motion.div
          className="relative flex w-[95%] max-w-3xl flex-col rounded-3xl bg-background shadow-2xl md:max-w-[76rem]"
          style={{ height: "90dvh" }}
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 16 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cabecera compacta */}
          <div className="flex flex-shrink-0 items-center justify-between border-b border-border px-4 py-3 sm:px-6">
            <div>
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary"
                style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
              >
                Producto destacado
              </p>
              <h2
                className="text-sm font-semibold text-foreground sm:text-base"
                style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
              >
                Exel Promoter
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="flex h-7 w-7 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 active:scale-90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Cuerpo: flex-1 min-h-0 → llena el alto disponible; overflow-y-auto = fallback para zoom alto */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto sm:flex-row sm:overflow-hidden">
            <div className="flex h-full flex-col gap-0 sm:flex-row sm:items-stretch">

              {/* ── Galería ── */}
              <div className="flex w-full flex-col gap-2 p-4 sm:w-[42%] sm:flex-shrink-0 sm:p-5">
                {/* Imagen: 1:1 en mobile, flex-1 en desktop (llena el alto disponible) */}
                <div className="group relative aspect-square w-full overflow-hidden rounded-xl sm:aspect-auto sm:flex-1 sm:min-h-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mainImg}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={THUMBNAILS[mainImg].src}
                        alt={THUMBNAILS[mainImg].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw, 380px"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Zoom */}
                  <button
                    onClick={() => {
                      setZoomedImage(THUMBNAILS[mainImg])
                      setZoomed(true)
                    }}
                    aria-label="Ver imagen completa"
                    className="absolute inset-0 flex items-end justify-end p-2.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  >
                    <span className="flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-semibold text-primary shadow backdrop-blur-sm">
                      <ZoomIn className="h-3 w-3" />
                      Ampliar
                    </span>
                  </button>

                  {/* Indicadores */}
                  <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {THUMBNAILS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleThumbClick(i)}
                        aria-label={`Foto ${i + 1}`}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          mainImg === i ? "w-4 bg-primary" : "w-1 bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex flex-shrink-0 gap-1.5 overflow-x-auto">
                  {THUMBNAILS.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => handleThumbClick(i)}
                      aria-label={t.alt}
                      className={`relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg transition-all active:scale-95 sm:h-12 sm:w-12 ${
                        mainImg === i ? "ring-2 ring-primary shadow-sm" : "opacity-50 hover:opacity-85"
                      }`}
                    >
                      <Image src={t.src} alt={t.alt} fill className="object-cover" sizes="48px" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Divisor vertical */}
              <div className="hidden w-px flex-shrink-0 bg-border sm:block" />

              {/* ── Info: justify-between → botón al fondo alineado con thumbnails ── */}
              <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4 sm:overflow-hidden sm:p-5">

                {/* Contenido */}
                <div className="flex flex-col gap-3.5">

                  {/* Título */}
                  <div>
                    <h3
                      className="text-base font-semibold leading-snug text-foreground"
                      style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
                    >
                      Liposomas en Spray para Pestañas y Cejas
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Nanotecnología biotecnológica · 15 ml
                    </p>
                  </div>

                  {/* Bajada */}
                  <p className="text-xs leading-relaxed text-foreground/70">
                    Aplicación en spray ultra rápida. Sus <strong className="font-medium text-foreground/85">liposomas</strong> llevan
                    los nutrientes directamente a las células del vello para fortalecer desde la raíz.
                  </p>

                  {/* Beneficios */}
                  <div>
                    <p
                      className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                      style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
                    >
                      Beneficios
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {BENEFITS.map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-start gap-2 text-xs text-foreground/80">
                          <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/12">
                            <Icon className="h-2.5 w-2.5 text-primary" strokeWidth={2.5} />
                          </span>
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Modo de uso */}
                  <div className="rounded-xl bg-secondary px-3 py-2.5">
                    <p
                      className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-primary"
                      style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
                    >
                      Modo de uso
                    </p>
                    <ol className="flex flex-col gap-1">
                      {STEPS.map((s, i) => (
                        <li key={i} className="flex gap-1.5 text-[11px] text-muted-foreground">
                          <span className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">
                            {i + 1}
                          </span>
                          {s}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-1.5 text-[10px] italic text-muted-foreground/70">
                      2–3 veces por día, ¡incluso sobre el maquillaje!
                    </p>
                  </div>

                  {/* Sellos */}
                  <div className="flex flex-wrap gap-1.5">
                    {BADGES.map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] text-muted-foreground"
                      >
                        <Icon className="h-2.5 w-2.5 text-primary/70" strokeWidth={1.75} />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botón WA — fondo de la columna, mismo nivel que thumbnails */}
                <a
                  href={WA_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-semibold text-white shadow transition-all hover:brightness-105 active:scale-95 sm:w-auto"
                  style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 flex-shrink-0" />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomed && zoomedImage && (
          <ImageLightbox
            src={zoomedImage.src}
            alt={zoomedImage.alt}
            onClose={() => {
              setZoomed(false)
              setZoomedImage(null)
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Sección principal ──────────────────────────────────── */

export function FeaturedProductSection() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section id="promoter" className="relative scroll-mt-20 overflow-hidden bg-secondary py-20 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, oklch(0.82 0.12 178) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.12 178) 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <FadeIn>
            <div className="mb-12 text-center lg:mb-16">
              <p
                className="text-xs font-semibold uppercase tracking-[0.25em] text-primary"
                style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
              >
                Producto Destacado
              </p>
              <h2
                className="mt-1 text-3xl font-light tracking-tight text-foreground sm:text-4xl"
                style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
              >
                Lo que <span className="heading-emphasis">Recomendamos</span>
              </h2>
            </div>
          </FadeIn>

          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14 lg:gap-20">

            <FadeIn direction="none" className="w-full md:w-[46%] lg:w-[42%]">
              <button
                onClick={() => setOpen(true)}
                aria-label="Ver detalles del producto"
                className="group relative block w-full overflow-hidden rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.025] active:scale-[0.98]"
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/producto/producto-main-beauty.PNG"
                    alt="Exel Promoter — modelo con burbujas de vitaminas"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 40vw"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-primary/0 transition-colors duration-300 group-hover:bg-primary/8" />
                </div>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/90 px-4 py-1.5 text-xs font-semibold text-primary opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  Ver detalles →
                </span>
              </button>
            </FadeIn>





            <FadeIn delay={0.12} className="flex w-full flex-col items-start gap-5 md:w-[54%] lg:w-[58%]">
              <div>
                <h2
                  className="text-3xl font-semibold uppercase tracking-[0.12em] text-primary sm:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
                >
                  Realzá tu Mirada
                </h2>
                <p
                  className="mt-1 text-2xl text-foreground/55 sm:text-3xl"
                  style={{ fontFamily: "var(--font-script), Great Vibes, cursive" }}
                >
                  Con Exel Promoter
                </p>
              </div>

              <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                Potenciador vitamínico en spray con nanotecnología de liposomas para el crecimiento y
                fortalecimiento de pestañas y cejas. Resultados visibles en 60 días.
              </p>

              <ul className="flex flex-col gap-2.5">
                {BENEFITS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-2.5 text-sm text-foreground/75">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/12">
                      <Icon className="h-3 w-3 text-primary" strokeWidth={2.5} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              {/* Sellos con íconos */}
              <div className="flex flex-wrap gap-2">
                {BADGES_SHORT.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground"
                  >
                    <Icon className="h-3 w-3 text-primary/70" strokeWidth={1.75} />
                    {label}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setOpen(true)}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow transition-all hover:shadow-md hover:brightness-105 active:scale-95 sm:w-auto sm:px-9"
                style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
              >
                Ver más
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && <ProductModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
