import Link from "next/link"
import { Sparkles } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

export function HeroSection() {
  return (
    <section
      id="reservar"
      className="relative min-h-screen flex items-center justify-center bg-background pt-20 scroll-mt-20"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn delay={0}>
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary sm:px-5 sm:py-2 sm:text-sm">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Tu bienestar es nuestra prioridad
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="text-balance text-3xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Descubre el arte del{" "}
              <span className="font-semibold text-primary">cuidado personal</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
              En Mirarte Estética creamos experiencias únicas de relajación y
              belleza. Déjate consentir por nuestros especialistas en un ambiente
              diseñado para tu tranquilidad.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                href="#contacto"
                className="w-full rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-105 active:scale-95 sm:w-auto sm:py-4 sm:text-base"
              >
                Reservar Turno
              </Link>
              <Link
                href="#servicios"
                className="w-full rounded-full border border-border bg-background px-8 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-secondary active:scale-95 sm:w-auto sm:py-4 sm:text-base"
              >
                Ver Servicios
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
