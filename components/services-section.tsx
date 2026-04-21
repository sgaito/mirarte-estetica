import {
  Sparkles,
  Leaf,
  Heart,
  Droplets,
  Sun,
  Flower2,
} from "lucide-react"

const services = [
  {
    icon: Sparkles,
    title: "Limpieza Facial Profunda",
    description:
      "Tratamiento completo que elimina impurezas y revitaliza tu piel, dejándola fresca y radiante.",
  },
  {
    icon: Leaf,
    title: "Masaje Relajante",
    description:
      "Sesiones personalizadas que alivian tensiones y te transportan a un estado de calma absoluta.",
  },
  {
    icon: Heart,
    title: "Tratamiento Antiedad",
    description:
      "Técnicas avanzadas para reducir líneas de expresión y devolver la firmeza natural a tu rostro.",
  },
  {
    icon: Droplets,
    title: "Hidratación Intensiva",
    description:
      "Nutrición profunda para pieles secas o deshidratadas con activos de última generación.",
  },
  {
    icon: Sun,
    title: "Exfoliación Corporal",
    description:
      "Renovación celular completa que suaviza y uniforma el tono de tu piel de manera natural.",
  },
  {
    icon: Flower2,
    title: "Aromaterapia",
    description:
      "Experiencia sensorial con aceites esenciales que equilibra cuerpo, mente y espíritu.",
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
            Nuestros <span className="font-semibold">Servicios</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Cada tratamiento está diseñado para brindarte una experiencia única
            de bienestar y relajación.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
