"use client"

import { useLayoutEffect, useState } from "react"
import { shouldLimitInitialServices } from "@/lib/progressive-service-grid"

export function useProgressiveServiceGrid(serviceCount: number) {
  const [expanded, setExpanded] = useState(false)
  const [needsLightGrid, setNeedsLightGrid] = useState(false)

  useLayoutEffect(() => {
    setNeedsLightGrid(!expanded && shouldLimitInitialServices(serviceCount))
  }, [expanded, serviceCount])

  return {
    needsLightGrid,
    expand: () => setExpanded(true),
  }
}
