"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Leaf,
  MessageCircleHeart,
  ShieldCheck,
  ImageIcon,
  Sparkles,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn } from "@/components/fade-in"
import {
  SERVICES_CATALOG,
  ELI_EXTENSIONES_PREMIUM_INTRO,
  ELI_EXTENSIONES_PREMIUM_HIGHLIGHTS,
  ELI_EXTENSIONES_PREMIUM_IMAGES,
  ELI_ASESORAMIENTO_EXTENSIONES,
  ELI_COMO_ASISTIR_CITA_PESTANAS,
  ELI_COMO_RESERVAR_TURNO_PESTANAS,
  DESCRIPCION_SERVICIO_PENDIENTE,
  type ServiceItem,
  type ServiceCategory,
} from "@/lib/services-catalog"
import { getInitialVisibleCount } from "@/lib/progressive-service-grid"
import { useProgressiveServiceGrid } from "@/lib/use-progressive-service-grid"

/* ─── Constants ───────────────────────────────────────────────────────────── */

const WA_SERVICE = (name: string) =>
  `https://wa.me/5493416367119?text=${encodeURIComponent(
    `Hola Mirarte Estética! Quiero consultar por el servicio de ${name}.`,
  )}`

/** Continúa desde el mismo tono opaco que el final del Hero (`--hero-services-seam`). */
const SECTION_SURFACE_CLASS =
  "bg-gradient-to-b from-[var(--hero-services-seam)] via-[oklch(0.976_0.012_178)] to-[oklch(0.964_0.022_75/0.22)]"

/* ─── WhatsApp icon ───────────────────────────────────────────────────────── */

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ─── Extensiones seda premium (texto de Eli) ─────────────────────────────── */

function ExtensionesPremiumIntro() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const hasMultipleImages = ELI_EXTENSIONES_PREMIUM_IMAGES.length > 1
  const premiumHighlightIcons = [ShieldCheck, Leaf, Sparkles] as const

  const prevImage = useCallback(() => {
    setSelectedIdx((current) => {
      if (current === null) return current
      return (current - 1 + ELI_EXTENSIONES_PREMIUM_IMAGES.length) % ELI_EXTENSIONES_PREMIUM_IMAGES.length
    })
  }, [])

  const nextImage = useCallback(() => {
    setSelectedIdx((current) => {
      if (current === null) return current
      return (current + 1) % ELI_EXTENSIONES_PREMIUM_IMAGES.length
    })
  }, [])

  useEffect(() => {
    if (selectedIdx === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIdx(null)
      if (e.key === "ArrowLeft" && hasMultipleImages) prevImage()
      if (e.key === "ArrowRight" && hasMultipleImages) nextImage()
    }

    const prevOverflow = document.body.style.overflow
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [selectedIdx, hasMultipleImages, prevImage, nextImage])

  return (
    <>
      <div
        className="rounded-2xl border border-border/60 bg-card/90 px-4 py-4 shadow-sm sm:px-5 sm:py-5"
        style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Extensiones de pestaña — seda premium
        </p>

        <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-stretch md:gap-8">
          <div className="min-w-0 flex-1 space-y-4">
            <p
              className="text-sm leading-relaxed text-foreground/85 sm:text-base"
              style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
            >
              {ELI_EXTENSIONES_PREMIUM_INTRO}
            </p>
            <ul className="grid grid-cols-1 gap-3" aria-label="Certificaciones y materiales">
              {ELI_EXTENSIONES_PREMIUM_HIGHLIGHTS.map((text, index) => {
                const Icon = premiumHighlightIcons[index] ?? Sparkles

                return (
                  <li
                    key={text}
                    className="rounded-2xl border border-emerald-700/15 bg-emerald-50 p-3.5 dark:border-emerald-400/25 dark:bg-emerald-950/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-600/20 bg-emerald-600/10 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-500/15 dark:text-emerald-300">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <p className="min-w-0 text-sm font-semibold leading-snug text-foreground/90">
                        {text}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Móvil: miniaturas centradas */}
          <div
            className="mx-auto grid w-full max-w-[13rem] grid-cols-2 gap-2.5 md:hidden"
            aria-label="Fotos de extensiones seda premium"
          >
            {ELI_EXTENSIONES_PREMIUM_IMAGES.map((image, index) => (
              <button
                key={`mobile-${image.src}`}
                type="button"
                onClick={() => setSelectedIdx(index)}
                className="group relative aspect-[5/7] w-full overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Abrir imagen ${index + 1} de extensiones de pestañas`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="104px"
                />
              </button>
            ))}
          </div>

          {/* PC: altura de la caja de texto, dos fotos lado a lado */}
          <div
            className="hidden h-full min-h-[16rem] w-[min(40%,22rem)] max-w-[420px] shrink-0 gap-3 md:flex md:self-stretch lg:min-h-[18rem]"
            aria-label="Fotos de extensiones seda premium"
          >
            {ELI_EXTENSIONES_PREMIUM_IMAGES.map((image, index) => (
              <button
                key={`desktop-${image.src}`}
                type="button"
                onClick={() => setSelectedIdx(index)}
                className="group relative h-full min-h-0 min-w-0 flex-1 overflow-hidden rounded-xl border border-border/50 bg-muted/30 shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Abrir imagen ${index + 1} de extensiones de pestañas`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="210px"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelectedIdx(null)}
          >
            <div
              className="relative w-full max-w-4xl rounded-3xl bg-background p-3 shadow-2xl sm:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedIdx(null)}
                aria-label="Cerrar imagen"
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
              >
                <X className="h-5 w-5" />
              </button>

              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Imagen anterior"
                    className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Imagen siguiente"
                    className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <motion.div
                key={ELI_EXTENSIONES_PREMIUM_IMAGES[selectedIdx].src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="relative flex h-[75vh] items-center justify-center overflow-hidden rounded-2xl bg-muted/30"
              >
                <Image
                  src={ELI_EXTENSIONES_PREMIUM_IMAGES[selectedIdx].src}
                  alt={ELI_EXTENSIONES_PREMIUM_IMAGES[selectedIdx].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Asesoramiento (turquesa) — solo texto de Eli ───────────────────────── */

function AsesoramientoCallout() {
  return (
    <div className="rounded-2xl border border-primary/25 bg-primary/8 px-5 py-5 sm:px-6 sm:py-6 lg:bg-gradient-to-br lg:from-[oklch(0.9_0.08_178/0.45)] lg:via-[oklch(0.94_0.05_178/0.35)] lg:to-[oklch(0.96_0.02_190/0.4)]">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
          <MessageCircleHeart className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary"
            style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
          >
            Asesoramiento
          </p>
          <p
            className="mt-2 text-sm leading-relaxed text-foreground/85 sm:text-base"
            style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
          >
            {ELI_ASESORAMIENTO_EXTENSIONES}
          </p>
        </div>
      </div>
    </div>
  )
}

const pestanasBlockFont = { fontFamily: "var(--font-display), Montserrat, sans-serif" } as const

/**
 * Móvil: toggle simple. Chrome rompe el estado CERRADO con <details> o con
 * pastilla redonda + ChevronDown (capas GPU). Abierto = solo texto + lista.
 */
function PestanasAccordionMobile({
  title,
  listType,
  items,
}: {
  title: string
  listType: "ul" | "ol"
  items: readonly string[]
}) {
  const [open, setOpen] = useState(false)
  const listClass =
    "mt-3 space-y-2 pl-4 text-sm leading-relaxed text-foreground/85 " +
    (listType === "ol" ? "list-decimal" : "list-disc")

  return (
    <div
      className="rounded-2xl border border-border/60 bg-card px-4 py-4 sm:px-5 sm:py-5"
      style={pestanasBlockFont}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
        {title}
      </p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-3 text-xs font-semibold text-primary underline underline-offset-2"
        aria-expanded={open}
      >
        {open ? "Ver menos" : "Ver más"}
      </button>
      {open ? (
        listType === "ul" ? (
          <ul className={listClass}>
            {items.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <ol className={listClass}>
            {items.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        )
      ) : null}
    </div>
  )
}

/** Desktop: acordeón con Ver más / Ver menos. */
function PestanasAccordionDesktop({
  title,
  listType,
  items,
}: {
  title: string
  listType: "ul" | "ol"
  items: readonly string[]
}) {
  const [open, setOpen] = useState(false)
  const listClass =
    "mt-3 space-y-2 pl-5 text-sm leading-relaxed text-foreground/85 " +
    (listType === "ol" ? "list-decimal marker:text-primary/70" : "list-disc marker:text-primary/70")

  return (
    <div
      className="rounded-2xl border border-border/60 bg-card px-4 py-4 sm:px-5 sm:py-5"
      style={pestanasBlockFont}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {title}
        </p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
          aria-expanded={open}
        >
          {open ? "Ver menos" : "Ver más"}
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {open ? (
        listType === "ul" ? (
          <ul className={listClass}>
            {items.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <ol className={listClass}>
            {items.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        )
      ) : null}
    </div>
  )
}

function PestanasAccordion(props: {
  title: string
  listType: "ul" | "ol"
  items: readonly string[]
}) {
  return (
    <>
      <div className="lg:hidden">
        <PestanasAccordionMobile {...props} />
      </div>
      <div className="hidden lg:block">
        <PestanasAccordionDesktop {...props} />
      </div>
    </>
  )
}

function ComoAsistirCitaPestanas() {
  return (
    <PestanasAccordion
      title="Cómo asistir a tu cita"
      listType="ul"
      items={ELI_COMO_ASISTIR_CITA_PESTANAS}
    />
  )
}

function ComoReservarTurnoPestanas() {
  return (
    <PestanasAccordion
      title="¿Cómo reservar mi turno?"
      listType="ol"
      items={ELI_COMO_RESERVAR_TURNO_PESTANAS}
    />
  )
}

/**
 * Móvil: tarjetas verticales compactas (ancho máx. ~264px). Android: 3 + "Cargar más".
 * Desktop: grilla 2–4 columnas a ancho completo.
 */
function ServiceGrid({
  services,
  onOpenService,
  layout,
  mobileSafeGrid,
}: {
  services: ServiceItem[]
  onOpenService: (s: ServiceItem) => void
  layout: "pestanas-ext" | "pestanas-trat" | "category"
  mobileSafeGrid: boolean
}) {
  const { needsLightGrid, expand } = useProgressiveServiceGrid(services.length, mobileSafeGrid)

  const containerClass =
    layout === "pestanas-ext"
      ? "mx-auto grid w-full grid-cols-1 gap-2 max-lg:max-w-[16.5rem] sm:gap-2.5 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-3 xl:grid-cols-4"
      : layout === "pestanas-trat"
        ? "mx-auto grid w-full grid-cols-1 gap-2 max-lg:max-w-[16.5rem] sm:gap-2.5 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-3 xl:grid-cols-3"
        : "mx-auto grid w-full grid-cols-1 gap-2 max-lg:max-w-[16.5rem] sm:gap-2.5 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-3 xl:grid-cols-3"

  const initialVisible = getInitialVisibleCount(services.length)
  const visibleServices = needsLightGrid ? services.slice(0, initialVisible) : services
  const remainingCount = services.length - initialVisible
  const showLoadMore = needsLightGrid && remainingCount > 0

  return (
    <div className="space-y-3">
      <div className={containerClass}>
        {visibleServices.map((s) => (
          <ServiceCard key={s.slug} service={s} onOpen={onOpenService} />
        ))}
      </div>
      {showLoadMore ? (
        <button
          type="button"
          onClick={() => expand()}
          className="mx-auto w-full max-w-[16.5rem] rounded-xl border border-primary/25 bg-primary/5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 active:scale-[0.98] lg:max-w-none lg:py-3"
          style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
        >
          Cargar más
          <span className="font-normal text-primary/80">
            {" "}
            ({remainingCount} {remainingCount === 1 ? "servicio" : "servicios"})
          </span>
        </button>
      ) : null}
    </div>
  )
}

/* ─── Service card ────────────────────────────────────────────────────────── */

function ServiceCard({
  service,
  onOpen,
}: {
  service: ServiceItem
  onOpen: (s: ServiceItem) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(service)}
      className="group relative flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-border/50 bg-card text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary max-lg:shadow-none lg:rounded-2xl lg:transition-[border-color,box-shadow] lg:duration-300 lg:hover:-translate-y-0.5 lg:hover:border-primary/30 lg:hover:shadow-md lg:active:scale-[0.97]"
      style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
    >
      <div className="relative aspect-[2/1] w-full overflow-hidden bg-muted/40 max-lg:aspect-[5/3] lg:aspect-[4/3] lg:rounded-t-2xl">
        {service.photos.length > 0 ? (
          <Image
            src={service.photos[0].src}
            alt={service.photos[0].alt}
            fill
            className="object-cover max-lg:transition-none lg:transition-transform lg:duration-500 lg:group-hover:scale-[1.06]"
            sizes="(max-width: 1024px) 264px, (max-width: 1280px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50 max-lg:bg-secondary/80">
            <Sparkles className="h-5 w-5 text-primary/25 lg:h-7 lg:w-7" />
          </div>
        )}
        {service.tag && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-primary-foreground lg:right-2 lg:top-2 lg:px-2.5 lg:text-[10px]">
            {service.tag}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5 px-2.5 py-2 lg:gap-1 lg:px-3.5 lg:py-3">
        <p className="text-xs font-semibold leading-snug text-foreground/90 sm:text-sm lg:leading-tight lg:transition-colors lg:group-hover:text-primary">
          {service.name}
        </p>
        <p
          className={`line-clamp-2 text-[11px] leading-snug sm:text-xs sm:leading-relaxed lg:text-sm ${
            service.shortDesc === DESCRIPCION_SERVICIO_PENDIENTE
              ? "text-muted-foreground/85 italic"
              : "text-muted-foreground"
          }`}
        >
          {service.shortDesc}
        </p>
      </div>
    </button>
  )
}

/* ─── Service modal ───────────────────────────────────────────────────────── */

function ServiceModalPhotoCarousel({
  photos,
}: {
  photos: { src: string; alt: string }[]
}) {
  const [photoIdx, setPhotoIdx] = useState(0)

  const prevPhoto = useCallback(
    () => setPhotoIdx((p) => (p - 1 + photos.length) % photos.length),
    [photos.length],
  )
  const nextPhoto = useCallback(
    () => setPhotoIdx((p) => (p + 1) % photos.length),
    [photos.length],
  )

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2.5 bg-muted/25 py-10">
        <ImageIcon className="h-9 w-9 text-muted-foreground/30" />
        <p className="text-xs text-muted-foreground/60">Sin fotos en la carpeta del servicio</p>
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/3] w-full bg-muted sm:aspect-[16/9]">
      <AnimatePresence mode="wait">
        <motion.div
          key={photoIdx}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Image
            src={photos[photoIdx].src}
            alt={photos[photoIdx].alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 560px"
          />
        </motion.div>
      </AnimatePresence>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prevPhoto()
            }}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              nextPhoto()
            }}
            aria-label="Foto siguiente"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPhotoIdx(i)
                }}
                aria-label={`Foto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === photoIdx ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ServiceModal({
  service,
  onClose,
}: {
  service: ServiceItem
  onClose: () => void
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const prevOverflow = document.body.style.overflow
    document.addEventListener("keydown", h)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", h)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={onClose}
    >
      <div
        className="relative flex w-full flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:w-[95%] sm:max-w-xl sm:rounded-3xl"
        style={{ maxHeight: "90dvh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-border sm:hidden" />

        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3.5">
          <div>
            {service.tag && (
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary"
                style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
              >
                {service.tag}
              </p>
            )}
            <h3
              className="text-base font-semibold text-foreground sm:text-lg"
              style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
            >
              {service.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-11 w-11 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-muted hover:text-foreground active:scale-90"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <ServiceModalPhotoCarousel photos={service.photos} />

          <div
            className="space-y-4 px-5 pb-7 pt-5"
            style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
          >
            <p
              className={`text-sm leading-relaxed sm:text-base ${
                service.fullDesc === DESCRIPCION_SERVICIO_PENDIENTE
                  ? "text-muted-foreground/90 italic"
                  : "text-muted-foreground"
              }`}
            >
              {service.fullDesc}
            </p>

            {service.details && service.details.length > 0 && (
              <ul className="space-y-2.5">
                {service.details.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-sm text-foreground/75">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {d}
                  </li>
                ))}
              </ul>
            )}

            <a
              href={WA_SERVICE(service.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-105 hover:shadow-md active:scale-95"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Consultar por {service.name}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Category content ────────────────────────────────────────────────────── */

function CategoryContent({
  category,
  onOpenService,
  mobileSafeGrid,
}: {
  category: ServiceCategory
  onOpenService: (s: ServiceItem) => void
  mobileSafeGrid: boolean
}) {
  if (category.id === "pestanas") {
    const extensions = category.services.filter((s) => s.group === "extension")
    const treatments = category.services.filter((s) => s.group === "tratamiento")

    return (
      <div className="space-y-8">
        <ExtensionesPremiumIntro />
        <AsesoramientoCallout />
        <ComoAsistirCitaPestanas />
        <ComoReservarTurnoPestanas />

        <div>
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/80"
            style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
          >
            Opciones de pestañas
          </p>
          <ServiceGrid
            services={extensions}
            onOpenService={onOpenService}
            layout="pestanas-ext"
            mobileSafeGrid={mobileSafeGrid}
          />
        </div>

        {treatments.length > 0 && (
          <div>
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/45"
              style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
            >
              Tratamientos
            </p>
            <ServiceGrid
              services={treatments}
              onOpenService={onOpenService}
              layout="pestanas-trat"
              mobileSafeGrid={mobileSafeGrid}
            />
          </div>
        )}
      </div>
    )
  }

  if (category.services.length === 1) {
    return (
      <div className="max-w-xs">
        <ServiceCard service={category.services[0]} onOpen={onOpenService} />
      </div>
    )
  }

  return (
    <ServiceGrid
      services={category.services}
      onOpenService={onOpenService}
      layout="category"
      mobileSafeGrid={mobileSafeGrid}
    />
  )
}

/* ─── Main section ────────────────────────────────────────────────────────── */

export function ServicesSection({ mobileSafeGrid = false }: { mobileSafeGrid?: boolean }) {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null)
  const [activeTab, setActiveTab] = useState<ServiceCategory["id"]>("pestanas")
  const activeCategory = SERVICES_CATALOG.find((c) => c.id === activeTab)

  return (
    <section
      id="servicios"
      className={`relative scroll-mt-20 overflow-x-hidden py-24 lg:overflow-hidden lg:py-32 ${SECTION_SURFACE_CLASS}`}
    >
      {/* Logos decorativos: solo desktop (blur-xl + scroll en móvil = tearing) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 hidden h-[480px] w-[480px] -rotate-12 opacity-[0.04] blur-xl lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" className="h-full w-full object-contain" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 hidden h-[480px] w-[480px] rotate-12 opacity-[0.04] blur-xl lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" className="h-full w-full object-contain" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              Nuestros <span className="heading-emphasis">Servicios</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mx-auto mt-14 max-w-5xl">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ServiceCategory["id"])} className="gap-6">
              {/* Scrollable tab bar */}
              <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <TabsList
                  className="inline-flex h-auto w-max min-w-full gap-1 rounded-xl bg-muted/80 p-1.5 shadow-inner"
                  style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
                >
                  {SERVICES_CATALOG.map((cat) => (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="flex-1 rounded-lg px-4 py-2.5 text-sm data-[state=active]:text-primary"
                    >
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {activeCategory ? (
                <TabsContent key={activeTab} value={activeTab} className="mt-2 outline-none">
                  <CategoryContent
                    category={activeCategory}
                    onOpenService={setActiveService}
                    mobileSafeGrid={mobileSafeGrid}
                  />
                </TabsContent>
              ) : null}
            </Tabs>
          </div>
        </FadeIn>
      </div>

      {activeService ? (
        <ServiceModal
          key={activeService.slug}
          service={activeService}
          onClose={() => setActiveService(null)}
        />
      ) : null}
    </section>
  )
}
