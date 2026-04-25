"use client"

import Image from "next/image"
import { useRef, useState, useEffect, useLayoutEffect } from "react"
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { DriveImage } from "@/lib/google-drive"

const COPIES = 3

function useRowHeight() {
  const [rowHeight, setRowHeight] = useState<number | null>(null)

  useEffect(() => {
    const update = () =>
      setRowHeight(window.innerWidth < 640 ? 160 : window.innerWidth < 1024 ? 220 : 288)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return rowHeight
}

/* ─── Imagen de galería con skeleton crema ───────────────────────────────── */

function GalleryImage({
  src,
  alt,
  width,
  height,
  onClick,
}: {
  src: string
  alt: string
  width: number
  height: number
  onClick: () => void
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-sm"
      style={{ width, height }}
      onClick={onClick}
    >
      {/* Skeleton crema pulsante — se oculta al cargar */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse rounded-2xl"
          style={{ background: "oklch(0.95 0.01 240)" }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes={`${width}px`}
        className={`object-cover transition-all duration-700 hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        draggable={false}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

interface MarqueeRowProps {
  images: DriveImage[]
  speed: number
  direction: "left" | "right"
  isPaused: React.MutableRefObject<boolean>
  onImageClick: (image: DriveImage) => void
  rowHeight: number
}

function MarqueeRow({ images, speed, direction, isPaused, onImageClick, rowHeight }: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const singleWidthRef = useRef(0)

  const repeated = Array.from({ length: COPIES }, () => images).flat()

  useLayoutEffect(() => {
    if (!trackRef.current) return
    const sw = trackRef.current.scrollWidth / COPIES
    singleWidthRef.current = sw
    x.set(direction === "right" ? -sw : 0)
  }, [direction, rowHeight, x])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      singleWidthRef.current = el.scrollWidth / COPIES
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (isPaused.current) return
    const sw = singleWidthRef.current
    if (sw === 0) return

    const sign = direction === "left" ? -1 : 1
    let newX = x.get() + (sign * speed * delta) / 1000

    if (direction === "left" && newX <= -sw) newX += sw
    if (direction === "right" && newX >= 0) newX -= sw

    x.set(newX)
  })

  return (
    <motion.div
      ref={trackRef}
      className="flex gap-4"
      style={{ x, willChange: "transform" }}
    >
      {repeated.map((image, idx) => {
        const aspectRatio = image.width / image.height
        const cellWidth = Math.round(rowHeight * aspectRatio)
        return (
          <GalleryImage
            key={`${image.id}-${idx}`}
            src={image.url}
            alt={image.name}
            width={cellWidth}
            height={rowHeight}
            onClick={() => onImageClick(image)}
          />
        )
      })}
    </motion.div>
  )
}

/* ─── Lightbox con skeleton ──────────────────────────────────────────────── */

function Lightbox({ image, onClose }: { image: DriveImage; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <button
        className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>

      <motion.div
        className="relative h-[min(90dvh,900px)] w-[min(90vw,1200px)]"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Skeleton mientras carga el lightbox */}
        {!loaded && (
          <div
            className="absolute inset-0 animate-pulse rounded-2xl"
            style={{ background: "oklch(0.18 0 0 / 0.6)" }}
          />
        )}
        <Image
          src={image.url}
          alt={image.name}
          fill
          unoptimized
          sizes="90vw"
          className={`rounded-2xl object-contain shadow-2xl transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          onLoad={() => setLoaded(true)}
        />
      </motion.div>
    </motion.div>
  )
}

/* ─── GalleryMarquee ─────────────────────────────────────────────────────── */

export function GalleryMarquee({ images }: { images: DriveImage[] }) {
  const isPaused = useRef(false)
  const [selected, setSelected] = useState<DriveImage | null>(null)
  const rowHeight = useRowHeight()

  if (images.length === 0) {
    return (
      <p className="mt-16 text-center text-sm text-muted-foreground/50 italic">
        Próximamente más fotos de nuestro espacio.
      </p>
    )
  }

  if (rowHeight === null) {
    return <div className="mt-16" style={{ height: 288 * 2 + 16 }} />
  }

  const rowTop = images.filter((_, i) => i % 2 === 0)
  const rowBottom = images.filter((_, i) => i % 2 !== 0)

  const top = rowTop.length >= 2 ? rowTop : images
  const bottom = rowBottom.length >= 2 ? rowBottom : [...images].reverse()

  return (
    <>
      <div
        className="mt-16 w-screen overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex flex-col gap-4">
          <MarqueeRow images={top}    speed={62} direction="left"  isPaused={isPaused} onImageClick={setSelected} rowHeight={rowHeight} />
          <MarqueeRow images={bottom} speed={44} direction="right" isPaused={isPaused} onImageClick={setSelected} rowHeight={rowHeight} />
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <Lightbox image={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
