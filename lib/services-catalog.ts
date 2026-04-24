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
        shortDesc:
          "Mirada limpia y muy natural: se integra con tus pestañas como si siempre hubieran sido así.",
        fullDesc:
          "Style Natural está pensado para quien quiere levantar la mirada sin que se note que lleva extensiones. Se trabaja con curvas y largos muy armónicos con tu ojo, sumando solo el volumen justo para dar definición y apertura. Es el estilo ideal para empezar, para el día a día o para quien prefiere un acabado discreto y elegante.",
        details: [
          "Efecto «yo, pero mejor»",
          "Ideal para primera vez en extensiones",
          "Combinable con el asesoramiento previo de diseño y curvatura",
        ],
        photos: photos("pestanas", "style-natural", ["1.jpg"]),
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
        slug: "volumen-2d",
        name: "Volúmen Natural 2D",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "volumen-2d", []),
      },
      {
        slug: "volumen-3d",
        name: "Volúmen 3D",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "volumen-3d", []),
      },
      {
        slug: "volumen-4d",
        name: "Volúmen 4D",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "volumen-4d", []),
      },
      {
        slug: "glow-5d",
        name: "Volúmen Glow (5D)",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "glow-5d", []),
      },
      {
        slug: "ruso-6d",
        name: "Volúmen Ruso (6D)",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "ruso-6d", []),
      },
      {
        slug: "mega-volumen",
        name: "Mega Volúmen (full 6D – 8D)",
        group: "extension",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "mega-volumen", []),
      },
      {
        slug: "lash-lifting-botox",
        name: "Lash Lifting + Botox + Tintura",
        group: "tratamiento",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "lash-lifting-botox", []),
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
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("cejas", "diseno-perfilado", []),
      },
      {
        slug: "brow-lamination",
        name: "Brow Lamination",
        group: "main",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("cejas", "brow-lamination", []),
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
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
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
