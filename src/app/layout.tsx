import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://marwanelmallah.com";
const SITE_NAME = "Marwan Elmallah";
const SITE_TITLE =
  "Marwan Elmallah — Customer Delivery & IT Coordination Specialist | Backend Engineer in Dubai, UAE";
const SITE_DESCRIPTION =
  "Marwan Elmallah is a Customer Delivery & IT Coordination Specialist and Backend Engineer in Dubai, UAE with 4+ years across BIM/VDC SaaS, healthcare & fintech backends, enterprise IT support, IoT, Moodle/LMS, and networking.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Marwan Elmallah",
    "Customer Delivery Specialist Dubai",
    "IT Coordination Specialist UAE",
    "Backend Engineer Dubai",
    "Backend Engineer UAE",
    "Node.js developer UAE",
    "NestJS developer",
    "BIM VDC SaaS",
    "Healthcare SaaS backend",
    "Fintech backend developer",
    "Moodle developer",
    "Technical Support Engineer UAE",
    "IoT integration UAE",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
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
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marwan Elmallah",
  url: SITE_URL,
  email: "me@marwanelmallah.com",
  jobTitle: "Customer Delivery & IT Coordination Specialist",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  sameAs: [
    "https://www.linkedin.com/in/marwan-elmallah",
    "https://github.com/Marwan-Elmallah",
  ],
  knowsAbout: [
    "Customer Delivery",
    "IT Coordination",
    "Backend Engineering",
    "Node.js",
    "NestJS",
    "BIM/VDC SaaS",
    "Healthcare SaaS",
    "Fintech",
    "Moodle LMS",
    "IoT Integration",
    "Networking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
