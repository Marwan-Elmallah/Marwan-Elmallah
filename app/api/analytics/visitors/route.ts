import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for visitor analytics
const visitorData: Array<{
  id: string
  ip: string
  userAgent: string
  timestamp: string
  page: string
  referrer: string
  country?: string
  city?: string
}> = []

const dailyStats: Record<string, number> = {}
let totalVisitors = 0

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page, referrer } = body

    // Get visitor info from headers
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Create visitor entry
    const visitor = {
      id: Date.now().toString(),
      ip: ip.split(",")[0].trim(), // Handle multiple IPs
      userAgent,
      timestamp: new Date().toISOString(),
      page: page || "/",
      referrer: referrer || "direct",
    }

    visitorData.push(visitor)
    totalVisitors++

    // Update daily stats
    const today = new Date().toISOString().split("T")[0]
    dailyStats[today] = (dailyStats[today] || 0) + 1

    return NextResponse.json({
      message: "Visit tracked successfully",
      visitorId: visitor.id,
    })
  } catch (error) {
    console.error("Visitor tracking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "7" // days
    const periodDays = Number.parseInt(period)

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - periodDays)

    // Filter visitors by date range
    const filteredVisitors = visitorData.filter((visitor) => {
      const visitorDate = new Date(visitor.timestamp)
      return visitorDate >= startDate && visitorDate <= endDate
    })

    // Calculate stats
    const uniqueVisitors = new Set(filteredVisitors.map((v) => v.ip)).size
    const pageViews = filteredVisitors.length

    // Top pages
    const pageStats: Record<string, number> = {}
    filteredVisitors.forEach((visitor) => {
      pageStats[visitor.page] = (pageStats[visitor.page] || 0) + 1
    })

    const topPages = Object.entries(pageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([page, views]) => ({ page, views }))

    // Daily breakdown
    const dailyBreakdown: Record<string, number> = {}
    for (let i = 0; i < periodDays; i++) {
      const date = new Date()
      date.setDate(endDate.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]
      dailyBreakdown[dateStr] = dailyStats[dateStr] || 0
    }

    return NextResponse.json({
      totalVisitors,
      uniqueVisitors,
      pageViews,
      topPages,
      dailyBreakdown,
      period: periodDays,
    })
  } catch (error) {
    console.error("Analytics retrieval error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
