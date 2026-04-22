"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/fade-in"

const CATEGORIES = [
  {
    id: "pestanas",
    label: "Pestañas",
    services: [
      "Extensiones pelo a pelo",
      "Extensiones volumen ruso (2D, 3D, 4D)",
      "Extensiones efecto rímel / Hybrid",
      "Lifting de pestañas — curvado natural",
      "Arqueado permanente",
      "Tintura de pestañas",
      "Botox de pestañas — tratamiento de nutrición",
    ],
  },
  {
    id: "cejas",
    label: "Cejas",
    services: [
      "Perfilado de cejas — diseño con pinza/cera",
      "Laminado de cejas — Brow Lamination",
      "Tintura de cejas",
      "Henna para cejas — efecto sombreado temporal",
      "Microblading — tatuaje pelo a pelo (semi-permanente)",
      "Microshading — efecto polvo/maquillaje (semi-permanente)",
      "Alisado de cejas",
    ],
  },
  {
    id: "adicionales",
    label: "Adicionales",
    services: [
      "Limpieza facial profunda",
      "Dermaplaning",
      "Remoción de extensiones",
    ],
  },
]

/* Sombra flotante con tinte turquesa */
const SHADOW_IDLE = "0 4px 14px -2px oklch(0 0 0 / 0.07), 0 2px 4px -1px oklch(0 0 0 / 0.04)"
const SHADOW_OPEN =
  "0 24px 48px -12px oklch(0.72 0.12 185 / 0.18), 0 8px 16px -4px oklch(0.72 0.12 185 / 0.08)"

/* Mesh gradient para el fondo */
const MESH_BG = `
  radial-gradient(ellipse at 8% 40%,  oklch(0.95 0.05 185 / 0.55) 0%, transparent 52%),
  radial-gradient(ellipse at 92% 10%,  oklch(0.97 0.03 75  / 0.50) 0%, transparent 48%),
  radial-gradient(ellipse at 65% 88%,  oklch(0.95 0.04 185 / 0.30) 0%, transparent 42%),
  oklch(0.977 0.003 240)
`.trim()

function ServiceList({ services }: { services: string[] }) {
  return (
    <ul className="divide-y divide-border/40">
      {services.map((name) => (
        <li key={name} className="flex items-center justify-between py-3.5">
          <span className="text-sm leading-snug text-foreground/70">{name}</span>
          <span className="ml-4 select-none text-xs text-muted-foreground/30">—</span>
        </li>
      ))}
    </ul>
  )
}

function Accordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {CATEGORIES.map((cat, idx) => {
        const isOpen = open === idx
        return (
          <div
            key={cat.id}
            className="overflow-hidden rounded-2xl bg-card transition-shadow duration-300"
            style={{ boxShadow: isOpen ? SHADOW_OPEN : SHADOW_IDLE }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
            >
              <span
                className={`text-2xl leading-none transition-colors duration-200 ${
                  isOpen ? "text-primary" : "text-foreground/80"
                }`}
                style={{ fontFamily: "var(--font-script)" }}
              >
                {cat.label}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <ChevronDown className="h-5 w-5 text-primary" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6">
                    <ServiceList services={cat.services} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export function ServicesSection() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden scroll-mt-20 py-24 lg:py-32"
      style={{ background: MESH_BG }}
    >
      {/* Hojas decorativas — esquina superior izquierda */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] -rotate-12 opacity-[0.06] blur-2xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" className="h-full w-full object-contain" />
      </div>

      {/* Hojas decorativas — esquina inferior derecha */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[480px] w-[480px] rotate-12 opacity-[0.06] blur-2xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" className="h-full w-full object-contain" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              Nuestros{" "}
              <span
                className="font-semibold"
                style={{
                  background:
                    "linear-gradient(130deg, oklch(0.18 0 0) 0%, oklch(0.52 0.11 185) 50%, oklch(0.18 0 0) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Servicios
              </span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Cada tratamiento está diseñado para realzar tu belleza natural con dedicación y precisión.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mx-auto mt-16 max-w-2xl">
            <Accordion />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
