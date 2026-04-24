import Image from "next/image"
import Link from "next/link"

const WA_URL =
  "https://wa.me/5493416367119?text=Hola%20Mirarte%20Estetica!%20Quiero%20consultar%20por%20un%20turno."

interface HeroSectionProps {
  heroImageSrc?: string | null
}

export function HeroSection({ heroImageSrc }: HeroSectionProps) {
  return (
    <section
      id="reservar"
      className="relative grid grid-cols-1 scroll-mt-20 bg-background pt-20 md:min-h-[100dvh] md:grid-cols-2"
    >
      {/* Columna izquierda — mismo fondo secundario que el resto del sitio */}
      <div className="relative z-0 flex min-h-[46dvh] flex-col justify-center bg-secondary px-5 py-10 sm:px-6 md:min-h-[calc(100dvh-5rem)] md:px-14 md:py-14 lg:px-20 lg:py-20">
        {/* "Estética" decorativo con stroke (tinte turquesa suave) */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[44%] z-0 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(3rem,14vw,11rem)] font-light uppercase leading-none tracking-tight text-transparent opacity-[0.08] md:opacity-[0.12]"
          style={{
            fontFamily: "var(--font-display), Montserrat, sans-serif",
            WebkitTextStroke: "1.5px oklch(0.72 0.12 185 / 0.45)",
          }}
        >
          Estética
        </span>

        <div className="relative z-10 mx-auto w-full max-w-xl">
          <h1
            className="text-balance text-4xl font-medium tracking-tight text-foreground/90 md:text-5xl"
            style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
          >
            Realzá tu belleza natural. Especialistas en pestañas y cejas.
            <span
              className="mt-2 block text-[clamp(0.7rem,1.6vw,0.85rem)] font-medium uppercase tracking-[0.35em] text-primary"
              style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
            >
              Estética
            </span>
          </h1>

          <p className="mt-7 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-9 md:text-lg">
            Espacio de belleza y bienestar en Rosario. Pestañas, cejas y tratamientos con dedicación,
            técnica y un ambiente pensado para que te sientas cómoda en cada visita.
          </p>

          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-105 active:scale-95 sm:mt-10 sm:w-auto sm:px-10 sm:py-4"
          >
            Reservar Turno
          </Link>
        </div>
      </div>

      {/* Columna derecha — imagen a pantalla completa */}
      <div className="relative min-h-[40dvh] w-full md:min-h-[calc(100dvh-5rem)]">
        <Image
          src={heroImageSrc ?? "/placeholder.jpg"}
          alt="Mirarte Estética — ambiente del salón"
          fill
          priority
          unoptimized={!!heroImageSrc}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Badge circular en el encuentro de columnas */}
      <div className="pointer-events-none absolute left-1/2 top-[calc(100%-22dvh)] z-20 hidden -translate-x-1/2 md:block md:top-1/2 md:-translate-y-1/2">
        <div className="pointer-events-auto h-20 w-20 rounded-full bg-background p-1 shadow-xl ring-1 ring-border/60 sm:h-24 sm:w-24 md:h-32 md:w-32">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Mirarte Estética"
            className="h-full w-full rounded-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}
