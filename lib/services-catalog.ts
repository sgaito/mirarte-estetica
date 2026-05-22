/**
 * Catálogo de servicios — textos según lo enviado por Eli.
 * Sin copy oficial: mismo criterio (no inventar), mensaje más claro al usuario.
 *
 * Fotos: /public/servicios/{categoría}/{slug}/ + nombres en `photos()`.
 *
 * Pestañas: tarjetas agrupadas (variants) para reducir nodos DOM en móvil.
 */

export const DESCRIPCION_SERVICIO_PENDIENTE =
  "Aún no hay descripción publicada para este servicio. Podés escribirnos por WhatsApp y te contamos con gusto."

/** A) Extensiones de pestaña de seda premium — mismo contenido que Eli, redacción fluida. */
export const ELI_EXTENSIONES_PREMIUM_INTRO =
  "Trabajo con técnica pelo por pelo en Clásica y Volúmen. Uso productos de alta calidad: hipoalergénicos, de larga duración y resistentes al agua. Las pestañas son de seda premium importadas; el resultado se ve natural, respeta tus pestañas naturales y no les suma peso."

/** Destacados verdes bajo el párrafo de extensiones seda premium. */
export const ELI_EXTENSIONES_PREMIUM_HIGHLIGHTS = [
  "Productos certificados por ANMAT",
  "Cruelty free",
  "Extensiones de seda importadas “London Lash” y de Fibras tecnológicas",
] as const

/** Fotos del bloque “seda premium” / descripción de pestañas. */
export const ELI_EXTENSIONES_PREMIUM_IMAGES = [
  {
    src: "/servicios/pestanas/descripcion/1.jpeg",
    alt: "Extensiones de pestañas de seda premium en Mirarte Estética",
  },
  {
    src: "/servicios/pestanas/descripcion/2.jpeg",
    alt: "Detalle de extensiones de pestañas de seda premium en Mirarte Estética",
  },
] as const

/** Asesoramiento — mismo contenido que Eli, redacción fluida. */
export const ELI_ASESORAMIENTO_EXTENSIONES =
  "Antes de colocarte las extensiones hacemos un asesoramiento: ahí definimos juntas el diseño, el volumen, la curvatura y el largo. Con retoques a tiempo, en forma y cuidándolas, el trabajo puede mantenerse hasta tres meses."

/** Reglas — pestaña Pestañas (bloque “Cómo asistir a tu cita”). */
export const ELI_COMO_ASISTIR_CITA_PESTANAS = [
  "Desmaquillate completamente el área de los ojos, cejas y frente.",
  "Está prohibido asistir con acompañantes (en caso de que seas menor, podés venir con tu mamá, papá, amiga o tutor).",
  "La tolerancia máxima es de 20 minutos. La seña no es reembolsable.",
  "Consultá el tiempo de tu turno: cada caso es particular. Nuestro trabajo es artesanal y profesional.",
  "Si venís con extensiones, avisá así contemplamos el tiempo de remoción.",
]

/** Guía para reservar turno — placeholder hasta recibir el texto final. */
export const ELI_COMO_RESERVAR_TURNO_PESTANAS = [
  "Proximamente: Texto Correspondiente.",
]

export interface ServicePhoto {
  src: string
  alt: string
}

/** Opción dentro de una tarjeta agrupada (modal). */
export interface ServiceVariant {
  slug: string
  name: string
  shortDesc: string
  fullDesc: string
  details?: string[]
  photos: ServicePhoto[]
}

export interface ServiceItem {
  slug: string
  name: string
  group: "extension" | "tratamiento" | "main"
  tag?: string
  shortDesc: string
  fullDesc: string
  details?: string[]
  photos: ServicePhoto[]
  /** Si existe, la grilla muestra una tarjeta; el detalle está en el modal. */
  variants?: ServiceVariant[]
}

export interface ServiceCategory {
  id: string
  label: string
  services: ServiceItem[]
}

function photos(category: string, slug: string, files: string[]): ServicePhoto[] {
  return files.map((f) => ({
    src: `/servicios/${category}/${slug}/${f}`,
    alt: `${slug.replace(/-/g, " ")} — ${f.replace(/\.[^.]+$/, "").replace(/-/g, " ")}`,
  }))
}

/** Primera foto disponible entre la tarjeta y sus variantes (portada de la grilla). */
export function getServiceCardPhotos(service: ServiceItem): ServicePhoto[] {
  if (service.photos.length > 0) return service.photos
  const fromVariant = service.variants?.find((v) => v.photos.length > 0)
  return fromVariant?.photos ?? []
}

export const SERVICES_CATALOG: ServiceCategory[] = [
  {
    id: "pestanas",
    label: "Pestañas",
    services: [
      {
        slug: "clasicas-y-natural",
        name: "Clásicas y natural",
        group: "extension",
        shortDesc: "Style Natural y Clásicas: mirada natural con técnica pelo por pelo.",
        fullDesc:
          "Ideal si buscás un look natural y prolijo. Elegí la opción que mejor se adapte a lo que querés lograr.",
        photos: photos("pestanas", "clasicas", []),
        variants: [
          {
            slug: "style-natural",
            name: "Style Natural",
            shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            photos: photos("pestanas", "style-natural", []),
          },
          {
            slug: "clasicas",
            name: "Clásicas",
            shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            photos: photos("pestanas", "clasicas", []),
          },
        ],
      },
      {
        slug: "extensiones-volumen",
        name: "Extensiones de volumen",
        group: "extension",
        shortDesc:
          "Del 2D/3D al Mega Volúmen: distintos niveles de densidad, textura y dramatismo.",
        fullDesc:
          "Técnicas de volúmen con abanicos artesanales. Cada opción varía en cantidad de extensiones por abanico y en el efecto final.",
        photos: photos("pestanas", "mega-volumen", ["IMG_5984.JPEG", "IMG_5987.JPEG"]),
        variants: [
          {
            slug: "volumen-2d-y-3d",
            name: "Volúmen 2D y 3D",
            shortDesc:
              "Sutiles y naturales: abanicos artesanales de 2 a 3 extensiones; mirada destacada y audaz.",
            fullDesc:
              "Sutiles y naturales, ideales para comenzar: son abanicos artesanales de 2 a 3 extensiones creados en el momento, aplicados en el 100% de tus pestañas para lograr una mirada destacada y audaz.",
            photos: photos("pestanas", "volumen-2d-y-3d", []),
          },
          {
            slug: "volumen-4d",
            name: "Volúmen 4D",
            shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            photos: photos("pestanas", "volumen-4d", ["IMG_3051.JPEG", "IMG_3083.JPEG", "IMG_3085.JPEG"]),
          },
          {
            slug: "glow-5d",
            name: "Volúmen Glow",
            shortDesc:
              "Impacto con abanicos de 5 extensiones: cobertura total, textura súper liviana.",
            fullDesc:
              "El volumen justo para impactar: rellenamos todas tus pestañas naturales al 100% con abanicos artesanales armados en el momento de 5 extensiones; el grosor y la textura son súper livianos.",
            photos: photos("pestanas", "glow-5d", ["IMG_8171.JPEG", "IMG_8172.JPEG"]),
          },
          {
            slug: "ruso-6d",
            name: "Volúmen Ruso",
            shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            photos: photos("pestanas", "ruso-6d", ["IMG_3440.JPEG"]),
          },
          {
            slug: "mega-volumen",
            name: "Mega Volúmen",
            shortDesc:
              "100% de cobertura con fibras finísimas: efecto oscuro y voluminoso. Solo para exigentes.",
            fullDesc:
              "En esta técnica completamos el 100% de las pestañas naturales con abanicos artesanales armados en el momento con fibras súper finitas, para cuidar tus pestañas y crear un efecto súper oscuro y voluminoso. Solo para exigentes.",
            photos: photos("pestanas", "mega-volumen", ["IMG_5984.JPEG", "IMG_5987.JPEG"]),
          },
        ],
      },
      {
        slug: "estilos-especiales",
        name: "Estilos especiales",
        group: "extension",
        shortDesc: "Foxy Curv L y Delineado: detalles que marcan el diseño de tu mirada.",
        fullDesc: "Opciones para personalizar aún más el diseño y el efecto de tus extensiones.",
        photos: photos("pestanas", "foxy-curl-l", ["IMG_3393.JPEG", "IMG_3414.JPEG"]),
        variants: [
          {
            slug: "foxy-curl-l",
            name: "Foxy Curv L",
            shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            photos: photos("pestanas", "foxy-curl-l", ["IMG_3393.JPEG", "IMG_3414.JPEG"]),
          },
          {
            slug: "delineado",
            name: "Delineado",
            shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            photos: photos("pestanas", "delineado", ["IMG_2852.JPEG"]),
          },
        ],
      },
      {
        slug: "tratamientos-pestanas",
        name: "Tratamientos",
        group: "tratamiento",
        shortDesc:
          "Lash Lifting, Full Botox y Tintura: cuidado y realce de tus pestañas naturales.",
        fullDesc:
          "Si aún no te animás a las extensiones o querés complementar tu rutina, estos tratamientos realzan tus pestañas naturales.",
        photos: photos("pestanas", "lash-lifting-botox", ["IMG_2354.png", "IMG_2356.png"]),
        variants: [
          {
            slug: "lash-lifting-botox",
            name: "Lash Lifting + Botox + Tintura",
            shortDesc:
              "Si aún no te animás a las extensiones: curvatura natural con efecto de arqueado.",
            fullDesc:
              "Si aún no te animás a las extensiones, el lash lifting es una muy buena opción: modificamos la curvatura de tus pestañas naturales generando un efecto de arqueado.",
            photos: photos("pestanas", "lash-lifting-botox", ["IMG_2354.png", "IMG_2356.png"]),
          },
          {
            slug: "full-botox",
            name: "Full Botox",
            shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            photos: photos("pestanas", "full-botox", []),
          },
          {
            slug: "tintura",
            name: "Tintura",
            shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
            photos: photos("pestanas", "tintura", []),
          },
        ],
      },
    ],
  },
  {
    id: "cejas",
    label: "Cejas",
    services: [
      {
        slug: "microblading",
        name: "Microblading",
        group: "main",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("cejas", "microblading", []),
      },
      {
        slug: "diseno-perfilado",
        name: "Diseño y Perfilado de cejas",
        group: "main",
        shortDesc:
          "Diseño con regla y depilación con pinza e hilo para simetría y prolijidad.",
        fullDesc:
          "Realizamos el diseño ideal acorde a tu rostro utilizando una regla; luego trazamos diferentes líneas y depilamos con pinza e hilo, otorgando mayor simetría y prolijidad.",
        photos: photos("cejas", "diseno-perfilado", ["IMG_1569.JPEG"]),
      },
      {
        slug: "brow-lamination",
        name: "Brow Lamination",
        group: "main",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("cejas", "brow-lamination", ["IMG_3448.PNG", "IMG_3449.PNG", "IMG_9525.JPEG"]),
      },
      {
        slug: "microshading",
        name: "Microshading",
        group: "main",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("cejas", "microshading", []),
      },
      {
        slug: "alisado",
        name: "Alisado de cejas",
        group: "main",
        shortDesc:
          "Cejas peinadas en la dirección deseada: prolijidad y grosor; duración ~un mes y medio.",
        fullDesc:
          "Cejas peinadas con la dirección deseada: otorga prolijidad y grosor. Duración: un mes y medio (depende del crecimiento de los pelitos de tus cejas).",
        photos: photos("cejas", "alisado", []),
      },
      {
        slug: "full-botox-brow",
        name: "Full Botox Brow",
        group: "main",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("cejas", "full-botox-brow", []),
      },
    ],
  },
  {
    id: "labios",
    label: "Labios",
    services: [
      {
        slug: "micropigmentacion-lips",
        name: "Micropigmentación Lips",
        group: "main",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("labios", "micropigmentacion-lips", []),
      },
      {
        slug: "baby-botox",
        name: "Baby Botox",
        group: "main",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("labios", "baby-botox", []),
      },
    ],
  },
  {
    id: "bronceado",
    label: "Bronceado Orgánico",
    services: [
      {
        slug: "bronceado-organico",
        name: "Bronceado Orgánico",
        group: "main",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("bronceado", "bronceado-organico", []),
      },
    ],
  },
]
