/**
 * Grilla de servicios con "Cargar más" solo en dispositivos donde el
 * compositor de Chrome en Android suele saturarse (móvil + Chromium + Android).
 * Desktop, iOS y Firefox móvil muestran todas las tarjetas de entrada.
 */

const STORAGE_KEY = "mirarte:progressive-service-grid"

/** Mitad superior de la lista (mínimo 1 tarjeta visible). */
export function getInitialVisibleCount(total: number): number {
  if (total <= 1) return total
  return Math.ceil(total / 2)
}

export function detectProgressiveServiceGrid(): boolean {
  if (typeof window === "undefined") return false

  if (!window.matchMedia("(max-width: 1023px)").matches) return false

  const ua = navigator.userAgent
  if (!/Android/i.test(ua)) return false

  // Chromium en Android (Chrome, Edge, Samsung Internet, etc.)
  return /Chrome/i.test(ua) && !/Firefox|FxiOS/i.test(ua)
}

export function readProgressiveGridPreference(): boolean | null {
  if (typeof window === "undefined") return null
  const v = sessionStorage.getItem(STORAGE_KEY)
  if (v === "1") return true
  if (v === "0") return false
  return null
}

export function saveProgressiveGridPreference(enabled: boolean): void {
  sessionStorage.setItem(STORAGE_KEY, enabled ? "1" : "0")
}

export function resolveProgressiveServiceGrid(): boolean {
  const pref = readProgressiveGridPreference()
  if (pref !== null) return pref
  return detectProgressiveServiceGrid()
}
