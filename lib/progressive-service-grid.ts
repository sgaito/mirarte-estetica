/**
 * Grilla liviana en Chrome Android móvil: menos tarjetas al inicio + "Cargar más".
 * No confundir "expandir lista" con "desactivar modo seguro" (bug anterior).
 */

const LEGACY_KEY = "mirarte:progressive-service-grid"
const DEVICE_KEY = "mirarte:gpu-safe-grid-device"
const LEGACY_EXPANDED_KEY = "mirarte:services-grid-expanded"

/** Mitad superior de la lista (mínimo 1 tarjeta visible). */
export function getInitialVisibleCount(total: number): number {
  if (total <= 1) return total
  return Math.ceil(total / 2)
}

export function detectGpuSafeGridDevice(): boolean {
  if (typeof window === "undefined") return false

  if (!window.matchMedia("(max-width: 1023px)").matches) return false

  const ua = navigator.userAgent
  if (!/Android/i.test(ua)) return false

  return /Chrome/i.test(ua) && !/Firefox|FxiOS/i.test(ua)
}

/** Limpia claves viejas que ocultaban "Cargar más" o desactivaban el modo seguro. */
function migrateLegacyStorage(): void {
  const legacy = sessionStorage.getItem(LEGACY_KEY)
  if (legacy === "1") sessionStorage.setItem(DEVICE_KEY, "1")
  sessionStorage.removeItem(LEGACY_KEY)
  sessionStorage.removeItem(LEGACY_EXPANDED_KEY)
}

/** Dispositivo que necesita grilla liviana (persiste en la pestaña). */
export function isGpuSafeGridDevice(): boolean {
  if (typeof window === "undefined") return false

  migrateLegacyStorage()

  const stored = sessionStorage.getItem(DEVICE_KEY)
  if (stored === "1") return true

  const detected = detectGpuSafeGridDevice()
  if (detected) sessionStorage.setItem(DEVICE_KEY, "1")
  return detected
}


