"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Download, Mail, Phone, Linkedin, Github } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const downloadCV = () => {
    window.open(
      "https://drive.google.com/file/d/1cWyrHJ06mVTSY4UDf4vE6i-75S73-zcY/view?usp=sharing",
      "_blank",
      "noopener,noreferrer"
    )
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
            <Image
              src="/assets/marwan-profile.jpg"
              alt="Marwan Elmallah - Professional Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Available for Remote & On-site Work
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Marwan Mohamed Kamel <span className="text-primary">Elmallah</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto">
              IT Professional & Backend Developer with 4+ years of experience in Technical Support, Cloud Technologies,
              and Scalable Solutions
            </p>
          </div>

          {/* Key Skills */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {["JavaScript", "Python", "Node.js", "AWS", "MySQL", "MongoDB", "React.js", "Express.js"].map((skill) => (
              <Badge key={skill} variant="outline" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(+971) 588120178</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>eng.marwanelmallah@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              <span>linkedin.com/in/marwan-elmallah</span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span>github.com/marwan-elmallah</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={scrollToAbout} className="group">
              View My Work
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={downloadCV}>
              View/Download CV
              <Download className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
