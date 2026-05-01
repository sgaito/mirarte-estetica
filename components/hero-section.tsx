import Link from "next/link"

const WA_URL =
  "https://wa.me/5493416367119?text=Hola%20Mirarte%20Estetica!%20Quiero%20consultar%20por%20un%20turno."

export function HeroSection() {
  return (
    <section
      id="reservar"
      className="
        relative flex min-h-[100dvh] scroll-mt-20 items-center justify-center overflow-hidden
        bg-secondary pt-20
      "
    >
      {/*
        ── Fondo: desktop centrado; mobile desplazado a la derecha para enmarcar
           con las ramas/flores de la esquina superior derecha del arte original.
      ── */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover max-md:bg-[position:92%_38%] md:bg-center"
        style={{ backgroundImage: "url('/bg-hero.png')" }}
      />
      {/* Overlay mobile (más visible) → desktop (casi transparente) */}
      <div className="absolute inset-0 bg-background/45 sm:bg-background/25 md:bg-background/15" />

      {/* ── Contenido centrado ── */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center sm:gap-7 sm:py-20 md:gap-8">

        {/* Título */}
        <div className="flex flex-col items-center gap-2">
          <h1
            className="max-w-2xl text-balance text-3xl font-semibold uppercase tracking-[0.12em] text-foreground/85 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
          >
            Realzá tu Mirada
          </h1>
          <p
            className="text-2xl text-foreground/55 sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-script), Great Vibes, cursive" }}
          >
            Pestañas y Cejas en Rosario
          </p>
        </div>

        {/* Bajada */}
        <p
          className="max-w-md text-pretty text-sm leading-relaxed text-foreground/60 sm:text-base"
          style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
        >
          Espacio de belleza y bienestar. Extensiones de pestañas, lifting, diseño de cejas
          y tratamientos con dedicación y calidad premium.
        </p>

        {/* CTA */}
        <Link
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-primary px-9 py-3.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-105 active:scale-95 sm:px-11 sm:py-4 sm:text-base"
          style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
        >
          Reservar Turno
        </Link>
      </div>
    </section>
  )
}
