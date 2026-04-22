"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/fade-in"

const FAQS = [
  {
    id: 1,
    q: "¿Cuánto duran las extensiones de pestañas?",
    a: "Con los cuidados adecuados, las extensiones duran entre 3 y 4 semanas. Se recomienda hacer un relleno cada 2-3 semanas para mantenerlas siempre perfectas.",
  },
  {
    id: 2,
    q: "¿Necesito reservar turno con anticipación?",
    a: "Sí, toda la atención es con turno previo. Podés reservar por WhatsApp o Instagram y te confirmamos disponibilidad a la brevedad.",
  },
  {
    id: 3,
    q: "¿Qué pasa si tengo ojos sensibles o soy alérgica?",
    a: "No hay problema. Antes de cualquier servicio evaluamos tu caso y, si es necesario, realizamos una prueba de parche para garantizar que el procedimiento sea seguro y cómodo para vos.",
  },
  {
    id: 4,
    q: "¿Cómo cuido mis extensiones en casa?",
    a: "Evitá mojarlas las primeras 24 horas, no usés productos oleosos cerca de los ojos y cepillalas suavemente cada mañana. Con esos cuidados simples van a durar mucho más.",
  },
  {
    id: 5,
    q: "¿El lifting o arqueado daña mis pestañas naturales?",
    a: "No, siempre que se realice con los productos adecuados y respetando los tiempos del proceso. En Mirarte usamos productos de alta calidad que cuidan tu pestaña natural.",
  },
  {
    id: 6,
    q: "¿Cuánto dura cada turno?",
    a: "Depende del servicio: las extensiones completas llevan entre 1.5 y 2 horas, los rellenos entre 45 y 60 minutos, el lifting o arqueado alrededor de 1 hora, y el diseño de cejas unos 30 minutos.",
  },
  {
    id: 7,
    q: "¿Cómo agendo un turno?",
    a: "Podés contactarnos directamente por WhatsApp o enviarnos un mensaje por Instagram. Te respondemos a la brevedad y coordinamos el horario que mejor te quede.",
  },
  {
    id: 8,
    q: "¿Hacen remoción de extensiones colocadas en otro lugar?",
    a: "Sí, ofrecemos el servicio de remoción de extensiones sin importar dónde te las hayas hecho. Lo realizamos con productos seguros que no dañan tu pestaña natural.",
  },
]

/* ── Desktop: grilla con números decorativos ─────────────── */
function DesktopGrid() {
  return (
    <div className="grid gap-x-16 gap-y-10 sm:grid-cols-2">
      {FAQS.map((faq, idx) => (
        <FadeIn key={faq.id} delay={idx * 0.05}>
          <div className="relative pl-14">
            {/* Número decorativo */}
            <span
              aria-hidden
              className="absolute left-0 top-0 select-none font-serif text-5xl font-bold leading-none text-primary/10"
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="text-base font-semibold text-foreground/90 leading-snug">
              {faq.q}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {faq.a}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

/* ── Mobile: acordeón compacto ────────────────────────────── */
function MobileAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-2">
      {FAQS.map((faq, idx) => {
        const isOpen = open === idx
        return (
          <div
            key={faq.id}
            className="overflow-hidden rounded-xl bg-card shadow-sm transition-shadow duration-200"
            style={{
              boxShadow: isOpen
                ? "0 8px 24px -6px oklch(0.72 0.12 185 / 0.12)"
                : undefined,
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left"
            >
              <span className="flex-1 text-sm font-medium text-foreground/85 leading-snug">
                {faq.q}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <ChevronDown className="h-4 w-4 text-primary" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ── Sección principal ────────────────────────────────────── */
export function FaqSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden scroll-mt-20 py-24 lg:py-32"
      style={{
        background: `
          radial-gradient(ellipse at 90% 60%, oklch(0.95 0.05 185 / 0.45) 0%, transparent 50%),
          radial-gradient(ellipse at 5%  20%, oklch(0.97 0.03 75  / 0.40) 0%, transparent 48%),
          oklch(0.977 0.003 240)
        `.trim(),
      }}
    >
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              Preguntas{" "}
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
                Frecuentes
              </span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Todo lo que necesitás saber antes de tu primera visita.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16">
          {/* Desktop */}
          <div className="hidden sm:block">
            <DesktopGrid />
          </div>

          {/* Mobile */}
          <div className="sm:hidden">
            <MobileAccordion />
          </div>
        </div>
      </div>
    </section>
  )
}
