/**
 * Catálogo de servicios — textos según lo enviado por Eli.
 * Sin copy oficial: mismo criterio (no inventar), mensaje más claro al usuario.
 *
 * Fotos: /public/servicios/{categoría}/{slug}/ + nombres en `photos()`.
 */

export const DESCRIPCION_SERVICIO_PENDIENTE =
  "Aún no hay descripción publicada para este servicio. Podés escribirnos por WhatsApp y te contamos con gusto."

/** A) Extensiones de pestaña de seda premium — mismo contenido que Eli, redacción fluida. */
export const ELI_EXTENSIONES_PREMIUM_INTRO =
  "Trabajo con técnica pelo por pelo en Clásica y Volúmen. Uso productos de alta calidad: hipoalergénicos, de larga duración y resistentes al agua. Las pestañas son de seda premium importadas; el resultado se ve natural, respeta tus pestañas naturales y no les suma peso."

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

export interface ServicePhoto {
  src: string
  alt: string
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

export const SERVICES_CATALOG: ServiceCategory[] = [
  {
    id: "pestanas",
    label: "Pestañas",
    services: [
      {
        slug: "style-natural",
        name: "Style Natural",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "style-natural", ["1.jpg", "2.jpg", "3.jpg"]),
      },
      {
        slug: "clasicas",
        name: "Clásicas",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "clasicas", []),
      },
      {
        slug: "volumen-2d-y-3d",
        name: "Volúmen 2D y 3D",
        group: "extension",
        shortDesc:
          "Sutiles y naturales: abanicos artesanales de 2 a 3 extensiones; mirada destacada y audaz.",
        fullDesc:
          "Sutiles y naturales, ideales para comenzar: son abanicos artesanales de 2 a 3 extensiones creados en el momento, aplicados en el 100% de tus pestañas para lograr una mirada destacada y audaz.",
        photos: photos("pestanas", "volumen-2d-y-3d", []),
      },
      {
        slug: "volumen-4d",
        name: "Volúmen 4D",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "volumen-4d", ["IMG_3051.JPEG", "IMG_3083.JPEG", "IMG_3085.JPEG"]),
      },
      {
        slug: "glow-5d",
        name: "Volúmen Glow",
        group: "extension",
        shortDesc:
          "Impacto con abanicos de 5 extensiones: cobertura total, textura súper liviana.",
        fullDesc:
          "El volumen justo para impactar: rellenamos todas tus pestañas naturales al 100% con abanicos artesanales armados en el momento de 5 extensiones; el grosor y la textura son súper livianos.",
        photos: photos("pestanas", "glow-5d", ["IMG_8171.JPEG", "IMG_8172.JPEG"]),
      },
      {
        slug: "ruso-6d",
        name: "Volúmen Ruso",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "ruso-6d", ["IMG_3440.JPEG"]),
      },
      {
        slug: "mega-volumen",
        name: "Mega Volúmen",
        group: "extension",
        shortDesc:
          "100% de cobertura con fibras finísimas: efecto oscuro y voluminoso. Solo para exigentes.",
        fullDesc:
          "En esta técnica completamos el 100% de las pestañas naturales con abanicos artesanales armados en el momento con fibras súper finitas, para cuidar tus pestañas y crear un efecto súper oscuro y voluminoso. Solo para exigentes.",
        photos: photos("pestanas", "mega-volumen", ["IMG_5984.JPEG", "IMG_5987.JPEG"]),
      },
      {
        slug: "foxy-curl-l",
        name: "Foxy Curv L",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "foxy-curl-l", ["IMG_3393.JPEG", "IMG_3414.JPEG"]),
      },
      {
        slug: "delineado",
        name: "Delineado",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "delineado", ["IMG_2852.JPEG"]),
      },
      {
        slug: "lash-lifting-botox",
        name: "Lash Lifting + Botox + Tintura",
        group: "tratamiento",
        shortDesc:
          "Si aún no te animás a las extensiones: curvatura natural con efecto de arqueado.",
        fullDesc:
          "Si aún no te animás a las extensiones, el lash lifting es una muy buena opción: modificamos la curvatura de tus pestañas naturales generando un efecto de arqueado.",
        photos: photos("pestanas", "lash-lifting-botox", ["IMG_2354.png", "IMG_2356.png"]),
      },
      {
        slug: "full-botox",
        name: "Full Botox",
        group: "tratamiento",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "full-botox", []),
      },
      {
        slug: "tintura",
        name: "Tintura",
        group: "tratamiento",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "tintura", []),
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
