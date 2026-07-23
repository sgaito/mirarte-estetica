/** Logo “G” oficial de Google (colores de marca). */
export function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function StarFilled({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
    </svg>
  )
}

export function FiveStars({
  className = "",
  starClassName = "h-3.5 w-3.5",
}: {
  className?: string
  starClassName?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[#FBBC05] ${className}`}
      aria-label="5 estrellas"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <StarFilled key={i} className={starClassName} />
      ))}
    </span>
  )
}

type GoogleRatingProps = {
  className?: string
  /** Tamaño del logo G */
  logoClassName?: string
  /** Tamaño de cada estrella */
  starClassName?: string
}

/** Logo Google + 5 estrellas (rating visual). */
export function GoogleRating({
  className = "",
  logoClassName = "h-4 w-4",
  starClassName = "h-3.5 w-3.5",
}: GoogleRatingProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
      role="img"
      aria-label="5 estrellas en Google"
    >
      <GoogleGIcon className={logoClassName} />
      <FiveStars starClassName={starClassName} />
    </span>
  )
}
