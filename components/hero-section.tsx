import Link from "next/link"
import { Phone } from "lucide-react"

const WA_URL =
  "https://wa.me/5493416367119?text=Hola%20Mirarte%20Estetica!!%20Quiero%20consultar%20por%20un%20turno."

const CALL_URL = "tel:+5493416367119"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const ctaClassName =
  "inline-flex h-[3.25rem] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-4 text-[13px] font-medium text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-105 active:scale-95 sm:h-14 sm:gap-2.5 sm:px-6 sm:text-base"

export function HeroSection() {
  return (
    <section
      id="reservar"
      className="
        relative flex min-h-[100dvh] scroll-mt-20 items-center justify-center overflow-hidden
        bg-[var(--hero-services-seam)] pt-20
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

      {/* Puente pegado al borde inferior: casi toda la banda sigue siendo foto; el fundido fuerte solo abajo (como si subiera desde Servicios). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[min(26vh,10.5rem)] sm:h-[min(28vh,12rem)] md:h-[min(30vh,13.5rem)]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 0%, transparent 52%, rgba(255,255,255,0.15) 68%, rgba(255,255,255,0.55) 82%, rgba(255,255,255,0.92) 93%, var(--hero-services-seam) 100%)",
        }}
      />

      {/* ── Contenido centrado ── */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center sm:gap-7 sm:py-20 md:gap-8">

        {/* Título */}
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/45 sm:text-xs"
            style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
          >
            Since 2019
          </p>
          <h1
            className="max-w-2xl text-balance text-3xl font-semibold uppercase tracking-[0.12em] text-foreground/85 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
          >
            Tu mirada habla por vos
          </h1>
          <p
            className="max-w-[min(100%,20rem)] text-pretty text-xl leading-snug text-foreground/55 sm:max-w-none sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-script), Great Vibes, cursive" }}
          >
            N °1 en Rosario
          </p>
        </div>

        {/* Bajada */}
        <p
          className="max-w-md text-pretty text-sm leading-relaxed text-foreground/60 sm:text-base"
          style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
        >
          Nos especializamos en pestañas y cejas, combinando técnicas de alta calidad, atención personalizada y un profundo compromiso con la seguridad y el bienestar de cada clienta. Porque más que realzar tu belleza, queremos que te sientas única, confiada y verdaderamente cuidada.
        </p>

        {/* CTAs */}
        <div
          className="flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-md"
          style={{ fontFamily: "var(--font-display), Montserrat, sans-serif" }}
        >
          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClassName}
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            Reserva tu turno por WhatsApp
          </Link>
          <a href={CALL_URL} className={ctaClassName}>
            <Phone className="h-5 w-5 shrink-0" strokeWidth={2} />
            Reserva tu turno por llamada
          </a>
        </div>
      </div>
    </section>
  )
}
