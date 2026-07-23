"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goTop = () => {
    const hero = document.getElementById("reservar")
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Volver al inicio"
      className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/90 text-primary shadow-md backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-lg active:scale-95 sm:bottom-6 sm:right-6 ${
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
    </button>
  )
}
