import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for contact messages
const contactMessages: Array<{
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  status: "new" | "read" | "replied"
}> = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create new contact message
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: "new" as const,
    }

    contactMessages.push(newMessage)

    return NextResponse.json({ message: "Message sent successfully", id: newMessage.id }, { status: 201 })
  } catch (error) {
    console.error("Contact submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let filteredMessages = contactMessages
    if (status) {
      filteredMessages = contactMessages.filter((msg) => msg.status === status)
    }

    // Sort by creation date (newest first)
    filteredMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      messages: filteredMessages,
      total: filteredMessages.length,
      stats: {
        new: contactMessages.filter((msg) => msg.status === "new").length,
        read: contactMessages.filter((msg) => msg.status === "read").length,
        replied: contactMessages.filter((msg) => msg.status === "replied").length,
      },
    })
  } catch (error) {
    console.error("Contact retrieval error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
