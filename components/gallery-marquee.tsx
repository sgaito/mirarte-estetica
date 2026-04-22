"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { DriveImage } from "@/lib/google-drive"

const ROW_HEIGHT = 288
const COPIES = 4

interface MarqueeRowProps {
  images: DriveImage[]
  speed: number
  direction: "left" | "right"
  isPaused: React.MutableRefObject<boolean>
  onImageClick: (image: DriveImage) => void
}

function MarqueeRow({ images, speed, direction, isPaused, onImageClick }: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const initialized = useRef(false)

  const repeated = Array.from({ length: COPIES }, () => images).flat()

  useAnimationFrame((_, delta) => {
    if (isPaused.current || !trackRef.current) return

    const singleWidth = trackRef.current.scrollWidth / COPIES
    if (singleWidth === 0) return

    if (!initialized.current) {
      if (direction === "right") x.set(-singleWidth)
      initialized.current = true
    }

    const sign = direction === "left" ? -1 : 1
    let newX = x.get() + sign * (speed * delta) / 1000

    if (direction === "left" && newX <= -singleWidth) newX += singleWidth
    if (direction === "right" && newX >= 0) newX -= singleWidth

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
        const cellWidth = Math.round(ROW_HEIGHT * aspectRatio)

        return (
          <div
            key={`${image.id}-${idx}`}
            className="flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-sm"
            style={{ width: cellWidth, height: ROW_HEIGHT }}
            onClick={() => onImageClick(image)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt={image.name}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              draggable={false}
            />
          </div>
        )
      })}
    </motion.div>
  )
}

function Lightbox({ image, onClose }: { image: DriveImage; onClose: () => void }) {
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
      {/* Botón cerrar */}
      <button
        className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>

      <motion.div
        className="relative max-h-[90vh] max-w-[90vw]"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={image.name}
          className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
        />
      </motion.div>
    </motion.div>
  )
}

export function GalleryMarquee({ images }: { images: DriveImage[] }) {
  const isPaused = useRef(false)
  const [selected, setSelected] = useState<DriveImage | null>(null)

  if (images.length === 0) {
    return (
      <p className="mt-16 text-center text-sm text-muted-foreground/50 italic">
        Próximamente más fotos de nuestro espacio.
      </p>
    )
  }

  const rowTop = images.filter((_, i) => i % 2 === 0)
  const rowBottom = images.filter((_, i) => i % 2 !== 0)

  const top = rowTop.length >= 2 ? rowTop : images
  const bottom = rowBottom.length >= 2 ? rowBottom : [...images].reverse()

  return (
    <>
      <div
        className="mt-16 flex flex-col gap-4 overflow-hidden"
        onMouseEnter={() => { isPaused.current = true }}
        onMouseLeave={() => { isPaused.current = false }}
      >
        <MarqueeRow images={top}    speed={62} direction="left"  isPaused={isPaused} onImageClick={setSelected} />
        <MarqueeRow images={bottom} speed={44} direction="right" isPaused={isPaused} onImageClick={setSelected} />
      </div>

      <AnimatePresence>
        {selected && (
          <Lightbox image={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
