import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Passionate IT professional dedicated to delivering scalable solutions and exceptional user experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Professional Summary */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Professional Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                IT professional with 4+ years of experience in Technical Support, Backend Development, and Cloud
                Technologies. Currently pursuing AWS Cloud Practitioner certification. Skilled in network
                troubleshooting, backend architecture, API development, and IT operations with a focus on scalable
                solutions and user satisfaction.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Core Competencies</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Full Stack Development",
                  "Backend Development",
                  "Cloud Technologies",
                  "API Development",
                  "Database Management",
                  "Network Troubleshooting",
                  "Technical Support",
                  "Customer Support",
                  "System Administration",
                ].map((competency) => (
                  <Badge key={competency} variant="secondary">
                    {competency}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Personal Info Cards */}
          <div className="grid gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Education</h4>
                    <p className="text-muted-foreground">B.Sc. Electronics & Communication Engineering</p>
                    <p className="text-sm text-muted-foreground">AIET • Graduated Aug 2020</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-muted-foreground">United Arab Emirates</p>
                    <p className="text-sm text-muted-foreground">Available for Remote & On-site Work</p>
                  </div>
                </div>
              </CardContent>
            </Card>
{/* 
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Certification</h4>
                    <p className="text-muted-foreground">AWS Cloud Practitioner</p>
                    <p className="text-sm text-muted-foreground">Currently Pursuing</p>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-chart-1/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-chart-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Experience</h4>
                    <p className="text-muted-foreground">4+ Years in IT</p>
                    <p className="text-sm text-muted-foreground">Technical Support & Backend Development</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
