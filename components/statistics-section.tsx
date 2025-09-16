"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Code, Award, Monitor, Globe, Clock } from "lucide-react"
import { useVisitorTracking } from "@/hooks/use-visitor-tracking"
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
  const { stats: visitorStats, loading } = useVisitorTracking()
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatisticCard
            icon={<Users className="w-8 h-8 text-primary" />}
            value={visitorStats?.totalVisitors || 0}
            suffix="+"
            label="Total Visitors"
          />
          <StatisticCard
            icon={<Globe className="w-8 h-8 text-primary" />}
            value={visitorStats?.todayVisitors || 0}
            suffix=""
            label="Today's Visitors"
          />
          <StatisticCard
            icon={<Code className="w-8 h-8 text-primary" />}
            value={50}
            suffix="+"
            label="Projects Completed"
          />
                    <StatisticCard
            icon={<Clock className="w-8 h-8 text-primary" />}
            value={
              (() => {
                const start = new Date(2020, 10, 8) // Month is 0-indexed: 10 = November
                const now = new Date()
                const months =
                  (now.getFullYear() - start.getFullYear()) * 12 +
                  (now.getMonth() - start.getMonth())
                const years = months / 12
                return parseInt(years.toFixed(1))
              })()
            }
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

        {visitorStats && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  Device Types
                </h3>
                <div className="space-y-2">
                  {Object.entries(visitorStats.deviceTypes).map(([device, count]) => (
                    <div key={device} className="flex justify-between">
                      <span className="capitalize">{device}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Browsers
                </h3>
                <div className="space-y-2">
                  {Object.entries(visitorStats.browsers)
                    .slice(0, 5)
                    .map(([browser, count]) => (
                      <div key={browser} className="flex justify-between">
                        <span className="capitalize">{browser}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Locations
                </h3>
                <div className="space-y-2">
                  {Object.entries(visitorStats.countries)
                    .slice(0, 5)
                    .map(([country, count]) => (
                      <div key={country} className="flex justify-between">
                        <span>{country}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
