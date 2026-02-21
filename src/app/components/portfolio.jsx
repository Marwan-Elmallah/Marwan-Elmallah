"use client";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";


// ─── MOTION (inline fallback if framer-motion not installed) ───────────────────
// This file assumes framer-motion is available. Install via:
// npm install framer-motion
// If not available, the components gracefully fall back.

let motion, AnimatePresence, useInView;
try {
  const fm = require("framer-motion");
  motion = fm.motion;
  AnimatePresence = fm.AnimatePresence;
  useInView = fm.useInView;
} catch {
  // Graceful fallback — create dummy motion proxy
  const Passthrough = ({ children, className, style, onClick, id, href }) =>
    children
      ? typeof children === "function"
        ? children()
        : React.cloneElement(children, { className, style, onClick, id })
      : null;
  motion = new Proxy(
    {},
    {
      get:
        (_, tag) =>
        ({ children, className, style, onClick, id, href, ...rest }) => {
          const Tag = tag;
          return (
            <Tag className={className} style={style} onClick={onClick} id={id} href={href}>
              {children}
            </Tag>
          );
        },
    }
  );
  AnimatePresence = ({ children }) => children;
  useInView = () => true;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Marwan Elmallah",
  tagline: "Technical Support Engineer & Backend Developer",
  about:
    "Engineer with 4+ years of experience bridging enterprise IT infrastructure and backend software development. I architect production-ready SaaS platforms for healthcare & fintech, while ensuring rock-solid systems reliability through Tier 2/3 support, network engineering, and automation. Bilingual (Arabic/English), client-focused, SLA-obsessed.",
  email: "eng.marwanelmallah@gmail.com",
  phone: "+971 588120178",
  location: "United Arab Emirates",
  linkedin: "https://www.linkedin.com/in/marwan-elmallah",
  github: "https://github.com/marwan-elmallah",
  portfolio: "#",
  whatsapp: "https://wa.me/971588120178",

  skills: [
    {
      category: "Backend Development",
      icon: "⚙️",
      items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "SSE","Socket.io", "MySQL","MongoDB" ,"Docker"],
    },
    {
      category: "IT Operations & Tools",
      icon: "🖥️",
      items: ["Windows/Linux Admin", "Active Directory", "SCCM", "JAMF", "IVANTI", "Git", "Agile"],
    },
    {
      category: "Networking & Infrastructure",
      icon: "🌐",
      items: ["CCNA-Level Networking", "Router & Switch Config", "Fiber Optics", "ONT Configuration", "Static IP"],
    },
    {
      category: "Cloud & DevOps",
      icon: "☁️",
      items: ["AWS EC2 & S3 & IAM", "Cloudflare WAF/SSL", "DigitalOcean", "Render", "cPanel"],
    },
    {
      category: "Security & Compliance",
      icon: "🔐",
      items: ["OWASP Top 10", "RBAC", "Audit Logging", "Zero-Downtime DNS", "WAF Rules"],
    },
    {
      category: "QA & Testing",
      icon: "✅",
      items: ["UAT Planning & Execution", "Test Case Docs", "Defect Tracking", "Nifty ITSM", "Functional Testing"],
    },
  ],

  experience: [
    {
      role: "Backend Engineer (Part Time)",
      company: "EVO Smart Control",
      location: "UAE",
      period: "Nov 2025 - Present",
      color: "#C9A84C",
      bullets: [
        "Sole backend engineer — designed Medical Management SaaS with RBAC (admin/reception/doctor), audit logging & real-time notifications from scratch.",
        "Engineered Finance Management SaaS: double-entry accounting, idempotent payment APIs, full employee lifecycle (salary, payslips, overtime).",
        "Delivered MVP with 15+ RESTful APIs in 2 weeks covering scheduling, billing, asset management & multi-role workflows.",
        "Owned end-to-end deployment: Cloudflare SSL/TLS + WAF (OWASP Top 10), zero-downtime DNS migration with custom tenant domains.",
      ],
    },
    {
      role: "Technical Support Engineer",
      company: "Bayanat Smart Systems",
      location: "Ras Al Khaimah, UAE",
      period: "Mar 2025 - Present",
      color: "#C9A84C",
      bullets: [
        "Resolved complex hardware, software, and network issues for enterprise clients — reduced system downtime by 30%.",
        "Integrated IoT devices (Teltonika GPS & ZKTeco biometrics) with customer backend profiles for real-time tracking.",
        "Developed custom Excel/VBA reporting tools — reduced manual reporting time by 40%.",
        "Tier 2/3 support for Windows/Linux, Active Directory, SCCM, JAMF — 98% SLA compliance across 100+ users.",
        "Led UAT for new feature releases — 100% client sign-off prior to production.",
      ],
    },
    {
      role: "Backend Engineer (Remote)",
      company: "Smart Serve",
      location: "Jordan",
      period: "Feb 2024 - Aug 2024",
      color: "#8DA9C4",
      bullets: [
        "Designed scalable backend architectures using Node.js and Express.js.",
        "Developed optimized MySQL schemas and secure RESTful APIs with auth & error handling.",
        "Deployed on AWS EC2 and DigitalOcean; followed clean code principles throughout.",
      ],
    },
    {
      role: "Technical Support Engineer",
      company: "Telecom Egypt",
      location: "Alexandria, Egypt",
      period: "Nov 2020 - Jan 2025",
      color: "#8DA9C4",
      bullets: [
        "Configured and deployed ONTs, static IPs, fiber-optic networks for 200+ installations.",
        "85% first-call resolution rate on advanced networking issues.",
        "Managed inventory with 99% accuracy; collaborated cross-functionally to cut ticket resolution time by 25%.",
      ],
    },
  ],

  projects: [
    {
      title: "Finance Management",
      description:
        "Multi-tenant REST API suite covering double-entry accounting, payroll processing, payslip generation, fixed asset lifecycle, and tax configuration.",
      tags: ["Node.js", "MySQL", "JWT", "Docker", "Cloudflare"],
      github: null,
      demo: "https://finance.evosmart.co",
    },
    {
      title: "Medical Center Management",
      description:
        "Comprehensive REST API for full patient lifecycle: registration, scheduling, medical history, billing. Real-time SSE notifications & RBAC (admin/staff/client).",
      tags: ["Node.js", "Express", "SSE", "RBAC", "Docker"],
      github: null,
      demo: "https://medical.evosmart.co",
    },
    {
      title: "Fatema Center",
      description:
        "Three-tier RBAC backend (admin/receptionist/doctor) with full patient lifecycle, session tracking, Multer image uploads, and comprehensive medical history schema.",
      tags: ["Node.js", "Express", "MySQL", "Heroku", "Multer"],
      github: null,
      demo: "https://fatema-center.com",
    },
    {
      title: "Sales Workflow Web App",
      description:
        "Custom web application built for sales team at Bayanat Smart Systems to monitor progress, manage leads, and automate reporting with Excel/VBA.",
      tags: ["Excel/VBA", "Automation", "Reporting"],
      github: "https://github.com/Marwan-Elmallah/Opportunity-Back",
      demo: null,
    },
    {
      title: "Portfolio Builder Web App",
      description:
        "This backend is designed to power a full-stack portfolio website — perfect for developers, designers, or freelancers!",
      tags: ["Node.js", "Express", "supabase", "JWT", "JOI"],
      github: "https://github.com/Marwan-Elmallah/Portfolio_Builder",
      demo: "https://marwan-elmallah.github.io/Own_Portfolio",
    },
    {
      title: "Chat Group Web App",
      description:
        "A full-stack chat application with real-time messaging, and group Chatting",
      tags: ["Node.js", "Express", "MongoDB", "Socket.io"],
      github: "https://github.com/Marwan-Elmallah/Chat-Group-Back",
      demo: "https://marwan-elmallah.github.io/Chat-Group-Front",
    },
  ],
};

// ─── THEME ────────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: "#0A1628",
    bgCard: "#0F1E35",
    bgCardHover: "#142340",
    border: "rgba(201,168,76,0.2)",
    borderHover: "rgba(201,168,76,0.6)",
    gold: "#C9A84C",
    goldLight: "#E8C76A",
    text: "#E8E8E8",
    textMuted: "#8DA9C4",
    textSubtle: "#5A7A9A",
    navBg: "rgba(10,22,40,0.95)",
    inputBg: "#0A1628",
    shadow: "0 8px 32px rgba(0,0,0,0.5)",
    timelineLine: "rgba(201,168,76,0.3)",
  },
  light: {
    bg: "#F5F0E8",
    bgCard: "#FFFFFF",
    bgCardHover: "#FDF8F0",
    border: "rgba(140,100,30,0.15)",
    borderHover: "rgba(140,100,30,0.4)",
    gold: "#8C641E",
    goldLight: "#B8892E",
    text: "#1A1A2E",
    textMuted: "#4A5568",
    textSubtle: "#718096",
    navBg: "rgba(245,240,232,0.95)",
    inputBg: "#FFFFFF",
    shadow: "0 8px 32px rgba(0,0,0,0.08)",
    timelineLine: "rgba(140,100,30,0.3)",
  },
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const IconExternal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

// ─── FADE IN SECTION ──────────────────────────────────────────────────────────
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  let inView = true;
  try {
    const fm = require("framer-motion");
    inView = fm.useInView(ref, { once: true, margin: "-80px" });
  } catch {}

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [menuOpen, setMenuOpen] = useState(false);

  const t = isDark ? THEMES.dark : THEMES.light;

  // Track active section on scroll
  useEffect(() => {
    const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // EmailJS send (configure your serviceId, templateId, publicKey)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    // ── CONFIGURE EMAILJS ──────────────────────────────────────────────────────
    // 1. npm install @emailjs/browser
    // 2. Replace the values below with your EmailJS credentials
    // 3. Uncomment the emailjs block below
    // ──────────────────────────────────────────────────────────────────────────
    
    try {
      await emailjs.send(
        "service_duyg6a8",
        "template_y5t6pe9",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "NgXBqz22eksGa97Ra"
      );
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // ─── STYLES ────────────────────────────────────────────────────────────────
  const s = {
    root: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      background: t.bg,
      color: t.text,
      minHeight: "100vh",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: t.navBg,
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${t.border}`,
      padding: "0 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
      transition: "background 0.3s ease",
    },
    navLogo: {
      fontSize: "1.2rem",
      fontWeight: 700,
      letterSpacing: "0.15em",
      color: t.gold,
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "'Playfair Display', Georgia, serif",
    },
    navLinks: {
      display: "flex",
      gap: "2rem",
      alignItems: "center",
    },
    navLink: (id) => ({
      fontSize: "0.8rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: activeSection === id ? t.gold : t.textMuted,
      cursor: "pointer",
      transition: "color 0.2s",
      fontFamily: "'Source Sans 3', sans-serif",
      fontWeight: 600,
      border: "none",
      background: "none",
      padding: "4px 0",
      borderBottom: activeSection === id ? `1px solid ${t.gold}` : "1px solid transparent",
    }),
    themeBtn: {
      background: "none",
      border: `1px solid ${t.border}`,
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: t.gold,
      transition: "border-color 0.2s, background 0.2s",
      marginLeft: "1.5rem",
    },
    section: {
      padding: "100px 0 80px",
      maxWidth: "1100px",
      margin: "0 auto",
      paddingLeft: "2rem",
      paddingRight: "2rem",
    },
    sectionLabel: {
      fontSize: "0.7rem",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: t.gold,
      fontFamily: "'Source Sans 3', sans-serif",
      fontWeight: 700,
      marginBottom: "0.5rem",
    },
    sectionTitle: {
      fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
      color: t.text,
      marginBottom: "1rem",
      lineHeight: 1.2,
    },
    divider: {
      width: "60px",
      height: "2px",
      background: `linear-gradient(90deg, ${t.gold}, transparent)`,
      marginBottom: "3rem",
    },
    card: {
      background: t.bgCard,
      border: `1px solid ${t.border}`,
      borderRadius: "2px",
      padding: "1.5rem 2rem",
      transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
      cursor: "default",
    },
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:wght@300;400;500&family=Source+Sans+3:wght@300;400;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .nav-link:hover { color: ${t.goldLight} !important; }
        .card-hover:hover {
          border-color: ${t.borderHover} !important;
          transform: translateY(-3px);
          box-shadow: ${t.shadow};
        }
        .tag {
          display: inline-block;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 1px;
          font-family: 'Source Sans 3', sans-serif;
          font-weight: 600;
        }
        .btn-gold {
          background: linear-gradient(135deg, ${t.gold}, ${t.goldLight});
          color: #0A1628;
          border: none;
          padding: 12px 32px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          border-radius: 1px;
          transition: opacity 0.2s, transform 0.2s;
        }
        .btn-gold:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-gold:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-outline {
          background: none;
          border: 1px solid ${t.gold};
          color: ${t.gold};
          padding: 10px 24px;
          font-family: 'Source Sans 3', sans-serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          border-radius: 1px;
          transition: background 0.2s, color 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-outline:hover { background: ${t.gold}22; }
        input, textarea {
          width: 100%;
          background: ${t.inputBg};
          border: 1px solid ${t.border};
          color: ${t.text};
          padding: 12px 16px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 0.9rem;
          border-radius: 1px;
          outline: none;
          transition: border-color 0.2s;
        }
        input:focus, textarea:focus { border-color: ${t.gold}; }
        textarea { resize: vertical; min-height: 140px; }
        label {
          display: block;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${t.textMuted};
          margin-bottom: 6px;
          font-weight: 600;
        }
        .timeline-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
          border: 2px solid ${t.gold};
          background: ${t.bg};
          position: absolute;
          left: -6px;
          top: 4px;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .hamburger span {
          width: 22px; height: 2px;
          background: ${t.gold};
          transition: transform 0.3s;
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu {
            position: fixed;
            top: 64px; left: 0; right: 0;
            background: ${t.navBg};
            border-bottom: 1px solid ${t.border};
            padding: 1.5rem 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            z-index: 99;
          }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .hero-cta { flex-direction: column !important; }
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.gold}66; border-radius: 3px; }
      `}</style>

      <div style={s.root}>
        {/* ── NAV ── */}
        <nav style={s.nav}>
          <div style={s.navLogo} onClick={() => scrollTo("hero")}>
            M.Elmallah
          </div>

          {/* Desktop */}
          <div className="nav-desktop" style={s.navLinks}>
            {navItems.map((item) => (
              <button
                key={item.id}
                className="nav-link"
                style={s.navLink(item.id)}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button style={s.themeBtn} onClick={() => setIsDark(!isDark)} title="Toggle theme">
              {isDark ? <IconSun /> : <IconMoon />}
            </button>
          </div>

          {/* Mobile */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button style={s.themeBtn} onClick={() => setIsDark(!isDark)}>
              {isDark ? <IconSun /> : <IconMoon />}
            </button>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "" }} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                style={{ ...s.navLink(item.id), fontSize: "1rem", letterSpacing: "0.1em" }}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* ── HERO ── */}
        <section
          id="hero"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            paddingTop: "64px",
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                radial-gradient(ellipse 80% 60% at 70% 50%, ${t.gold}08 0%, transparent 70%),
                linear-gradient(135deg, transparent 40%, ${t.gold}05 100%)
              `,
              pointerEvents: "none",
            }}
          />
          {/* Decorative grid lines */}
          <div
            style={{
              position: "absolute",
              right: "5%",
              top: "15%",
              width: "300px",
              height: "300px",
              backgroundImage: `
                repeating-linear-gradient(0deg, ${t.gold}10 0px, ${t.gold}10 1px, transparent 1px, transparent 40px),
                repeating-linear-gradient(90deg, ${t.gold}10 0px, ${t.gold}10 1px, transparent 1px, transparent 40px)
              `,
              opacity: 0.6,
            }}
          />

          <div style={{ ...s.section, paddingTop: "120px", paddingBottom: "80px", width: "100%" }}>
            <FadeInSection>
              <p style={{ ...s.sectionLabel, fontSize: "0.75rem" }}>Portfolio — 2025</p>
            </FadeInSection>
            <FadeInSection delay={0.1}>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Marwan
                <br />
                <span
                  style={{
                    WebkitTextStroke: `2px ${t.gold}`,
                    color: "transparent",
                  }}
                >
                  Elmallah
                </span>
              </h1>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.3rem)",
                  color: t.gold,
                  fontFamily: "'Source Sans 3', sans-serif",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                  fontWeight: 300,
                }}
              >
                Technical Support Engineer · Backend Developer
              </p>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <p
                style={{
                  maxWidth: "520px",
                  color: t.textMuted,
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 300,
                  marginBottom: "2.5rem",
                }}
              >
                {DATA.about}
              </p>
            </FadeInSection>
            <FadeInSection delay={0.4}>
              <div className="hero-cta" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn-gold" onClick={() => scrollTo("contact")}>
                  Get In Touch
                </button>
                <button className="btn-outline" onClick={() => scrollTo("projects")}>
                  View Projects
                </button>
                <a
                  href={DATA.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{ color: "#25D366", borderColor: "#25D366" }}
                >
                  <IconWhatsApp /> WhatsApp
                </a>
              </div>
            </FadeInSection>

            {/* Social links */}
            <FadeInSection delay={0.5}>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "3rem" }}>
                {[
                  { label: "LinkedIn", href: DATA.linkedin },
                  { label: "GitHub", href: DATA.github },
                  { label: "Email", href: `mailto:${DATA.email}` },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: t.textSubtle,
                      textDecoration: "none",
                      transition: "color 0.2s",
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) => (e.target.style.color = t.gold)}
                    onMouseLeave={(e) => (e.target.style.color = t.textSubtle)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ background: t.bgCard, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
          <div style={s.section}>
            <FadeInSection>
              <p style={s.sectionLabel}>Background</p>
              <h2 style={s.sectionTitle}>About Me</h2>
              <div style={s.divider} />
            </FadeInSection>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
              <FadeInSection>
                <p style={{ color: t.textMuted, lineHeight: 1.9, fontSize: "1.05rem", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 300 }}>
                  I'm an Electronics & Communications Engineering graduate who has grown into a dual-role professional — maintaining enterprise-grade IT infrastructure by day while architecting backend SaaS platforms across healthcare and fintech.
                </p>
                <p style={{ color: t.textMuted, lineHeight: 1.9, fontSize: "1.05rem", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 300, marginTop: "1rem" }}>
                  This cross-disciplinary perspective means I understand systems from the silicon up — from fiber-optic deployments and IoT integrations to designing secure, role-based REST APIs with Cloudflare WAF protection.
                </p>
              </FadeInSection>
              <FadeInSection delay={0.15}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { label: "Location", value: DATA.location },
                    { label: "Email", value: DATA.email },
                    { label: "Phone", value: DATA.phone },
                    { label: "Languages", value: "Arabic (Native) · English (Proficient)" },
                    { label: "Education", value: "B.Sc. Electronics & Communications — AIET (2020)" },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", gap: "1rem", borderBottom: `1px solid ${t.border}`, paddingBottom: "0.75rem" }}>
                      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: t.gold, fontWeight: 700, minWidth: "90px", paddingTop: "2px" }}>
                        {item.label}
                      </span>
                      <span style={{ color: t.textMuted, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.9rem" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </FadeInSection>
            </div>

            {/* Stats */}
            <FadeInSection delay={0.2}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", marginTop: "3rem", background: t.border }}>
                {[
                  { value: "4+", label: "Years Experience" },
                  { value: "100+", label: "Users Supported" },
                  { value: "98%", label: "SLA Compliance" },
                  { value: "15+", label: "APIs Built" },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: t.bg, padding: "1.5rem 2rem", textAlign: "center" }}>
                    <div style={{ fontSize: "2.2rem", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: t.gold }}>{stat.value}</div>
                    <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: t.textMuted, fontFamily: "'Source Sans 3', sans-serif", marginTop: "0.3rem" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills">
          <div style={s.section}>
            <FadeInSection>
              <p style={s.sectionLabel}>Expertise</p>
              <h2 style={s.sectionTitle}>Technical Skills</h2>
              <div style={s.divider} />
            </FadeInSection>
            <div
              className="skills-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}
            >
              {DATA.skills.map((skill, i) => (
                <FadeInSection key={skill.category} delay={i * 0.07}>
                  <div
                    className="card-hover"
                    style={{
                      ...s.card,
                      background: t.bgCard,
                      height: "100%",
                    }}
                  >
                    <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{skill.icon}</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: t.text, marginBottom: "1rem", fontWeight: 700 }}>
                      {skill.category}
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="tag"
                          style={{ background: `${t.gold}15`, color: t.gold, border: `1px solid ${t.gold}30` }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" style={{ background: t.bgCard, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
          <div style={s.section}>
            <FadeInSection>
              <p style={s.sectionLabel}>Career History</p>
              <h2 style={s.sectionTitle}>Experience</h2>
              <div style={s.divider} />
            </FadeInSection>

            {/* Timeline */}
            <div style={{ position: "relative", paddingLeft: "2rem" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "1px", background: t.timelineLine }} />

              {DATA.experience.map((exp, i) => (
                <FadeInSection key={i} delay={i * 0.1}>
                  <div style={{ position: "relative", marginBottom: "3rem" }}>
                    <div className="timeline-dot" />
                    <div
                      className="card-hover"
                      style={{ ...s.card, background: t.bg }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <div>
                          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: t.text }}>
                            {exp.role}
                          </h3>
                          <p style={{ color: t.gold, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.85rem", fontWeight: 600, marginTop: "2px" }}>
                            {exp.company} · {exp.location}
                          </p>
                        </div>
                        <span
                          className="tag"
                          style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30`, whiteSpace: "nowrap" }}
                        >
                          {exp.period}
                        </span>
                      </div>
                      <ul style={{ marginTop: "1rem", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {exp.bullets.map((b, j) => (
                          <li
                            key={j}
                            style={{ color: t.textMuted, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.9rem", lineHeight: 1.7 }}
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects">
          <div style={s.section}>
            <FadeInSection>
              <p style={s.sectionLabel}>Portfolio</p>
              <h2 style={s.sectionTitle}>Projects</h2>
              <div style={s.divider} />
            </FadeInSection>

            <div
              className="projects-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}
            >
              {DATA.projects.map((proj, i) => (
                <FadeInSection key={proj.title} delay={i * 0.08}>
                  <div
                    className="card-hover"
                    style={{
                      ...s.card,
                      background: t.bgCard,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: t.text, marginBottom: "0.75rem" }}>
                      {proj.title}
                    </h3>
                    <p style={{ color: t.textMuted, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.9rem", lineHeight: 1.7, flex: 1, marginBottom: "1.25rem" }}>
                      {proj.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.25rem" }}>
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="tag"
                          style={{ background: `${t.gold}10`, color: t.textMuted, border: `1px solid ${t.border}` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noreferrer" className="btn-outline">
                          <IconGithub /> Code
                        </a>
                      )}
                      {proj.demo && (
                        <a href={proj.demo} target="_blank" rel="noreferrer" className="btn-outline">
                          <IconExternal /> Demo
                        </a>
                      )}
                      {!proj.github && !proj.demo && (
                        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.75rem", color: t.textSubtle, letterSpacing: "0.1em", fontStyle: "italic" }}>
                          Private / Internal
                        </span>
                      )}
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ background: t.bgCard, borderTop: `1px solid ${t.border}` }}>
          <div style={s.section}>
            <FadeInSection>
              <p style={s.sectionLabel}>Get In Touch</p>
              <h2 style={s.sectionTitle}>Contact & Feedback</h2>
              <div style={s.divider} />
            </FadeInSection>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem" }}>
              {/* Left — info */}
              <FadeInSection>
                <p style={{ color: t.textMuted, fontFamily: "'Source Sans 3', sans-serif", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Have a project in mind, a technical challenge to solve, or just want to connect? I'm always open to new opportunities.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  {[
                    { label: "Email", value: DATA.email, href: `mailto:${DATA.email}` },
                    { label: "Phone", value: DATA.phone, href: `tel:${DATA.phone}` },
                    { label: "Location", value: DATA.location, href: null },
                  ].map((c) => (
                    <div key={c.label}>
                      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.gold, fontWeight: 700, marginBottom: "4px" }}>
                        {c.label}
                      </p>
                      {c.href ? (
                        <a href={c.href} style={{ color: t.text, fontFamily: "'Source Sans 3', sans-serif", textDecoration: "none", fontSize: "0.95rem" }}>
                          {c.value}
                        </a>
                      ) : (
                        <span style={{ color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.95rem" }}>{c.value}</span>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "2.5rem" }}>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.gold, fontWeight: 700, marginBottom: "1rem" }}>
                    Quick Connect
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a href={DATA.whatsapp} target="_blank" rel="noreferrer" className="btn-outline" style={{ color: "#25D366", borderColor: "#25D366" }}>
                      <IconWhatsApp /> WhatsApp
                    </a>
                    <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="btn-outline">
                      LinkedIn
                    </a>
                    <a href={DATA.github} target="_blank" rel="noreferrer" className="btn-outline">
                      <IconGithub /> GitHub
                    </a>
                  </div>
                </div>
              </FadeInSection>

              {/* Right — form */}
              <FadeInSection delay={0.15}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label>Subject</label>
                    <input
                      type="text"
                      placeholder="Project inquiry, feedback..."
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Message</label>
                    <textarea
                      placeholder="Tell me about your project or question..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {formStatus === "success" && (
                    <div style={{ background: `${t.gold}15`, border: `1px solid ${t.gold}40`, borderRadius: "1px", padding: "12px 16px", color: t.gold, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.85rem", letterSpacing: "0.05em" }}>
                      ✓ Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  {formStatus === "error" && (
                    <div style={{ background: "#e53e3e15", border: "1px solid #e53e3e40", borderRadius: "1px", padding: "12px 16px", color: "#e53e3e", fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.85rem" }}>
                      ✗ Something went wrong. Please try again or use WhatsApp.
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                    <button
                      className="btn-gold"
                      type="submit"
                      disabled={formStatus === "sending"}
                    >
                      {formStatus === "sending" ? "Sending..." : "Send Message"}
                    </button>
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.72rem", color: t.textSubtle, letterSpacing: "0.05em" }}>
                      Powered by EmailJS
                    </span>
                  </div>
                </form>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: `1px solid ${t.border}`, padding: "2rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", color: t.textSubtle, textTransform: "uppercase" }}>
            © 2025 Marwan Elmallah · Built with Next.js
          </p>
        </footer>
      </div>
    </>
  );
}
