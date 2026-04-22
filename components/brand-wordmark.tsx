// Color oscuro cálido extraído del logo — no negro puro
const LOGO_DARK = "#1C1714"

interface BrandWordmarkProps {
  scriptSize?: string
  labelSize?: string
}

export function BrandWordmark({
  scriptSize = "2.1rem",
  labelSize = "0.52rem",
}: BrandWordmarkProps) {
  return (
    <span className="inline-flex flex-col items-center leading-none select-none">
      {/* "Mirarte" — Great Vibes, fluida y caligráfica */}
      <span
        style={{
          fontFamily: "var(--font-script)",
          fontSize: scriptSize,
          color: LOGO_DARK,
          lineHeight: 1.1,
          letterSpacing: "0.01em",
        }}
      >
        Mirarte
      </span>

      {/* "ESTÉTICA" — Montserrat light, aireada, centrada bajo "Mirarte" */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: labelSize,
          color: LOGO_DARK,
          letterSpacing: "0.38em",
          fontWeight: 300,
          textTransform: "uppercase",
          marginRight: "-0.38em",   // compensa el espacio extra del tracking al final
          whiteSpace: "nowrap",
          width: "100%",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        Estética
      </span>
    </span>
  )
}
