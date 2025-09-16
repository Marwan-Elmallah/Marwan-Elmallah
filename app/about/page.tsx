// app/about/page.tsx
import { AboutSection } from "@/components/about-section"

export default function AboutPage() {
  return (
    <>
      <div className="sr-only">
        <h1>About Marwan Elmallah</h1>
        <p>Learn more about Marwan Elmallah, his background, values, and professional journey.</p>
      </div>
      <div className="pt-20"> {/* Adjust spacing below fixed nav */}
        <AboutSection />
      </div>
    </>
  )
}