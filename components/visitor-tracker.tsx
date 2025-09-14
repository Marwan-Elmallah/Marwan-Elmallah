"use client"

import { useEffect } from "react"

export default function VisitorTracker() {
  useEffect(() => {
    // Track page visit
    const trackVisit = async () => {
      try {
        await fetch("/api/analytics/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer,
          }),
        })
      } catch (error) {
        console.error("Failed to track visit:", error)
      }
    }

    // Track initial page load
    trackVisit()

    // Track page changes (for SPA navigation)
    const handleRouteChange = () => {
      trackVisit()
    }

    // Listen for browser navigation
    window.addEventListener("popstate", handleRouteChange)

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return null // This component doesn't render anything
}
