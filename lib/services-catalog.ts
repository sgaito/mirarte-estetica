/**
 * Catálogo de servicios — textos según lo enviado por Eli.
 * Fotos: /public/servicios/{categoría}/{slug}/ + nombres en `photos()`.
 */

export const DESCRIPCION_SERVICIO_PENDIENTE =
  "Aún no hay descripción publicada para este servicio. Podés escribirnos por WhatsApp y te contamos con gusto."

export const TEXTO_PROXIMAMENTE = "Proximamente"

/** Pestaña Cursos — copy temporal hasta tener el programa armado. */
export const CURSOS_DESCRIPCION = TEXTO_PROXIMAMENTE

/** A) Extensiones de pestaña de seda premium */
export const ELI_EXTENSIONES_PREMIUM_INTRO =
  "Trabajo con técnica pelo por pelo en Clásica y Volúmen. Uso productos de alta calidad, de larga duración y resistentes al agua. Las extensiones de pestañas brindan un resultado natural, respeta tus pestañas naturales y no les suma peso."

export const ELI_EXTENSIONES_PREMIUM_HIGHLIGHTS = [
  "Productos certificados por ANMAT",
  "Hipoalergénicos",
  "Extensiones de seda importadas “London Lash” y de Fibras tecnológicas",
  "Cruelty free",
] as const

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

export const ELI_ASESORAMIENTO_EXTENSIONES =
  "Antes de colocarte las extensiones hacemos un asesoramiento: ahí definimos juntas el diseño, el volumen, la curvatura y el largo. Con retoques a tiempo, en forma y cuidándolas, el trabajo puede mantenerse hasta tres meses."

/** Beneficios y procedimiento — bloque general extensiones (pestañas). */
export const ELI_EXTENSIONES_BENEFICIOS = [
  "Aporta volumen y longitud inmediata",
  "Resalta la mirada",
  "No daña ni debilita las pestañas naturales",
  "Es indoloro y no invasivo",
  "Tratamiento semi permanente",
  "Resultado natural o con volúmen delicado",
] as const

export const ELI_EXTENSIONES_PROCEDIMIENTO_INTRO =
  "En Mirarte Estética usamos productos importados, hipoalergénicos y trabajamos bajo estrictas normas de bioseguridad e higiene. El procedimiento dura aproximadamente entre 1 h 30 y 2 h."

export const ELI_EXTENSIONES_DURACION =
  "Las pestañas naturales se renuevan cada 6 a 8 semanas, por lo que se recomienda un service cada 15 a 21 días para mantenerlas siempre prolijas, completas y perfectas. De esta manera las podemos hacer durar 3 meses."

/** Reglas — pestaña Pestañas (bloque “Cómo asistir a tu cita”). */
export const ELI_COMO_ASISTIR_CITA_PESTANAS = [
  "Desmaquillate completamente el área de los ojos, cejas y frente.",
  "Está prohibido asistir con acompañantes (en caso de que seas menor, podés venir con tu mamá, papá, amiga o tutor).",
  "La tolerancia máxima es de 20 minutos. La seña no es reembolsable.",
  "Consultá el tiempo de tu turno: cada caso es particular. Nuestro trabajo es artesanal y profesional.",
  "Si venís con extensiones, avisá así contemplamos el tiempo de remoción.",
  "No realizamos retoques de otros estudios.",
]

export const ELI_COMO_RESERVAR_TURNO_PESTANAS = ["Proximamente: Texto Correspondiente."]

export interface ServicePhoto {
  src: string
  alt: string
}

export interface ServiceDetailSection {
  title: string
  intro?: string
  items: string[]
}

export interface ServiceItem {
  slug: string
  name: string
  group: "extension" | "tratamiento" | "main"
  tag?: string
  shortDesc: string
  fullDesc: string
  /** Muestra “Proximamente” destacado en turquesa (modal y/o tarjeta). */
  comingSoon?: boolean
  sections?: ServiceDetailSection[]
  duration?: string
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

function section(title: string, items: string[], intro?: string): ServiceDetailSection {
  return { title, items, intro }
}

const BIOSEGURIDAD_CEJAS =
  "En Mirarte Estética trabajamos bajo estrictas normas de bioseguridad e higiene."

const BIOSEGURIDAD_PESTANAS =
  "En Mirarte Estética usamos productos importados, hipoalergénicos y trabajamos bajo estrictas normas de bioseguridad e higiene."

export const SERVICES_CATALOG: ServiceCategory[] = [
  {
    id: "pestanas",
    label: "Pestañas",
    services: [
      {
        slug: "style-natural",
        name: "Style Natural",
        group: "extension",
        shortDesc: "Look natural con técnica pelo por pelo.",
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "style-natural", ["IMG_5152.PNG"]),
      },
      {
        slug: "clasicas",
        name: "Clásicas",
        group: "extension",
        shortDesc: "Extensiones clásicas pelo por pelo.",
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "clasicas", ["FFE91095-D3DB-44CD-8764-7743C2A6DBF4.PNG"]),
      },
      {
        slug: "volumen-2d-y-3d",
        name: "Volúmen 2D y 3D",
        group: "extension",
        shortDesc:
          "Sutiles y naturales: abanicos artesanales de 2 a 3 extensiones; mirada destacada y audaz.",
        fullDesc:
          "Sutiles y naturales, ideales para comenzar: son abanicos artesanales de 2 a 3 extensiones creados en el momento, aplicados en el 100% de tus pestañas para lograr una mirada destacada y audaz.",
        photos: photos("pestanas", "volumen-2d-y-3d", [
          "C2FD5858-64C1-4D35-8C93-320239207714.jpg",
          "7F93B8BA-4C63-4A96-BADC-87F0D8875678.jpg",
          "72A41572-B22B-4D11-8056-D989E0CC3E9A.jpg",
        ]),
      },
      {
        slug: "volumen-4d",
        name: "Volúmen 4D",
        group: "extension",
        shortDesc: "Mayor densidad y definición en la mirada.",
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
        shortDesc: "Volumen ruso con efecto denso y definido.",
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
        shortDesc: "Diseño con curvatura Foxy para mirada lifting.",
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "foxy-curl-l", ["IMG_3393.JPEG", "IMG_3414.JPEG"]),
      },
      {
        slug: "delineado",
        name: "Delineado",
        group: "extension",
        shortDesc: "Efecto delineado en la línea de pestañas.",
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("pestanas", "delineado", ["IMG_2852.JPEG"]),
      },
      {
        slug: "lash-lifting-botox",
        name: "Lash Lifting + Botox + Tintura",
        group: "tratamiento",
        shortDesc:
          "Levanta y curva tus pestañas naturales: más largo, definición y apertura de mirada.",
        fullDesc:
          "Es una técnica que levanta y curva tus pestañas naturales desde la raíz, logrando un efecto de mayor longitud, definición y apertura de la mirada sin necesidad de extensiones.",
        sections: [
          section("Beneficios", [
            "Pestañas 100% naturales",
            "Efecto de mayor largo y curvatura",
            "Mirada más abierta y luminosa",
            "Resultado duradero entre 4 y 8 semanas",
            "No requiere mantenimiento constante",
            "Ideal para un look natural sin maquillaje",
          ]),
          section("Procedimiento", [
            "Se coloca un molde de silicona según el largo de tus pestañas y diseño elegido",
            "Se fijan las pestañas naturales sobre el molde",
            "Se aplican productos específicos para levantar y dar curvatura",
            "Se coloca un tinte para intensificar el color",
            "Se finaliza con un shock de queratina y botox para nutrir y fortalecer",
          ], BIOSEGURIDAD_PESTANAS),
        ],
        duration: "45 minutos",
        photos: photos("pestanas", "lash-lifting-botox", ["1.jpeg", "IMG_2354.png", "IMG_2356.png"]),
      },
      {
        slug: "full-botox",
        name: "Full Botox Nutritivo",
        group: "tratamiento",
        shortDesc: "Nutre, fortalece y revitaliza tus pestañas naturales desde la raíz.",
        fullDesc:
          "Es un tratamiento hidratante y reparador que ayuda a fortalecer, nutrir y revitalizar las pestañas desde la raíz. Aporta vitaminas, proteínas y nutrientes que mejoran la elasticidad, el brillo y la salud de las pestañas naturales, dejándolas más suaves, fuertes y saludables.",
        sections: [
          section("Procedimiento", [
            "Realizamos una limpieza profunda de las pestañas naturales",
            "Colocamos el botox y lo dejamos actuar",
            "Finalizamos con un shock de queratina",
          ]),
        ],
        duration: "30 minutos",
        photos: photos("pestanas", "full-botox", ["IMG_20260626_041129.png"]),
      },
      {
        slug: "tintura",
        name: "Tintura",
        group: "tratamiento",
        shortDesc: "Intensifica el color de tus pestañas naturales con tinte negro.",
        fullDesc:
          "Es un tratamiento donde primero realizamos una limpieza profunda de las pestañas naturales y luego colocamos un tinte de color negro para intensificar el color de tus pestañas, logrando un resultado natural y de mayor volumen sin la necesidad de colocar extensiones.",
        sections: [
          section("Beneficios", [
            "Pestañas 100% naturales",
            "Efecto de mayor largo",
            "Mirada más abierta y luminosa",
            "Duración: 2 semanas",
            "Ideal para un look natural sin maquillaje",
          ]),
        ],
        duration: "20 minutos",
        photos: photos("pestanas", "tintura", ["IMG_20260626_042233.png"]),
      },
    ],
  },
  {
    id: "cejas",
    label: "Cejas",
    services: [
      {
        slug: "diseno-perfilado",
        name: "Diseño y Perfilado de cejas",
        group: "main",
        shortDesc: "Diseño personalizado con regla, hilo y pinza para máxima precisión.",
        fullDesc:
          "Realizamos el diseño ideal acorde a tu rostro utilizando una regla y trazando diferentes líneas simétricas, luego depilamos con hilo y pinza para lograr máxima precisión y un resultado prolijo, natural y armónico.",
        sections: [
          section("Beneficios", [
            "Indoloro",
            "Diseño totalmente personalizado",
            "Corrige y mejora la forma de la ceja",
            "Resultado natural",
            "Resalta la mirada",
            "Fácil mantenimiento",
          ]),
          section("Procedimiento", [
            "Diseñamos la forma ideal de tus cejas según tus facciones, utilizando medición profesional",
            "Realizamos el perfilado retirando los pelitos fuera del diseño",
            "Recortamos y perfeccionamos para lograr un acabado prolijo y definido",
          ], `${BIOSEGURIDAD_CEJAS}`),
          section("Mantenimiento", [
            "Se recomienda realizar el perfilado cada 30 días para mantener el diseño perfecto",
          ]),
        ],
        photos: photos("cejas", "diseno-perfilado", ["IMG_1569.JPEG"]),
      },
      {
        slug: "brow-lamination",
        name: "Brow Lamination",
        group: "main",
        shortDesc: "Alinea y fija los pelitos para cejas ordenadas con volumen natural.",
        fullDesc:
          "Es una técnica que alinea y fija los pelitos de las cejas en una misma dirección, logrando un efecto más ordenado, definido y con volumen natural. Permite peinarlas y mantenerlas prolijas todos los días sin esfuerzo.",
        sections: [
          section("Beneficios", [
            "Cejas más ordenadas y con efecto “lifting” natural",
            "Resultado duradero entre 4 y 6 semanas",
            "Realza la forma natural de la ceja",
            "Indoloro",
          ]),
          section("Procedimiento", [
            "Se realiza un perfilado si es necesario",
            "Se alinean y peinan los pelitos en la dirección deseada",
            "Se aplica el producto fijador que mantiene la forma lograda",
          ], "En Mirarte Estética utilizamos siempre productos importados e hipoalergénicos, bajo estrictas normas de bioseguridad e higiene."),
        ],
        duration: "45 minutos",
        photos: photos("cejas", "brow-lamination", ["IMG_3448.PNG", "IMG_3449.PNG", "IMG_9525.JPEG"]),
      },
      {
        slug: "alisado",
        name: "Alisado de cejas",
        group: "main",
        shortDesc: "Cejas peinadas en la dirección deseada: prolijidad y grosor.",
        fullDesc: "Cejas peinadas con la dirección deseada: otorga prolijidad y grosor.",
        sections: [
          section("Beneficios", [
            "Cejas más ordenadas y con efecto “lifting” natural",
            "Resultado duradero entre 4 y 6 semanas",
            "Realza la forma natural de la ceja",
            "Indoloro",
          ]),
          section("Procedimiento", [
            "Se realiza un perfilado si es necesario",
            "Se alinean y peinan los pelitos en la dirección deseada",
            "Se aplica el producto fijador que mantiene la forma lograda",
          ], "En Mirarte Estética utilizamos siempre productos importados e hipoalergénicos, bajo estrictas normas de bioseguridad e higiene."),
        ],
        duration: "45 minutos",
        photos: photos("cejas", "alisado", ["IMG_20260612_170444.jpg.jpeg"]),
      },
      {
        slug: "full-botox-brow",
        name: "Full Botox Brow",
        group: "main",
        shortDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        fullDesc: DESCRIPCION_SERVICIO_PENDIENTE,
        photos: photos("cejas", "full-botox-brow", ["IMG_20260626_040956.png"]),
      },
      {
        slug: "microblading",
        name: "Microblading",
        group: "main",
        comingSoon: true,
        shortDesc: TEXTO_PROXIMAMENTE,
        fullDesc:
          "Es una técnica de diseño de cejas pelo por pelo que permite lograr un resultado natural y definido. Se implanta pigmento de manera superficial en la piel para reconstruir, rellenar o mejorar la forma de las cejas según cada rostro.",
        sections: [
          section("Beneficios", [
            "Resultado semi permanente",
            "Se ven resultados desde la primera sesión",
            "Rellena espacios despoblados",
            "Corrige forma y simetría",
            "Aporta volumen y definición",
            "Resalta la mirada",
          ]),
          section(
            "Procedimiento",
            [
              "Perfilado: se retira el exceso de vello manteniendo la forma natural",
              "Diseño: se define la forma ideal según tu rostro con medición profesional",
              "Elección del pigmento: se selecciona el tono adecuado a tu piel y cabello",
              "Relleno: se realiza la técnica pelo por pelo siguiendo el diseño acordado",
            ],
            `${BIOSEGURIDAD_CEJAS} El tratamiento se realiza en una primera sesión y un retoque dentro de los 60 días, con mantenimiento aproximado cada 8 a 12 meses.`,
          ),
        ],
        photos: photos("cejas", "microblading", ["1.jpeg", "2.jpeg", "3.jpeg"]),
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
        comingSoon: true,
        shortDesc: TEXTO_PROXIMAMENTE,
        fullDesc: TEXTO_PROXIMAMENTE,
        photos: photos("labios", "micropigmentacion-lips", ["IMG_20260626_034136.jpg.jpeg"]),
      },
      {
        slug: "baby-botox",
        name: "Baby Botox",
        group: "main",
        comingSoon: true,
        shortDesc: TEXTO_PROXIMAMENTE,
        fullDesc: TEXTO_PROXIMAMENTE,
        photos: photos("labios", "baby-botox", ["1.jpeg", "2.jpeg"]),
      },
    ],
  },
  {
    id: "cursos",
    label: "Cursos",
    services: [],
  },
]

export function isServiceComingSoon(service: ServiceItem): boolean {
  return service.comingSoon === true || service.fullDesc === TEXTO_PROXIMAMENTE
}
