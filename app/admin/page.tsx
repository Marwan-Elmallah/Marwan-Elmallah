"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAnalytics } from "@/hooks/use-analytics"
import {
  Users,
  Eye,
  CheckCircle,
  Calendar,
  Star,
  PieChart as PieChartIcon,
  Globe,
} from "lucide-react"
import { getApiUrl } from "@/lib/config"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import CountryFlag from "react-country-flag"

// Types
interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

interface Feedback {
  id: string
  name: string
  email: string
  message: string
  rating: number
  createdAt: string
  approved: boolean
}


export default function AdminDashboard() {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [visitors, setVisitors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { data: analytics } = useAnalytics(7)
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d'>('7d')

  // Filter visitors based on selected time range
  const filteredVisitors = visitors.filter((v) => {
    const createdAt = new Date(v.createdAt)
    const now = new Date()
    switch (timeFilter) {
      case "24h":
        return now.getTime() - createdAt.getTime() <= 24 * 60 * 60 * 1000
      case "7d":
        return now.getTime() - createdAt.getTime() <= 7 * 24 * 60 * 60 * 1000
      case "30d":
        return now.getTime() - createdAt.getTime() <= 30 * 24 * 60 * 60 * 1000
      default:
        return true
    }
  })

  // Calculate today vs yesterday for trend
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()
  const todayCount = visitors.filter(
    (v) => new Date(v.createdAt).toDateString() === today
  ).length
  const yesterdayCount = visitors.filter(
    (v) => new Date(v.createdAt).toDateString() === yesterday
  ).length
  const trend =
    yesterdayCount > 0
      ? ((todayCount - yesterdayCount) / yesterdayCount) * 100
      : 0
  const isPositive = trend >= 0

  // Client Satisfaction
  const avgRating =
    feedback.length > 0
      ? (
          feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length
        ).toFixed(1)
      : "0.0"

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const contactRes = await fetch(getApiUrl("/contact"))
      const feedbackRes = await fetch(getApiUrl("/feedback"))
      const visitorRes = await fetch(getApiUrl("/visitor"))

      if (contactRes.ok) {
        const contactData = await contactRes.json()
        setContactMessages(contactData.data || [])
      }

      if (feedbackRes.ok) {
        const feedbackData = await feedbackRes.json()
        setFeedback(feedbackData.data?.data || [])
      }

      if (visitorRes.ok) {
        const visitorData = await visitorRes.json()
        setVisitors(visitorData.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading admin dashboard...</div>
        </div>
      </div>
    )
  }

  // ✅ Safely build deviceData — handle undefined deviceType
  const deviceData = Object.entries(
    filteredVisitors.reduce((acc, v) => {
      const type = v.deviceType || "unknown"
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({
      name: name || "unknown",
      value: typeof value === 'number' ? value : 0
    }))
    .filter(item => item.value > 0) // Optional: exclude zero entries

  // ✅ Safely compute totalDevices
  const totalDevices = deviceData.reduce((sum, d) => sum + (typeof d.value === 'number' ? d.value : 0), 0)

  // ✅ FIXED: Added type assertion + safe mapping
  const browserData = (Object.entries(
    filteredVisitors.reduce((acc, v) => {
      const browser = v.browser || "Unknown Browser"
      acc[browser] = (acc[browser] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ) as [string, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({
      name: name || "Unknown",
      value: typeof value === 'number' ? value : 0
    }))

  const countryData = (Object.entries(
    filteredVisitors.reduce((acc, v) => {
      const country = v.country || "Unknown"
      acc[country] = (acc[country] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ) as [string, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({
      name: name || "Unknown",
      value: typeof value === 'number' ? value : 0
    }))

  const osData = (Object.entries(
    filteredVisitors.reduce((acc, v) => {
      const os = v.os || "Unknown OS"
      acc[os] = (acc[os] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ) as [string, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({
      name: name || "Unknown",
      value: typeof value === 'number' ? value : 0
    }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Marwan Elmallah — Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Fullstack Developer & Backend Engineer — Manage Your Professional Portfolio
          </p>
        </div>

        {/* Key Metrics Grid — Matches Website */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Total Visitors */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{visitors.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Visitors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Visitors */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Eye className="h-8 w-8 text-amber-500" />
                <div>
                  <p className="text-2xl font-bold">{todayCount}</p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-muted-foreground">
                      Today's Visitors
                    </p>
                    <Badge
                      variant={isPositive ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {isPositive ? "+" : ""}
                      {trend.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects Completed */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-violet-500" />
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">
                    Projects Completed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Years Experience */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-emerald-500" />
                <div>
                  <p className="text-2xl font-bold">4+</p>
                  <p className="text-sm text-muted-foreground">
                    Years Experience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Satisfaction */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Star className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{avgRating}/5</p>
                  <p className="text-sm text-muted-foreground">
                    Client Satisfaction
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Contact Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactMessages.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      No messages yet.
                    </p>
                  ) : (
                    contactMessages.map((message) => (
                      <Card key={message.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{message.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {message.email}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {new Date(message.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <h5 className="font-medium mb-2">{message.subject}</h5>
                          <p className="text-sm text-muted-foreground">
                            {message.message}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      No feedback yet.
                    </p>
                  ) : (
                    feedback.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.email}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <span
                                    key={i}
                                    className={
                                      i < item.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }
                                  >
                                    ★
                                  </span>
                                ))}
                                <span className="text-sm text-muted-foreground ml-2">
                                  ({item.rating}/5)
                                </span>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {item.message}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Time Filter */}
            <div className="flex flex-wrap gap-2">
              {(["24h", "7d", "30d"] as const).map((period) => (
                <Button
                  key={period}
                  variant={timeFilter === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFilter(period)}
                >
                  Last {period}
                </Button>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Device Type Pie Chart */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Device Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => {
                          // ✅ SAFETY GUARD: ensure value is number
                          const safeValue = typeof value === 'number' ? value : 0
                          const percent = totalDevices > 0 ? (safeValue / totalDevices) * 100 : 0
                          return `${name} (${Math.round(percent)}%)`
                        }}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Browsers Bar Chart */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Top Browsers</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={browserData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Countries with Flags */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Top Countries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {countryData.map((item) => (
                      <div
                        key={item.name}
                        className="flex justify-between items-center p-2 hover:bg-muted rounded-md transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <CountryFlag
                            countryCode={item.name}
                            svg
                            className="w-6 h-4 rounded-sm"
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <Badge variant="secondary">{item.value}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Operating Systems */}
              <Card className="col-span-1 lg:col-span-2 xl:col-span-1">
                <CardHeader>
                  <CardTitle>Top Operating Systems</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {osData.map(({ name, value }) => (
                      <div
                        key={name}
                        className="flex justify-between items-center p-2 bg-muted rounded-md"
                      >
                        <span className="text-sm font-medium">{name}</span>
                        <Badge variant="outline">{value}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Referrers */}
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Top Referrers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {(Object.entries(
                      filteredVisitors.reduce((acc, v) => {
                        const ref = v.referrer?.trim() || "Direct / Unknown"
                        acc[ref] = (acc[ref] || 0) + 1
                        return acc
                      }, {} as Record<string, number>)
                    ) as [string, number][])
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 10)
                      .map(([referrer, count]) => (
                        <div
                          key={referrer}
                          className="flex justify-between items-center p-2 hover:bg-muted rounded-md"
                        >
                          <span className="text-sm font-mono text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
                            {referrer}
                          </span>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}