type SectionSeamProps = {
  edge: "top" | "bottom"
  /** Color CSS de la sección vecina (ej. `var(--background)`, `var(--secondary)`). */
  to: string
  /** soft = sutil; deep = más largo (tipo Hero → Servicios). */
  strength?: "soft" | "deep"
  className?: string
}

/**
 * Fundido sutil en el borde de una sección para suavizar el corte con la siguiente/anterior.
 */
export function SectionSeam({
  edge,
  to,
  strength = "soft",
  className = "",
}: SectionSeamProps) {
  const isBottom = edge === "bottom"
  const height =
    strength === "deep"
      ? "h-[min(22vh,9rem)] sm:h-[min(24vh,10rem)] md:h-[min(26vh,11rem)]"
      : "h-[3.75rem] sm:h-[4.75rem] md:h-[5.75rem]"

  const gradient = isBottom
    ? `linear-gradient(to bottom, transparent 0%, color-mix(in oklch, ${to} 22%, transparent) 45%, color-mix(in oklch, ${to} 55%, transparent) 72%, color-mix(in oklch, ${to} 88%, transparent) 90%, ${to} 100%)`
    : `linear-gradient(to top, transparent 0%, color-mix(in oklch, ${to} 22%, transparent) 45%, color-mix(in oklch, ${to} 55%, transparent) 72%, color-mix(in oklch, ${to} 88%, transparent) 90%, ${to} 100%)`

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-[1] ${height} ${isBottom ? "bottom-0" : "top-0"} ${className}`}
      style={{ backgroundImage: gradient }}
    />
  )
}
