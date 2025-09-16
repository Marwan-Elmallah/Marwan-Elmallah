// app/page.tsx
import { HeroSection } from "@/components/hero-section"
import { StatisticsSection } from "@/components/statistics-section"

export default function HomePage() {
  return (
    <>
      <div className="sr-only">
        <h1>Marwan Elmallah - Expert Fullstack JavaScript Developer and Backend Engineer</h1>
        <p>
          Professional fullstack developer specializing in JavaScript, Node.js, React, backend development, and
          technical support. Marwan Elmallah offers comprehensive IT solutions and fullstack development services.
        </p>
      </div>
      <div className="pt-20">
        <HeroSection />
        <StatisticsSection />
      </div>
    </>
  )
}