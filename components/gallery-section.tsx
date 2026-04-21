const galleryImages = [
  {
    id: 1,
    alt: "Sala de tratamientos con iluminación suave",
    placeholder: "bg-gradient-to-br from-primary/20 to-secondary",
  },
  {
    id: 2,
    alt: "Productos naturales de belleza",
    placeholder: "bg-gradient-to-br from-secondary to-primary/10",
  },
  {
    id: 3,
    alt: "Espacio de relajación",
    placeholder: "bg-gradient-to-br from-primary/15 to-secondary",
  },
  {
    id: 4,
    alt: "Tratamiento facial en proceso",
    placeholder: "bg-gradient-to-br from-secondary to-primary/20",
  },
  {
    id: 5,
    alt: "Ambiente zen del spa",
    placeholder: "bg-gradient-to-br from-primary/10 to-secondary",
  },
  {
    id: 6,
    alt: "Detalles del centro de belleza",
    placeholder: "bg-gradient-to-br from-secondary to-primary/15",
  },
]

export function GallerySection() {
  return (
    <section id="galeria" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
            Nuestra <span className="font-semibold">Galería</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Conoce nuestros espacios diseñados para tu comodidad y bienestar.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {/* Placeholder - replace with actual images */}
              <div
                className={`absolute inset-0 ${image.placeholder} flex items-center justify-center`}
              >
                <span className="text-sm text-muted-foreground/50">
                  {image.alt}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
