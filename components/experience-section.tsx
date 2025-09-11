import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Support Engineer",
      company: "Bayanat Smart Systems",
      type: "Full-time",
      location: "RAK, UAE",
      period: "March 2025 - Present",
      description:
        "Leading technical support and system optimization initiatives for smart tracking and access control systems.",
      achievements: [
        "Tested software functionality and user experience using Nifty project management tool",
        "Configured customer accounts and implemented access controls for system security",
        "Diagnosed and resolved system issues to minimize downtime and improve user experience",
        "Installed and configured Teltonika GPS tracking devices and ZKTeco biometric systems",
        "Built customized web application system for sales team progress monitoring",
        "Developed automated Excel reporting solutions for sales workflow tracking",
      ],
      technologies: ["Nifty", "Excel", "GPS Tracking", "Biometric Systems", "Web Applications"],
    },
    {
      title: "Outlet & Visits Technical Support Engineer",
      company: "Telecom Egypt",
      type: "Full-time",
      location: "Alexandria, Egypt",
      period: "Nov 2020 - Jan 2025",
      description:
        "Provided comprehensive technical support for networking infrastructure and customer connectivity solutions.",
      achievements: [
        "Resolved customer networking issues by troubleshooting modems, routers, and wireless repeaters",
        "Configured Optical Network Terminals (ONT), Static IP addresses, and fiber optic networks",
        "Managed inventory and generated daily reports for networking equipment and spare parts",
        "Provided on-site technical support for residential and business network configurations",
        "Maintained high customer satisfaction ratings through effective problem resolution",
      ],
      technologies: [
        "Fiber Optics",
        "ONT Configuration",
        "Network Troubleshooting",
        "Static IPs",
        "Router Configuration",
      ],
    },
    {
      title: "Backend Developer",
      company: "Smart Serve",
      type: "Remote",
      location: "Remote",
      period: "Feb 2024 - Aug 2024",
      description:
        "Designed and implemented scalable backend architectures for web applications with focus on performance and security.",
      achievements: [
        "Designed and implemented scalable backend architectures using Node.js and Express.js",
        "Developed and optimized MySQL database schemas for efficient data storage and retrieval",
        "Created secure RESTful APIs with authentication and comprehensive error handling",
        "Followed clean code principles and best practices for maintainable software development",
        "Deployed backend applications on cloud platforms including AWS EC2 and Render",
      ],
      technologies: ["Node.js", "Express.js", "MySQL", "RESTful APIs", "AWS EC2", "Render"],
    },
  ]

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            4+ years of hands-on experience in technical support, backend development, and system administration
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{exp.company}</span>
                        <Badge variant="outline" className="text-xs">
                          {exp.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
