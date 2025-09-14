import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (replace with database in production)
const feedbackData: Array<{
  id: string
  name: string
  email: string
  message: string
  rating: number
  createdAt: string
  approved: boolean
}> = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, rating } = body

    // Validation
    if (!name || !email || !message || !rating) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create new feedback entry
    const newFeedback = {
      id: Date.now().toString(),
      name,
      email,
      message,
      rating: Number.parseInt(rating),
      createdAt: new Date().toISOString(),
      approved: false, // Requires manual approval
    }

    feedbackData.push(newFeedback)

    return NextResponse.json({ message: "Feedback submitted successfully", id: newFeedback.id }, { status: 201 })
  } catch (error) {
    console.error("Feedback submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const approved = searchParams.get("approved")

    // Filter approved feedback for public display
    let filteredFeedback = feedbackData
    if (approved === "true") {
      filteredFeedback = feedbackData.filter((item) => item.approved)
    }

    // Sort by creation date (newest first)
    filteredFeedback.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      feedback: filteredFeedback,
      total: filteredFeedback.length,
    })
  } catch (error) {
    console.error("Feedback retrieval error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
