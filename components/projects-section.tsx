"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Database, MessageSquare, FileText, Instagram, Truck, CheckSquare } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "Portfolio Builder API",
      description:
        "Backend system for full-stack portfolio website with single endpoint profile output and comprehensive Swagger documentation for easy API integration.",
      icon: FileText,
      technologies: ["Node.js", "Express.js", "Swagger", "RESTful API"],
      features: [
        "Single endpoint profile output",
        "Swagger documentation",
        "Scalable architecture",
        "Clean code principles",
      ],
      link: { github: "#", demo: "https://marwan-elmallah.github.io/Own_Portfolio/" },
    },
    {
      title: "Smart Restaurant Application",
      description:
        "Complete CRUD operations system for restaurant management including customers, admins, menus, orders, and subscription tiers with role-based access.",
      icon: Database,
      technologies: ["Node.js", "MySQL", "Express.js", "Authentication"],
      features: ["Customer management", "Admin dashboard", "Menu management", "Order processing", "Subscription tiers"],
      link: { github: "https://github.com/Marwan-Elmallah/Smart", demo: "#" },
    },
    {
      title: "Live Chat Application",
      description:
        "Real-time group and private chat system built with modern web technologies, featuring instant messaging and user presence indicators.",
      icon: MessageSquare,
      technologies: ["Node.js", "Express.js", "Socket.io", "Real-time"],
      features: ["Real-time messaging", "Group chat support", "Private messaging", "User presence", "Message history"],
      link: { github: "https://github.com/Marwan-Elmallah/Chat-Group-Back", demo: "https://marwan-elmallah.github.io/Chat-Group-Front/" },
    },
    {
      title: "Mini-Insta API",
      description:
        "Social media API with comprehensive user authentication, email confirmation system, and automated PDF invoice generation using MongoDB.",
      icon: Instagram,
      technologies: ["Node.js", "MongoDB", "Authentication", "PDF Generation"],
      features: [
        "User authentication",
        "Email confirmation",
        "PDF invoice generation",
        "Social media features",
        "MongoDB integration",
      ],
      link: { github: "#", demo: "#" },
    },
    {
      title: "Delivery System",
      description:
        "File-based database management system for comprehensive customer, product, and order data management with full CRUD operations.",
      icon: Truck,
      technologies: ["File-based DB", "CRUD Operations", "Data Management"],
      features: [
        "Customer management",
        "Product catalog",
        "Order tracking",
        "File-based storage",
        "Full CRUD operations",
      ],
      link: { github: "#", demo: "#" },
    },
    {
      title: "To-Do List Application",
      description:
        "Task management web application developed with modern frontend technologies, featuring intuitive user interface and task organization.",
      icon: CheckSquare,
      technologies: ["React.js", "HTML", "CSS", "Frontend"],
      features: [
        "Task creation",
        "Task organization",
        "Progress tracking",
        "Responsive design",
        "User-friendly interface",
      ],
      link: { github: "#", demo: "#" },
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Showcase of backend systems, APIs, and full-stack applications demonstrating technical expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const IconComponent = project.icon
            return (
              <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={project.link.github && project.link.github !== "#" ? () => window.open(project.link.github, "_blank") : undefined}
                      disabled={!project.link.github || project.link.github === "#"}
                      title={!project.link.github || project.link.github === "#" ? "Not available" : ""}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={project.link.demo && project.link.demo !== "#" ? () => window.open(project.link.demo, "_blank") : undefined}
                      disabled={!project.link.demo || project.link.demo === "#"}
                      title={!project.link.demo || project.link.demo === "#" ? "Not available" : ""}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
