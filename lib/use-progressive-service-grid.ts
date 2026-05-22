"use client"

import { useLayoutEffect, useState } from "react"
import { shouldLimitInitialServices } from "@/lib/progressive-service-grid"

export function useProgressiveServiceGrid(serviceCount: number, ssrMobileSafe: boolean) {
  const [expanded, setExpanded] = useState(false)
  const [needsLightGrid, setNeedsLightGrid] = useState(
    () => ssrMobileSafe && serviceCount > 2,
  )

  useLayoutEffect(() => {
    setNeedsLightGrid(!expanded && shouldLimitInitialServices(serviceCount, ssrMobileSafe))
  }, [expanded, serviceCount, ssrMobileSafe])

  return {
    needsLightGrid,
    expand: () => setExpanded(true),
  }
}
