"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAnalytics } from "@/hooks/use-analytics"
import { Users, MessageSquare, Mail, Eye, CheckCircle, XCircle, Trash2 } from "lucide-react"
import { getApiUrl } from "@/lib/config"

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  status: "new" | "read" | "replied"
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
  const [visitors, setVisitors] = useState<any[]>([]) // Add this line
  const [loading, setLoading] = useState(true)
  const { data: analytics } = useAnalytics(7)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const contactRes = await fetch(getApiUrl("/contact"), { /* ... */ })
      const feedbackRes = await fetch(getApiUrl("/feedback"), { /* ... */ })
      const visitorRes = await fetch(getApiUrl("/visitor"), { /* ... */ })

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

  const approveFeedback = async (id: string, approved: boolean) => {
    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      })

      if (response.ok) {
        setFeedback((prev) => prev.map((item) => (item.id === id ? { ...item, approved } : item)))
      }
    } catch (error) {
      console.error("Failed to update feedback:", error)
    }
  }

  const deleteFeedback = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setFeedback((prev) => prev.filter((item) => item.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete feedback:", error)
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

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio website</p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{visitors?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Visitors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Eye className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{analytics?.pageViews || 0}</p>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Mail className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{contactMessages.length}</p>
                  <p className="text-sm text-muted-foreground">Contact Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <MessageSquare className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{feedback.length}</p>
                  <p className="text-sm text-muted-foreground">Feedback Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
            <TabsTrigger value="feedback">Feedback Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactMessages.map((message) => (
                    <Card key={message.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{message.name}</h4>
                            <p className="text-sm text-muted-foreground">{message.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={message.status === "new" ? "default" : "secondary"}>{message.status}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <h5 className="font-medium mb-2">{message.subject}</h5>
                        <p className="text-sm text-muted-foreground">{message.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* ...existing cards... */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-teal-500" />
                  <div>
                    <p className="text-2xl font-bold">{visitors.length}</p>
                    <p className="text-sm text-muted-foreground">Unique Visitors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.email}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={i < item.rating ? "text-yellow-400" : "text-gray-300"}>
                                  ★
                                </span>
                              ))}
                              <span className="text-sm text-muted-foreground ml-2">({item.rating}/5)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={item.approved ? "default" : "secondary"}>
                              {item.approved ? "Approved" : "Pending"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{item.message}</p>
                        <div className="flex gap-2">
                          {!item.approved && (
                            <Button
                              size="sm"
                              onClick={() => approveFeedback(item.id, true)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          )}
                          {item.approved && (
                            <Button size="sm" variant="outline" onClick={() => approveFeedback(item.id, false)}>
                              <XCircle className="w-4 h-4 mr-1" />
                              Unapprove
                            </Button>
                          )}
                          <Button size="sm" variant="destructive" onClick={() => deleteFeedback(item.id)}>
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ...existing cards... */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Visitor Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(
                      visitors.reduce((acc, v) => {
                        acc[v.country] = (acc[v.country] || 0) + 1
                        return acc
                      }, {} as Record<string, number>) as Record<string, number>
                    )
                      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([country, count]) => (
                        <div key={country} className="flex justify-between items-center">
                          <span className="text-sm">{country}</span>
                          <Badge variant="secondary">{String(count)} visitors</Badge>
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
