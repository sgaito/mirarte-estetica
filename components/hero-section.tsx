import Link from "next/link"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="reservar"
      className="relative min-h-screen flex items-center justify-center bg-background pt-20"
    >
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Tu bienestar es nuestra prioridad
            </span>
          </div>

          <h1 className="text-balance text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Descubre el arte del{" "}
            <span className="font-semibold text-primary">cuidado personal</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            En Mirarte Estética creamos experiencias únicas de relajación y
            belleza. Déjate consentir por nuestros especialistas en un ambiente
            diseñado para tu tranquilidad.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#contacto"
              className="rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-105"
            >
              Reservar Turno
            </Link>
            <Link
              href="#servicios"
              className="rounded-full border border-border bg-background px-8 py-4 text-base font-medium text-foreground transition-all hover:bg-secondary"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
