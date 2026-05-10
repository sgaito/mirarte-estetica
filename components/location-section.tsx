import { FadeIn } from "@/components/fade-in"

const HORARIOS = [
  { dia: "Lunes – Viernes", hora: "8:30 – 21:00" },
  { dia: "Sábados",         hora: "9:00 – 18:00" },
  { dia: "Domingos",        hora: "Cerrado" },
]

/*
  Mapa: para reemplazar por el embed oficial, en Google Maps:
  Compartir → Incorporar un mapa → copiar el valor del atributo src del iframe
  y pegarlo en MAP_EMBED_SRC.
*/
const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=mirarte+estetica+rosario+argentina&output=embed&hl=es&z=16"

export function LocationSection() {
  return (
    <section id="ubicacion" className="bg-secondary py-24 scroll-mt-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              <span className="heading-emphasis">Ubicación</span> y{" "}
              <span className="heading-emphasis">Horarios</span>
            </h2>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {/* Mapa */}
          <FadeIn delay={0.1} direction="none">
            <div className="overflow-hidden rounded-2xl shadow-sm h-full">
              <iframe
                src={MAP_EMBED_SRC}
                className="h-full min-h-80 w-full border-0 lg:min-h-96"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Mirarte Estética"
              />
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
                href="#"
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
