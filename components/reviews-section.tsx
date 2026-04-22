import { Star } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

const reviews = [
  {
    id: 1,
    name: "María García",
    text: "Una experiencia increíble. El ambiente es súper relajante y el tratamiento facial dejó mi piel como nunca antes. Totalmente recomendado.",
    rating: 5,
  },
  {
    id: 2,
    name: "Laura Fernández",
    text: "El mejor centro de estética al que he ido. El personal es muy profesional y atento. Los masajes son una maravilla, salí renovada.",
    rating: 5,
  },
  {
    id: 3,
    name: "Carolina Martínez",
    text: "Me encanta la atención personalizada que brindan. Cada visita es una experiencia única de bienestar. Ya soy clienta frecuente.",
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "fill-primary text-primary" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              Lo que dicen nuestras{" "}
              <span className="font-semibold">Clientas</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              La satisfacción de quienes nos visitan es nuestra mayor recompensa.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, idx) => (
            <FadeIn key={review.id} delay={idx * 0.1}>
              <div className="rounded-2xl bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <StarRating rating={review.rating} />
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-card-foreground">
                    {review.name}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
