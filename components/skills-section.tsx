import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code, Database, Cloud, Network, Wrench, Users } from "lucide-react"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      color: "text-primary",
      bgColor: "bg-primary/10",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Python", level: 80 },
      ],
    },
    {
      title: "Frameworks & Technologies",
      icon: Wrench,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 88 },
        { name: "React.js", level: 85 },
        { name: "Next.js", level: 82 },
        { name: "Nest.js", level: 75 },
        { name: "Strapi", level: 80 },
      ],
    },
    {
      title: "Databases",
      icon: Database,
      color: "text-accent",
      bgColor: "bg-accent/10",
      skills: [
        { name: "MySQL", level: 88 },
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 },
      ],
    },
    {
      title: "Cloud Platforms",
      icon: Cloud,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      skills: [
        { name: "Render", level: 85 },
        { name: "cPanel", level: 90 },
        { name: "Hostinger", level: 88 },
        { name: "AWS (EC2, S3, IAM)", level: 75 },
        { name: "Digital Ocean", level: 70 }
      ],
    },
    {
      title: "Networking",
      icon: Network,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
      skills: [
        { name: "Network Troubleshooting", level: 92 },
        { name: "Network Devices Configuration", level: 90 },
        { name: "Router Configuration", level: 88 },
        { name: "Fiber Optics", level: 85 },
        { name: "Static IPs", level: 90 },
      ],
    },
    {
      title: "Tools & Platforms",
      icon: Users,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      skills: [
        { name: "Git", level: 88 },
        { name: "Linux", level: 85 },
        { name: "Advanced Excel", level: 90 },
        { name: "Nifty", level: 85 },
        { name: "Trello", level: 88 },
      ],
    },
  ]

  const languages = [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Very Good" },
  ]

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Comprehensive expertise across modern technologies and development practices
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.title} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.bgColor}`}>
                      <IconComponent className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <span className="text-lg">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Languages */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4">
              {languages.map((lang) => (
                <div key={lang.name} className="text-center">
                  <Badge variant="outline" className="mb-2">
                    {lang.name}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{lang.level}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
