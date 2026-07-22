"use client"

import { useRef, useLayoutEffect, useEffect } from "react"
import { motion, useMotionValue, useAnimationFrame } from "framer-motion"
import { Star } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { SectionSeam } from "@/components/section-seam"

const reviews = [
  {
    id: 1,
    name: "Ludmila Romero",
    text: "Conocí a Eli en 2019, me encanta como trabaja, es muy profesional, también destaco su amabilidad y delicadeza. Mis ojos son super alérgicos y con ella nunca tuve problemas a la hora de hacerme las extensiones, siempre cuido mucho mis pestañitas.",
  },
  {
    id: 2,
    name: "Cristela Bartolomei",
    text: "El trabajo de Eli es de otro nivel, además te explica absolutamente todo, y ella es un amor ❤️",
  },
  {
    id: 3,
    name: "Jael Montenegro",
    text: "Excelente el trabajo que hace Eli. Súper prolija, detallista y cuidadosa. 100% recomendable. Jamás se dañaron mis pestañas en los 3 años que hace que voy!!",
  },
  {
    id: 4,
    name: "Leo Magallanes",
    text: "Eli es muy apasionada por lo que hace, y eso se nota en su nivel de detalle y preocupación para que el trabajo salga perfecto. Sin dudas alguien a quien confiar tu cuidado personal :)",
  },
  {
    id: 5,
    name: "Rebeca Insfran",
    text: "La primera vez que me hice pestañas fue con Mirarte, ya que siempre me dio miedo que me toquen el ojo. Pero las chicas son súper delicadas y cuidadosas! Así que hace dos años que me hago. Ni hablar que me duran un montón!",
  },
  {
    id: 6,
    name: "Victoria Lopez",
    text: "Vas a encontrar muchas lashistas y te van a vender que son lo mejor... ¡es MENTIRA! Ella es la mejor. Su trato es cordial, ameno. Su trabajo muy prolijo y detallista. Te hace sentir divina. Eli... no te cambio por nadie!!!",
  },
  {
    id: 7,
    name: "Nicolas Lorenzon",
    text: "Realmente Eli es muy profesional en lo que hace!! Admiro su estilo suave y delicado para trabajar!! Aparte el local es hermoso, acogedor y super cálido!! Recomendable 100%!!!!",
  },
  {
    id: 8,
    name: "Carina Coronel",
    text: "Excelente atención y servicio. Eli la mejor lashista, siempre detallista, atenta y muy amable. Super recomendable!",
  },
  {
    id: 9,
    name: "Irene Gonzales",
    text: "Hermoso el lugar y la atención!!! Me encanta la dedicación que hace Eliana con cada cliente. Muy, muy recomendable. Y las pestañas, soñadas!!!!",
  },
  {
    id: 10,
    name: "Lucía Heredia",
    text: "Excelente lugar! Eli es muy atenta, amable y se nota que sabe lo que hace. Lo recomiendo!",
  },
]

const COPIES = 3
const CARD_WIDTH = 300
const CARD_GAP = 20
const SPEED = 38

function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <div
      className="flex flex-col rounded-2xl bg-card p-6 shadow-sm"
      style={{ width: CARD_WIDTH, flexShrink: 0 }}
    >
      <div aria-hidden className="select-none font-serif text-5xl leading-none text-primary/20">
        &ldquo;
      </div>
      <p className="mt-1 line-clamp-4 text-sm italic leading-relaxed text-foreground/65">
        {text}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <span className="text-xs font-semibold text-primary">{name.charAt(0)}</span>
          </div>
          <span className="text-sm font-medium text-foreground/80">{name}</span>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
          ))}
        </div>
      </div>
    </div>
  )
}

function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const singleWidthRef = useRef(0)

  const repeated = Array.from({ length: COPIES }, () => reviews).flat()

  useLayoutEffect(() => {
    if (!trackRef.current) return
    singleWidthRef.current = trackRef.current.scrollWidth / COPIES
  }, [])

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
    const sw = singleWidthRef.current
    if (sw === 0) return
    let newX = x.get() - (SPEED * delta) / 1000
    if (newX <= -sw) newX += sw
    x.set(newX)
  })

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={trackRef}
        className="flex"
        style={{ x, gap: CARD_GAP, willChange: "transform" }}
      >
        {repeated.map((review, idx) => (
          <ReviewCard key={`${review.id}-${idx}`} name={review.name} text={review.text} />
        ))}
      </motion.div>
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section id="resenas" className="relative scroll-mt-20 overflow-hidden bg-secondary py-24 lg:py-32">
      <SectionSeam edge="bottom" to="oklch(0.977 0.003 240)" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              <span className="heading-emphasis">Número 1</span> en Rosario según reseñas en Google
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Lo que dicen nuestras clientas
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Carrusel full-width fuera del contenedor para que sangre hasta los bordes */}
      <FadeIn delay={0.1} direction="none">
        <div className="relative mt-16">
          <ReviewsCarousel />
        </div>
      </FadeIn>
    </section>
  )
}
