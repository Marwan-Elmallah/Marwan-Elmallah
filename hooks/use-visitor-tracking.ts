"use client"

import { useEffect, useState } from "react"
import { getApiUrl } from "@/lib/config"

interface VisitorData {
  _id: string
  ip: string
  country: string
  region: string
  city: string
  lat: number
  lon: number
  timezone: string
  isp: string
  os: string
  browser: string
  deviceType: string
  url: string
  referrer: string
  createdAt: string
  updatedAt: string
}

interface VisitorStats {
  totalVisitors: number
  todayVisitors: number
  deviceTypes: Record<string, number>
  browsers: Record<string, number>
  countries: Record<string, number>
}

export function useVisitorTracking() {
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [loading, setLoading] = useState(true)

  // Log visitor on first load
  useEffect(() => {
    const logVisitor = async () => {
      try {
        const response = await fetch(getApiUrl("/visitor/log"), {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          // console.log("[v0] Visitor logged successfully")
        }
      } catch (error) {
        console.error("[v0] Failed to log visitor:", error)
      }
    }

    // Only log once per session
    const hasLogged = sessionStorage.getItem("visitor_logged")
    if (!hasLogged) {
      logVisitor()
      sessionStorage.setItem("visitor_logged", "true")
    }
  }, [])

  // Fetch visitor statistics
  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        setLoading(true)
        const response = await fetch(getApiUrl("/visitor"), {
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.error === false && data.data) {
            const visitors: VisitorData[] = data.data

            // Calculate statistics
            const today = new Date().toDateString()
            const todayVisitors = visitors.filter((v) => new Date(v.createdAt).toDateString() === today).length

            const deviceTypes: Record<string, number> = {}
            const browsers: Record<string, number> = {}
            const countries: Record<string, number> = {}

            visitors.forEach((visitor) => {
              // Count device types
              deviceTypes[visitor.deviceType] = (deviceTypes[visitor.deviceType] || 0) + 1

              // Count browsers
              browsers[visitor.browser] = (browsers[visitor.browser] || 0) + 1

              // Count countries
              const country = visitor.country === "Unknown" ? "Local" : visitor.country
              countries[country] = (countries[country] || 0) + 1
            })

            setStats({
              totalVisitors: visitors.length,
              todayVisitors,
              deviceTypes,
              browsers,
              countries,
            })
          }
        }
      } catch (error) {
        console.error("[v0] Failed to fetch visitor stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitorStats()
  }, [])

  return { stats, loading }
}
