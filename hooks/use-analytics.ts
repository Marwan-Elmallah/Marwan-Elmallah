"use client"

import { useState, useEffect } from "react"

interface AnalyticsData {
  totalVisitors: number
  uniqueVisitors: number
  pageViews: number
  topPages: Array<{ page: string; views: number }>
  dailyBreakdown: Record<string, number>
  period: number
}

export function useAnalytics(period = 7) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics/visitors?period=${period}`)

      if (!response.ok) {
        throw new Error("Failed to fetch analytics")
      }

      const analyticsData = await response.json()
      setData(analyticsData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  return { data, loading, error, refetch: () => fetchAnalytics() }
}
