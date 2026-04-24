/** Item serializable para el cliente (fotos vía `/api/drive-image`). */
export type PestanasExtensionCatalogItem = {
  slug: string
  name: string
  description: string
  photos: { src: string; alt: string; width: number; height: number }[]
}

/**
 * Catálogo estático de estilos de extensiones (Pestañas).
 * Las fotos se cargan desde Drive si existe DRIVE_PESTANAS_EXTENSIONES_FOLDER_ID
 * y subcarpetas cuyo nombre coincide con `folderMatch` (sin distinguir mayúsculas).
 */
export const PESTANAS_EXTENSION_DEFINITIONS = [
  {
    slug: "style-natural",
    folderMatch: "Style Natural",
    name: "Style Natural",
    description:
      "Efecto ultra natural: se respetan tus pestañas y se suma densidad sutil para un look de “desperté así”, ideal para primeras veces o trabajo de oficina.",
  },
  {
    slug: "clasicas",
    folderMatch: "Clásicas",
    name: "Clásicas (1:1)",
    description:
      "Una extensión por pestaña natural: línea limpia, curva definida y buen equilibrio entre presencia y naturalidad.",
  },
  {
    slug: "volumen-ruso",
    folderMatch: "Volumen ruso",
    name: "Volumen ruso (2D–4D)",
    description:
      "Abanicos ultraligeros que suman densidad sin peso: desde un 2D suave hasta 4D para miradas más dramáticas, siempre armónico con tu ojo.",
  },
  {
    slug: "hybrid-rimel",
    folderMatch: "Hybrid / Efecto rímel",
    name: "Hybrid / efecto rímel",
    description:
      "Mezcla de clásicas y volumen para un acabado tipo máscara de pestañas: definición, textura y curva visible sin perder elegancia.",
  },
] as const

export type PestanasExtensionSlug = (typeof PESTANAS_EXTENSION_DEFINITIONS)[number]["slug"]
