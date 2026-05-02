"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#reservar", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#sobre-eli", label: "Eli & Mirarte" },
  { href: "#galeria", label: "Galería" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#promoter", label: "Promoter" },
  { href: "#faq", label: "Preguntas" },
  { href: "#ubicacion", label: "Ubicación" },
] as const

const mid = Math.ceil(navLinks.length / 2)
const navLinksLeft = navLinks.slice(0, mid)
const navLinksRight = navLinks.slice(mid)

const linkClassDesktop =
  "text-[13px] font-medium tracking-wide text-foreground/70 transition-colors hover:text-primary lg:text-sm"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const closeMenuOnDesktop = () => {
      if (mq.matches) setMobileMenuOpen(false)
    }
    mq.addEventListener("change", closeMenuOnDesktop)
    closeMenuOnDesktop()
    return () => mq.removeEventListener("change", closeMenuOnDesktop)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        mobileMenuOpen
          ? "bg-background border-border"
          : scrolled
            ? "bg-background/90 backdrop-blur-md border-border/50"
            : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Mobile: fila con menú + logo centrado */}
        <div className="relative flex h-20 items-center justify-between md:hidden">
          <div className="w-11 shrink-0" aria-hidden />
          <Link
            href="#reservar"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_1.png"
              alt="Mirarte Estética — Inicio"
              className="h-10 w-auto"
            />
          </Link>
          <button
            type="button"
            className="z-10 shrink-0 rounded-full p-2 text-foreground/70 transition-colors hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop: enlaces | logo | enlaces (simétrico) */}
        <div className="hidden md:grid md:h-20 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-6 lg:gap-x-10">
          <div className="flex min-w-0 items-center justify-end gap-x-6 lg:gap-x-9 xl:gap-x-10">
            {navLinksLeft.map((link) => (
              <Link key={link.href} href={link.href} className={linkClassDesktop}>
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="#reservar"
            className="flex shrink-0 items-center justify-center px-2"
            aria-label="Ir a inicio"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_1.png"
              alt="Mirarte Estética — Inicio"
              className="h-11 w-auto lg:h-12"
            />
          </Link>

          <div className="flex min-w-0 items-center justify-start gap-x-6 lg:gap-x-9 xl:gap-x-10">
            {navLinksRight.map((link) => (
              <Link key={link.href} href={link.href} className={linkClassDesktop}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-6 pt-2">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2.5 text-base font-medium text-foreground/70 transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
