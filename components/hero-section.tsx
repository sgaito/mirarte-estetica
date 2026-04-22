import Image from "next/image"
import Link from "next/link"

const WA_URL =
  "https://wa.me/5493416367119?text=Hola%20Mirarte%20Estetica!%20Quiero%20consultar%20por%20un%20turno."

export function HeroSection() {
  return (
    <section
      id="reservar"
      className="relative grid min-h-[100dvh] scroll-mt-20 grid-cols-1 bg-background pt-20 md:grid-cols-2"
    >
      {/* Columna izquierda — mismo fondo secundario que el resto del sitio */}
      <div className="relative z-0 flex min-h-[52dvh] flex-col justify-center bg-secondary px-8 py-14 md:min-h-[calc(100dvh-5rem)] md:px-14 lg:px-20 lg:py-20">
        {/* "Estética" decorativo con stroke (tinte turquesa suave) */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[42%] z-0 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(4.5rem,18vw,11rem)] font-light uppercase leading-none tracking-tight text-transparent opacity-[0.12]"
          style={{
            fontFamily: "var(--font-display), Montserrat, sans-serif",
            WebkitTextStroke: "1.5px oklch(0.72 0.12 185 / 0.45)",
          }}
        >
          Estética
        </span>

        <div className="relative z-10 mx-auto w-full max-w-xl">
          <h1 className="text-balance tracking-tight text-foreground">
            <span
              className="block text-[clamp(3rem,9vw,5.5rem)] leading-[0.95]"
              style={{ fontFamily: "var(--font-script), Great Vibes, cursive" }}
            >
              Mirarte
            </span>
            <span
              className="mt-2 block text-[clamp(0.7rem,1.6vw,0.85rem)] font-medium uppercase tracking-[0.35em] text-primary"
              style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
            >
              Estética
            </span>
          </h1>

          <p className="mt-8 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Espacio de belleza y bienestar en Rosario. Pestañas, cejas y tratamientos con dedicación,
            técnica y un ambiente pensado para que te sientas cómoda en cada visita.
          </p>

          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-sm font-medium text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-105 active:scale-95"
          >
            Reservar Turno
          </Link>
        </div>
      </div>

      {/* Columna derecha — imagen a pantalla completa */}
      <div className="relative min-h-[48dvh] w-full md:min-h-[calc(100dvh-5rem)]">
        <Image
          src="/placeholder.jpg"
          alt="Mirarte Estética — ambiente del salón"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Badge circular en el encuentro de columnas */}
      <div className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 max-md:top-[calc(5rem+52dvh-3.5rem)] md:top-1/2 md:-translate-y-1/2">
        <div className="pointer-events-auto h-28 w-28 rounded-full bg-background p-1 shadow-xl ring-1 ring-border/60 md:h-32 md:w-32">
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
