import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import VisitorTracker from "@/components/visitor-tracker"
import "./globals.css"

export const metadata: Metadata = {
  title: "Marwan Elmallah - Fullstack JavaScript Developer & IT Engineer",
  description:
    "Marwan Elmallah - Expert Fullstack JavaScript Developer, Backend Engineer, and Technical Support Specialist. 4+ years experience in Node.js, React, AWS, and cloud technologies. Professional IT solutions and fullstack development services.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: [
    "Marwan Elmallah",
    "fullstack developer",
    "backend developer",
    "JavaScript developer",
    "technical support",
    "fullstack JavaScript",
    "Node.js developer",
    "React developer",
    "IT professional",
    "cloud technologies",
    "AWS specialist",
    "MongoDB",
    "Express.js",
    "fullstack engineer",
    "backend engineer",
  ].join(", "),
  authors: [{ name: "Marwan Mohamed Kamel Elmallah" }],
  creator: "Marwan Elmallah",
  publisher: "Marwan Elmallah",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Marwan Elmallah - Fullstack JavaScript Developer & IT Engineer",
    description:
      "Expert Fullstack JavaScript Developer and Backend Engineer with 4+ years experience. Specializing in Node.js, React, technical support, and cloud technologies.",
    type: "website",
    locale: "en_US",
    url: "https://marwan-elmallah.vercel.app",
    siteName: "Marwan Elmallah Portfolio",
    images: [
      {
        url: "/assets/marwan-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Marwan Elmallah - Fullstack JavaScript Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marwan Elmallah - Fullstack JavaScript Developer & IT Engineer",
    description:
      "Expert Fullstack JavaScript Developer and Backend Engineer with 4+ years experience in Node.js, React, and technical support.",
    images: ["/assets/marwan-profile.jpg"],
  },
  alternates: {
    canonical: "https://marwan-elmallah.vercel.app",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Marwan Mohamed Kamel Elmallah",
              alternateName: "Marwan Elmallah",
              jobTitle: ["Fullstack JavaScript Developer", "Backend Developer", "Technical Support Specialist"],
              description:
                "Expert Fullstack JavaScript Developer and Backend Engineer with 4+ years experience in Node.js, React, technical support, and cloud technologies.",
              url: "https://marwan-elmallah.vercel.app",
              image: "/assets/marwan-profile.jpg",
              sameAs: ["https://linkedin.com/in/marwan-elmallah", "https://github.com/marwan-elmallah"],
              knowsAbout: [
                "Fullstack Development",
                "Backend Development",
                "JavaScript",
                "Node.js",
                "React.js",
                "Technical Support",
                "Cloud Technologies",
                "AWS",
                "MongoDB",
                "Express.js",
                "Python",
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Fullstack JavaScript Developer",
                occupationLocation: {
                  "@type": "Country",
                  name: "Egypt",
                },
                skills: "JavaScript, Node.js, React, Backend Development, Technical Support, Cloud Technologies",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <VisitorTracker />
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
