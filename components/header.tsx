"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

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

  const navLinks = [
    { href: "#reservar", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#sobre-eli", label: "Eli & Mirarte" },
    { href: "#galeria", label: "Galería" },
    { href: "#resenas", label: "Reseñas" },
    { href: "#promoter", label: "Promoter" },
    { href: "#faq", label: "Preguntas" },
    { href: "#ubicacion", label: "Ubicación" },
  ]

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
        <div className="relative flex h-20 items-center justify-between">
          <Link
            href="/"
            className="z-10 flex items-center max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_1.png"
              alt="Mirarte Estética"
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#reservar"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-md hover:brightness-105 active:scale-95"
            >
              Reservar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="z-10 ml-auto md:hidden rounded-full p-2 text-foreground/70 transition-colors hover:text-primary"
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 pt-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-foreground/70 transition-colors hover:text-primary py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#reservar"
                className="mt-2 rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-md hover:brightness-105 active:scale-95"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reservar
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
