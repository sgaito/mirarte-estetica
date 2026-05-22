/**
 * Grilla liviana en Chrome Android: pocas tarjetas al inicio + "Cargar más".
 */

const LEGACY_KEY = "mirarte:progressive-service-grid"
const DEVICE_KEY = "mirarte:gpu-safe-grid-device"
const LEGACY_EXPANDED_KEY = "mirarte:services-grid-expanded"

/** Cuántas tarjetas montar antes de "Cargar más" (menos = más estable). */
export function getInitialVisibleCount(total: number): number {
  if (total <= 2) return total
  if (total <= 4) return 2
  return 3
}

export function detectMobileSafeGridFromUserAgent(ua: string): boolean {
  return /Android/i.test(ua) && /Chrome/i.test(ua) && !/Firefox|FxiOS/i.test(ua)
}

export function detectGpuSafeGridDevice(): boolean {
  if (typeof window === "undefined") return false
  if (!window.matchMedia("(max-width: 1023px)").matches) return false
  const ua = navigator.userAgent
  return detectMobileSafeGridFromUserAgent(ua)
}

function migrateLegacyStorage(): void {
  const legacy = sessionStorage.getItem(LEGACY_KEY)
  if (legacy === "1") sessionStorage.setItem(DEVICE_KEY, "1")
  sessionStorage.removeItem(LEGACY_KEY)
  sessionStorage.removeItem(LEGACY_EXPANDED_KEY)
}

export function isGpuSafeGridDevice(): boolean {
  if (typeof window === "undefined") return false
  migrateLegacyStorage()
  const stored = sessionStorage.getItem(DEVICE_KEY)
  if (stored === "1") return true
  const detected = detectGpuSafeGridDevice()
  if (detected) sessionStorage.setItem(DEVICE_KEY, "1")
  return detected
}

export function shouldLimitInitialServices(total: number, ssrMobileSafe = false): boolean {
  if (total <= 2) return false
  if (ssrMobileSafe) return true
  return isGpuSafeGridDevice()
}
