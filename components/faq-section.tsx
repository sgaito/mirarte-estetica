"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/fade-in"
import { SectionSeam } from "@/components/section-seam"

const FAQS = [
  {
    id: 1,
    q: "¿Qué técnicas de extensiones de pestañas realizan?",
    a: "Realizamos la colocación con técnica pelo por pelo Clásica y Volumen.",
  },
  {
    id: 2,
    q: "¿Qué tipo de materiales utilizan?",
    a: "Trabajamos con productos de alta calidad, hipoalergénicos, de larga duración y resistentes al agua. Utilizamos pestañas de seda Premium importadas.",
  },
  {
    id: 3,
    q: "¿Las extensiones dañan mis pestañas naturales?",
    a: "No. Al utilizar pestañas de seda Premium el resultado es natural, no aportan peso y no dañan tu pestaña natural.",
  },
  {
    id: 4,
    q: "¿Cómo elijo el diseño o volumen adecuado para mí?",
    a: "Previo a la colocación se realiza un asesoramiento donde elegís en conjunto el diseño, volumen, estilo, curvatura y largo.",
  },
  {
    id: 5,
    q: "¿Cuánto tiempo duran las extensiones?",
    a: "Tienen una duración aproximada de 3 meses o más, dependiendo de que se realicen los retoques en tiempo y forma y se mantengan los cuidados indicados.",
  },
  {
    id: 6,
    q: "¿Dónde están ubicados y qué medidas de higiene toman?",
    a: "El estudio está en la zona Centro de Rosario. Trabajamos bajo protocolo de bioseguridad, tomando todas las medidas y precauciones necesarias.",
  },
  {
    id: 7,
    q: "¿Cuánto dura un Lash Lifting?",
    a: "El resultado se mantiene alrededor de 45 días en promedio. La duración varía según el ciclo de crecimiento de tus pestañas naturales y cómo las cuides día a día.",
  },
  {
    id: 8,
    q: "¿Cada cuánto se hace el retoque?",
    a: "Lo ideal es retocar entre los 14 y 21 días. Así mantenés el diseño prolijo y evitás que el trabajo se descompense con el crecimiento natural.",
  },
  {
    id: 9,
    q: "¿Cómo debo cuidarlas?",
    a: "Al finalizar el servicio te entregamos una guía de cuidados con todas las indicaciones. Siguiéndola, el resultado se ve mejor y dura más tiempo.",
  },
  {
    id: 10,
    q: "¿Cuánto tiempo dura un turno de extensiones?",
    a: "Un turno de extensiones suele durar entre 1 hora y 1 hora 30, incluyendo el asesoramiento previo y la colocación.",
  },
  {
    id: 11,
    q: "¿Cuánto tiempo dura un turno de Lash Lifting o laminado de cejas?",
    a: "Ambos servicios tienen una duración aproximada de 50 minutos, para que puedas organizarte con tranquilidad.",
  },
  {
    id: 12,
    q: "¿Cuánto tiempo dura un turno de diseño y perfilado de cejas?",
    a: "El diseño y perfilado de cejas dura entre 30 y 40 minutos, según el trabajo que necesites en el momento.",
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
                ? "0 8px 24px -6px oklch(0.53 0.11 178 / 0.18)"
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
      className="relative overflow-hidden scroll-mt-20 pt-24 pb-10 lg:pt-32 lg:pb-12"
      style={{
        background: `
          radial-gradient(ellipse at 90% 60%, oklch(0.95 0.05 178 / 0.45) 0%, transparent 50%),
          radial-gradient(ellipse at 5%  20%, oklch(0.97 0.03 75  / 0.40) 0%, transparent 48%),
          oklch(0.977 0.003 240)
        `.trim(),
      }}
    >
      <SectionSeam edge="bottom" to="var(--secondary)" />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              Preguntas <span className="heading-emphasis">Frecuentes</span>
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
