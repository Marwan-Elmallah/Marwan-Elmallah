"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Cloud, Network, Headphones, Database, Settings, MapPin, Wifi, CheckCircle } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      title: "Fullstack Development",
      description: "End-to-end web solutions combining robust backend systems with dynamic, responsive frontends for seamless user experiences.",
      icon: Code,
      color: "text-primary",
      bgColor: "bg-primary/10",
      availability: ["Remote", "On-site", "Hybrid"],
      features: [
        "Full-Cycle Application Development",
        "RESTful API Development & Integration",
        "Database Design & Optimization",
        "Authentication & Security",
        "Performance Optimization",
        "Clean Code Architecture",
        "Deployment & DevOps Ready",
      ],
      technologies: [
        "Node.js", "Express.js", "Nest.js", 
        "Strapi", "MySQL", "Socket.io",
        "MongoDB", "PostgreSQL", "Firebase",
        "React.js", "Next.js", "Tailwind CSS", 
      ],
    },
    {
      title: "Technical Support",
      description: "Professional IT support services for system maintenance, troubleshooting, and user assistance.",
      icon: Headphones,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      availability: ["Remote", "On-site"],
      features: [
        "System Troubleshooting",
        "Software Installation",
        "User Training",
        "Issue Resolution",
        "Preventive Maintenance",
      ],
      technologies: ["Windows", "Linux", "SCCM", "JAMF", "AD", "IVANTI/ITSM"],
    },
    {
      title: "Network Support",
      description: "Comprehensive networking solutions including troubleshooting, configuration, and optimization.",
      icon: Network,
      color: "text-accent",
      bgColor: "bg-accent/10",
      availability: ["On-site", "Remote"],
      features: [
        "Network Troubleshooting",
        "Router Configuration",
        "Fiber Optic Setup",
        "Static IP Configuration",
        "Wireless Network Setup",
      ],
      technologies: ["Fiber Optics", "ONT", "Static IPs", "Routers", "Access Points"],
    },
    {
      title: "Cloud Solutions",
      description: "AWS cloud infrastructure setup, deployment, and management for scalable applications.",
      icon: Cloud,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      availability: ["Remote", "On-site"],
      features: [
        "AWS Infrastructure Setup",
        "Cloud Migration",
        "Auto-scaling Configuration",
        "Security Implementation",
        "Cost Optimization",
      ],
      technologies: ["AWS EC2", "AWS S3", "AWS IAM", "Render", "cPanel", "Hostinger"],
    },
    {
      title: "Database Management",
      description: "Database design, optimization, and maintenance for efficient data storage and retrieval.",
      icon: Database,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
      availability: ["Remote", "On-site"],
      features: [
        "Database Design",
        "Performance Tuning",
        "Data Migration",
        "Backup Solutions",
        "Security Implementation",
      ],
      technologies: ["MySQL", "MongoDB", "PostgreSQL", "Database Optimization"],
    },
    {
      title: "System Integration",
      description: "Integration of various systems and platforms for seamless business operations.",
      icon: Settings,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      availability: ["Remote", "On-site"],
      features: [
        "API Integration",
        "Third-party Services",
        "Workflow Automation",
        "System Synchronization",
        "Custom Solutions",
      ],
      technologies: ["RESTful APIs", "Webhooks", "Automation Tools", "Integration Platforms"],
    },
  ]

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Professional <span className="text-primary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Comprehensive IT solutions available both remotely and on-site to meet your business needs
          </p>
        </div>

        {/* Service Availability Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-primary" />
                <span className="font-medium">Remote Services Available</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                <span className="font-medium">On-site Support in UAE</span>
              </div>
            </div>
            <Button onClick={scrollToContact}>Get Quote</Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-lg ${service.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${service.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        {service.availability.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">What's Included</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-secondary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Let's discuss your project requirements and find the best solution for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={scrollToContact}>
                  Request Consultation
                </Button>
                <Button variant="outline" size="lg">
                  View Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
