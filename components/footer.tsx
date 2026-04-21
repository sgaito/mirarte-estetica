import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer id="contacto" className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="text-2xl font-light tracking-wide text-foreground">
              Mirarte <span className="font-semibold">ESTÉTICA</span>
            </span>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-muted-foreground">
              Tu espacio de belleza y bienestar. Donde cada visita es una
              experiencia única de relajación.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="#"
                className="rounded-full bg-secondary p-3 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-secondary p-3 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">Contacto</h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>hola@mirarteestetica.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Av. Santa Fe 1234, Palermo, Buenos Aires</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">Horarios</h3>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex justify-between">
                <span>Lunes - Viernes</span>
                <span>9:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sábados</span>
                <span>10:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingos</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mirarte Estética. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
