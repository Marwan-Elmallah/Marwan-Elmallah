"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, User, Calendar, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getApiUrl } from "@/lib/config"

interface Feedback {
  _id: string // Updated to match backend API response structure
  name: string
  email: string
  rating: number
  message: string
  createdAt: string
  type: string // Updated to accept any string type from backend
  updatedAt?: string
  __v?: number
}

export function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
    type: "general" as "general" | "project" | "service",
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      console.log("[v0] Fetching feedback from:", getApiUrl("/feedback?approved=true"))
      const response = await fetch(getApiUrl("/feedback?approved=true"), {
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      console.log("[v0] Response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Feedback data received:", data)
        if (data.error === false && data.data && data.data.data) {
          setFeedbacks(data.data.data)
        } else {
          setFeedbacks([])
        }
      } else {
        console.error("[v0] Response not ok:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch feedback:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch(getApiUrl("/feedback"), {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Feedback submitted!",
          description: "Thank you for your feedback. It will be reviewed before being published.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          rating: 5,
          message: "",
          type: "general",
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to submit feedback")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "project":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "service":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <section id="feedback" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Client Feedback</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share your experience working with me or browse what others have said about my services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Leave Feedback
              </CardTitle>
              <CardDescription>Share your experience and help others learn about my work</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="type">Feedback Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full p-2 border border-input bg-background rounded-md"
                    disabled={submitting}
                  >
                    <option value="general">General</option>
                    <option value="project">Project Work</option>
                    <option value="service">IT Services</option>
                  </select>
                </div>

                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: i + 1 })}
                        className="p-1"
                        disabled={submitting}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            i < formData.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 hover:text-yellow-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your experience..."
                    rows={4}
                    required
                    disabled={submitting}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Feedback List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Recent Feedback</h3>
            {loading ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  <p className="text-muted-foreground">Loading feedback...</p>
                </CardContent>
              </Card>
            ) : feedbacks.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No feedback yet. Be the first to share your experience!
                </CardContent>
              </Card>
            ) : (
              feedbacks.map((feedback) => (
                <Card key={feedback._id}>
                  {" "}
                  {/* Updated to use _id from backend */}
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{feedback.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(feedback.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Badge className={getTypeColor(feedback.type)}>{feedback.type}</Badge>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(feedback.rating)}
                      <span className="text-sm text-muted-foreground ml-2">({feedback.rating}/5)</span>
                    </div>

                    <p className="text-muted-foreground">{feedback.message}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
