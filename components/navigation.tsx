"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "services", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 relative">
              <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                  <Image
                    src="/assets/marwan-profile.jpg"
                    alt="Marwan Elmallah"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Hover Tooltip */}
                {showTooltip && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg border text-sm whitespace-nowrap z-10">
                    <div className="text-center">
                      <div className="font-semibold">Marwan Elmallah</div>
                      <div className="text-xs text-muted-foreground">Egyptian • Single</div>
                      <div className="text-xs text-muted-foreground">Full Stack Developer</div>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover border-l border-t rotate-45"></div>
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection("home")}
                className="text-xl font-bold text-foreground hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm px-1 py-1 transition-colors"
              >
                Marwan Elmallah
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    activeSection === item.id
                      ? "text-primary-foreground bg-primary"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    activeSection === item.id
                      ? "text-primary-foreground bg-primary"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
