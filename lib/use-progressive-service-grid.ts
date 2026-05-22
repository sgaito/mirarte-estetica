"use client"

import { useEffect, useState } from "react"
import { resolveProgressiveServiceGrid } from "@/lib/progressive-service-grid"

/** `enabled` solo es true tras montar en cliente (evita hydration mismatch). */
export function useProgressiveServiceGrid() {
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setEnabled(resolveProgressiveServiceGrid())
    setReady(true)
  }, [])

  return { enabled: ready && enabled, ready }
}
