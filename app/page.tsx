import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import { FeedbackSection } from "@/components/feedback"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <>
      <div className="sr-only">
        <h1>Marwan Elmallah - Expert Fullstack JavaScript Developer and Backend Engineer</h1>
        <p>
          Professional fullstack developer specializing in JavaScript, Node.js, React, backend development, and
          technical support. Marwan Elmallah offers comprehensive IT solutions and fullstack development services.
        </p>
      </div>

      <main className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ServicesSection />
        <FeedbackSection />
        <ContactSection />
      </main>
    </>
  )
}
