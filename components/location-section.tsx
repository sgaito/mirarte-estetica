import { MapPin } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { SectionSeam } from "@/components/section-seam"

const HORARIOS = [
  { dia: "Lunes – Viernes", hora: "8:30 – 21:00" },
  { dia: "Sábados",         hora: "9:00 – 18:00" },
  { dia: "Domingos",        hora: "Cerrado" },
]

const ADDRESS = "Sarmiento 1073, Rosario centro, Santa Fe, Argentina."
const MAP_QUERY = "Sarmiento+1073,+Rosario,+Argentina"
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${MAP_QUERY}&output=embed&hl=es&z=16`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`
const WA_RESERVA_URL =
  "https://wa.me/5493416367119?text=" +
  encodeURIComponent("Hola Mirarte Estética! Quiero reservar un turno.")

export function LocationSection() {
  return (
    <section
      id="ubicacion"
      className="relative scroll-mt-20 overflow-hidden bg-secondary py-24 lg:py-32"
    >
      <SectionSeam edge="bottom" to="var(--background)" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              <span className="heading-emphasis">Ubicación</span> y{" "}
              <span className="heading-emphasis">Horarios</span>
            </h2>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {/* Mapa + dirección */}
          <FadeIn delay={0.1} direction="none">
            <div className="flex h-full flex-col gap-4">
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-3 rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-sm transition-colors hover:border-primary/30 hover:bg-card/90"
              >
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                    Dirección
                  </span>
                  <span className="mt-1 block text-base font-medium text-foreground group-hover:text-primary">
                    {ADDRESS}
                  </span>
                </span>
              </a>
              <div className="overflow-hidden rounded-2xl shadow-sm">
                <iframe
                  src={MAP_EMBED_SRC}
                  className="min-h-80 w-full border-0 lg:min-h-96"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Mirarte Estética"
                />
              </div>
            </div>
          </FadeIn>

          {/* Horarios + botón */}
          <FadeIn delay={0.2}>
            <div className="flex flex-col justify-between gap-8 rounded-2xl bg-card p-8 shadow-sm">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Horarios de atención</h3>
                <ul className="mt-6 divide-y divide-border">
                  {HORARIOS.map(({ dia, hora }) => (
                    <li key={dia} className="flex items-center justify-between py-4">
                      <span className="text-foreground/80">{dia}</span>
                      <span
                        className={`font-medium ${
                          hora === "Cerrado" ? "text-muted-foreground" : "text-primary"
                        }`}
                      >
                        {hora}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-sm text-muted-foreground">
                  Los turnos son con reserva previa. Consultanos por disponibilidad.
                </p>
              </div>

              <a
                href={WA_RESERVA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full bg-primary py-4 text-center text-base font-medium text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-105 active:scale-95"
              >
                Reservar Turno
              </a>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
