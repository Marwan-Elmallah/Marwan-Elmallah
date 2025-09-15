"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Code, Clock, Award } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"
import { getApiUrl } from "@/lib/config"

interface StatisticProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="text-3xl md:text-4xl font-bold text-primary">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

function StatisticCard({ icon, value, label, suffix }: StatisticProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">{icon}</div>
        </div>
        <AnimatedCounter value={value} suffix={suffix} />
        <p className="text-muted-foreground mt-2 font-medium">{label}</p>
      </CardContent>
    </Card>
  )
}

export function StatisticsSection() {
  const { data: analytics } = useAnalytics(30) // Get 30 days of data
  const [clientSatisfaction, setClientSatisfaction] = useState(98)

  useEffect(() => {
    const calculateClientSatisfaction = async () => {
      try {
        const response = await fetch(getApiUrl("/feedback?approved=true"), {
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.error === false && data.data && data.data.data) {
            const feedbacks = data.data.data
            if (feedbacks.length > 0) {
              const totalRating = feedbacks.reduce((sum: number, feedback: any) => sum + feedback.rating, 0)
              const maxPossibleRating = feedbacks.length * 5
              const satisfaction = Math.round((totalRating / maxPossibleRating) * 100)
              setClientSatisfaction(satisfaction)
            }
          }
        }
      } catch (error) {
        console.error("[v0] Failed to calculate client satisfaction:", error)
      }
    }

    calculateClientSatisfaction()
  }, [])

  return (
    <section id="statistics" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Numbers That <span className="text-primary">Matter</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some key metrics that showcase my experience and impact in the tech industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatisticCard
            icon={<Users className="w-8 h-8 text-primary" />}
            value={analytics?.totalVisitors || 1250}
            suffix="+"
            label="Site Visitors"
          />
          <StatisticCard
            icon={<Code className="w-8 h-8 text-primary" />}
            value={50}
            suffix="+"
            label="Projects Completed"
          />
          <StatisticCard
            icon={<Clock className="w-8 h-8 text-primary" />}
            value={new Date().getFullYear() - 2021}
            suffix="+"
            label="Years Experience"
          />
          <StatisticCard
            icon={<Award className="w-8 h-8 text-primary" />}
            value={clientSatisfaction}
            suffix="%"
            label="Client Satisfaction"
          />
        </div>
      </div>
    </section>
  )
}
