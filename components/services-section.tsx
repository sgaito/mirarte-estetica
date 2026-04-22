"use client"

import { useState } from "react"
import { Eye, Feather, Sparkles, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const CATEGORIES = [
  {
    id: "pestanas",
    label: "Pestañas",
    icon: Eye,
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
    icon: Feather,
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
    icon: Sparkles,
    services: [
      "Limpieza facial profunda",
      "Dermaplaning",
      "Remoción de extensiones",
    ],
  },
]

function ServiceList({ services }: { services: string[] }) {
  return (
    <ul className="grid gap-x-12 sm:grid-cols-2">
      {services.map((name) => (
        <li
          key={name}
          className="flex items-center gap-3 border-b border-border/40 py-3.5 last:border-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-0"
        >
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
          <span className="text-sm leading-snug text-foreground/75">{name}</span>
        </li>
      ))}
    </ul>
  )
}

/* ── Desktop: tabs ─────────────────────────────────────────── */
function TabsView() {
  const [active, setActive] = useState(0)
  const category = CATEGORIES[active]
  const Icon = category.icon

  return (
    <div>
      {/* Tab nav */}
      <div className="flex gap-1 rounded-2xl bg-card p-1.5 shadow-sm">
        {CATEGORIES.map((cat, idx) => {
          const CatIcon = cat.icon
          const isActive = idx === active
          return (
            <button
              key={cat.id}
              onClick={() => setActive(idx)}
              className="relative flex flex-1 items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200"
            >
              {isActive && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <CatIcon
                className={`relative h-4 w-4 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
              />
              <span className={`relative transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {cat.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="mt-8 min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="inline-flex rounded-xl bg-primary/10 p-2.5">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{category.label}</h3>
            </div>
            <ServiceList services={category.services} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Mobile: acordeón ──────────────────────────────────────── */
function AccordionView() {
  const [open, setOpen] = useState<number>(0)

  return (
    <div className="flex flex-col gap-3">
      {CATEGORIES.map((cat, idx) => {
        const Icon = cat.icon
        const isOpen = open === idx

        return (
          <div key={cat.id} className="overflow-hidden rounded-2xl bg-card shadow-sm">
            <button
              onClick={() => setOpen(isOpen ? -1 : idx)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left"
            >
              <div className="inline-flex rounded-xl bg-primary/10 p-2">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="flex-1 font-medium text-foreground">{cat.label}</span>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
                  <div className="px-5 pb-5">
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

/* ── Sección principal ─────────────────────────────────────── */
export function ServicesSection() {
  return (
    <section id="servicios" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
            Nuestros <span className="font-semibold">Servicios</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Cada tratamiento está diseñado para realzar tu belleza natural con dedicación y precisión.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          {/* Tabs — solo desktop */}
          <div className="hidden md:block">
            <TabsView />
          </div>

          {/* Acordeón — solo mobile */}
          <div className="md:hidden">
            <AccordionView />
          </div>
        </div>
      </div>
    </section>
  )
}
