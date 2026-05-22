"use client"

import { useEffect, useState } from "react"
import { isGpuSafeGridDevice } from "@/lib/progressive-service-grid"

export function useProgressiveServiceGrid() {
  const [device, setDevice] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setDevice(isGpuSafeGridDevice())
    setReady(true)
  }, [])

  const needsLightGrid = ready && device && !expanded

  return {
    ready,
    device: ready && device,
    needsLightGrid,
    expand: () => setExpanded(true),
  }
}
