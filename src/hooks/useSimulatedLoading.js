import { useEffect, useState } from 'react'

const LOADING_DURATION_MS = 600

// Shared by every page, so the fake loading only happens once per visit
// and going back to a page doesn't flash skeletons again.
let hasLoadedOnce = false

// Pretends data is being fetched, so the skeleton loaders are visible in the demo.
// skip is for the landing page tour: no skeleton, and the real page still gets its first load.
export function useSimulatedLoading(skip = false) {
  const [isLoading, setIsLoading] = useState(!skip && !hasLoadedOnce)

  useEffect(() => {
    if (!isLoading) return
    const timeoutId = setTimeout(() => {
      hasLoadedOnce = true
      setIsLoading(false)
    }, LOADING_DURATION_MS)
    return () => clearTimeout(timeoutId)
  }, [isLoading])

  return isLoading
}
