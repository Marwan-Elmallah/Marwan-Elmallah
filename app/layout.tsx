import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Marwan Elmallah - IT Professional & Backend Developer",
  description:
    "Professional portfolio of Marwan Mohamed Kamel Elmallah - IT Support Engineer, Backend Developer, and Cloud Technologies Specialist with 4+ years of experience.",
  generator: "v0.app",
  keywords:
    "IT Professional, Backend Developer, Cloud Technologies, AWS, Node.js, JavaScript, Python, Technical Support",
  authors: [{ name: "Marwan Mohamed Kamel Elmallah" }],
  openGraph: {
    title: "Marwan Elmallah - IT Professional & Backend Developer",
    description:
      "Professional portfolio showcasing IT expertise, backend development skills, and cloud technologies experience.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
