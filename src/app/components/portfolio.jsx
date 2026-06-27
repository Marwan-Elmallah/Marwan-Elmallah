"use client";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

let motion, AnimatePresence, useInView;
try {
  const fm = require("framer-motion");
  motion = fm.motion;
  AnimatePresence = fm.AnimatePresence;
  useInView = fm.useInView;
} catch {
  motion = new Proxy({}, { get: (_, tag) => ({ children, className, style, onClick, id, href }) => { const Tag = tag; return <Tag className={className} style={style} onClick={onClick} id={id} href={href}>{children}</Tag>; } });
  AnimatePresence = ({ children }) => children;
  useInView = () => true;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Marwan Elmallah",
  title: "Senior Technical Support Engineer & Backend Developer",
  tagline: "I build production-ready SaaS backends and keep enterprise systems running — from fiber-optic deployments to multi-tenant REST APIs.",
  about: [
    "Electronics & Communications Engineering graduate with 4+ years spanning two disciplines: enterprise IT infrastructure and backend SaaS development. I keep mission-critical systems reliable for 100+ users at Bayanat Smart Systems while architecting secure, multi-tenant platforms for healthcare and fintech at EVO Smart Control.",
    "My edge is system-level thinking. Understanding infrastructure from the silicon up — fiber-optic ONT deployments, IoT device integration, DNS migrations, Cloudflare WAF — makes me a sharper backend engineer and a faster incident responder than most."
  ],
  email: "eng.marwanelmallah@gmail.com",
  phone: "+971 588120178",
  location: "United Arab Emirates",
  linkedin: "https://www.linkedin.com/in/marwan-elmallah",
  github: "https://github.com/marwan-elmallah",
  portfolio: "https://marwanelmallah.vercel.app",
  whatsapp: "https://wa.me/971588120178",

  stats: [
    { value: "4+", label: "Years Experience" },
    { value: "100+", label: "Enterprise Users" },
    { value: "98%", label: "SLA Compliance" },
    { value: "30%", label: "Downtime Reduced" },
  ],

  skills: [
    {
      category: "Backend Development",
      icon: "⚙️",
      items: ["Node.js", "NestJS", "Express.js", "TypeScript", "REST APIs", "JWT Auth", "SSE", "Socket.io", "BullMQ", "Sequelize ORM"],
    },
    {
      category: "Databases & Caching",
      icon: "🗄️",
      items: ["MySQL", "MongoDB", "Redis", "Supabase", "Multi-tenant Schema Design", "N+1 Query Optimization"],
    },
    {
      category: "Cloud & DevOps",
      icon: "☁️",
      items: ["AWS EC2 · S3 · IAM", "Docker", "PM2", "Cloudflare WAF/SSL", "DigitalOcean", "Render", "cPanel", "n8n Automation"],
    },
    {
      category: "LMS & Moodle",
      icon: "🎓",
      items: ["Moodle Admin", "PHP Plugin Development", "Custom Theming", "REST API Integration", "SSO / OAuth", "Laragon · Herd"],
    },
    {
      category: "IT Operations & IoT",
      icon: "🖥️",
      items: ["Windows/Linux Admin", "Active Directory", "SCCM · JAMF · IVANTI", "Teltonika GPS", "ZKTeco Biometrics", "Excel/VBA Automation"],
    },
    {
      category: "Networking & Security",
      icon: "🌐",
      items: ["CCNA-Level Networking", "Fiber Optic · ONT Config", "Router/Switch Setup", "OWASP Top 10", "RBAC", "Audit Logging", "WAF Rules"],
    },
  ],

  experience: [
    {
      role: "Senior Technical Support Engineer",
      badge: "Promoted",
      company: "Bayanat Smart Systems",
      location: "Ras Al Khaimah, UAE",
      period: "May 2026 – Present",
      color: "#C9A84C",
      bullets: [
        "Promoted to Senior TSE with expanded oversight scope — managing enterprise infrastructure, IoT integrations, and UAT leadership across client deployments.",
        "Integrated Teltonika GPS trackers and ZKTeco biometric devices with customer backend profiles for real-time fleet tracking and access control.",
        "Built custom Excel/VBA automation tools that cut manual sales reporting time by 40%, directly improving team throughput.",
        "Tier 2/3 support for Windows/Linux, Active Directory, SCCM, JAMF — maintaining 98% SLA compliance across 100+ enterprise users.",
        "Led UAT cycles for new feature releases, coordinating between engineering and client stakeholders with 100% sign-off rate before production.",
      ],
    },
    {
      role: "Technical Support Engineer",
      company: "Bayanat Smart Systems",
      location: "Ras Al Khaimah, UAE",
      period: "Mar 2025 – May 2026",
      color: "#C9A84C",
      bullets: [
        "Resolved complex hardware, software, and network issues for enterprise clients, reducing system downtime by 30% through proactive root-cause analysis.",
        "Designed and deployed internal Sales Workflow Web App with access controls, lead tracking, and automated reporting for the sales team.",
        "Maintained 85% first-contact resolution rate on advanced networking and device configuration issues.",
      ],
    },
    {
      role: "Backend Engineer (Part-time)",
      company: "EVO Smart Control",
      location: "UAE",
      period: "Nov 2025 – Present",
      color: "#C9A84C",
      bullets: [
        "Sole backend engineer — designed Medical Management SaaS from scratch: three-tier RBAC (admin/reception/doctor), audit trail middleware, and real-time SSE notifications.",
        "Engineered Finance Management SaaS: double-entry accounting engine, idempotent payment APIs with full reconciliation, and complete employee lifecycle (salary, payslips, overtime, deductions).",
        "Delivered MVP with 15+ RESTful APIs in 2 weeks covering patient scheduling, billing, asset management, and multi-role workflows.",
        "Owned end-to-end deployment: AWS EC2, Docker containers, Cloudflare WAF (OWASP Top 10), zero-downtime DNS migration with custom tenant domains.",
        "Actively developing NestJS-based backend ('benaa') deployed on AWS EC2 via Docker with repeatable CI-friendly deploy workflow.",
      ],
    },
    {
      role: "Backend Engineer (Remote)",
      company: "Smart Serve",
      location: "Jordan",
      period: "Feb 2024 – Aug 2024",
      color: "#8DA9C4",
      bullets: [
        "Designed scalable REST API architectures using Node.js and Express.js with clean separation of concerns.",
        "Developed optimized MySQL schemas with Sequelize ORM and secure authentication with JWT and error middleware.",
        "Deployed production services on AWS EC2 and DigitalOcean, following clean code principles and documented API contracts.",
      ],
    },
    {
      role: "Technical Support Engineer",
      company: "Telecom Egypt",
      location: "Alexandria, Egypt",
      period: "Nov 2020 – Jan 2025",
      color: "#8DA9C4",
      bullets: [
        "Configured and deployed 200+ fiber-optic ONT installations with static IP provisioning nationwide.",
        "Achieved 85% first-call resolution on complex networking issues including router/switch config, static routing, and ISP-level troubleshooting.",
        "Managed parts inventory with 99% accuracy and collaborated cross-functionally to reduce average ticket resolution time by 25%.",
      ],
    },
  ],

  projects: [
    {
      title: "EvoSmart Medical SaaS",
      emoji: "💊",
      description: "Production REST API for full patient lifecycle: registration, scheduling, medical history, billing, and real-time SSE notifications. Three-tier RBAC with JWT enforcement and centralized audit logging.",
      tags: ["NestJS", "TypeScript", "MySQL", "Sequelize", "SSE", "RBAC", "Docker", "Cloudflare"],
      github: null,
      demo: "https://gomedical.evosmart.co",
      highlight: "Sole backend engineer · Production",
    },
    {
      title: "EvoSmart Finance SaaS",
      emoji: "💰",
      description: "Multi-tenant accounting engine with double-entry ledger, idempotent payment APIs, payroll processing, payslip generation, and fixed asset lifecycle management.",
      tags: ["Node.js", "Express", "MySQL", "JWT", "Docker", "Multi-tenant"],
      github: null,
      demo: "https://finance.evosmart.co",
      highlight: "15+ APIs in 2 weeks · MVP",
    },
    {
      title: "Moodle LMS Platform",
      emoji: "🎓",
      description: "Full-cycle Moodle administration and development: server deployment, custom PHP plugins extending core LMS functionality, Boost-based theme development, and REST API / SSO integration for seamless auth.",
      tags: ["Moodle", "PHP", "SSO", "REST API", "Boost Theme", "Laragon"],
      github: null,
      demo: null,
      highlight: "Plugin dev · Theming · SSO",
    },
    {
      title: "Fatema Center",
      emoji: "🏥",
      description: "Clinical management backend with three-tier RBAC, 15+ condition flags in the medical history schema, session lifecycle management (scheduled → in-progress → completed), and Multer-based document uploads.",
      tags: ["Node.js", "Express", "MySQL", "Multer", "Heroku", "RBAC"],
      github: null,
      demo: "https://fatema-center.com",
      highlight: "Full patient lifecycle",
    },
    {
      title: "n8n Telegram Bot",
      emoji: "🤖",
      description: "Bank transaction tracking bot that parses incoming SMS from Egyptian banks via Telegram, infers the source account, and pipes structured records into Supabase for querying and reporting.",
      tags: ["n8n", "Telegram", "Supabase", "SMS Parsing", "Automation"],
      github: null,
      demo: null,
      highlight: "Smart account inference",
    },
    {
      title: "Sales Workflow App",
      emoji: "📊",
      description: "Internal tool for Bayanat Smart Systems sales team: lead tracking, progress dashboards, and Excel/VBA-powered automated reporting that cut manual work by 40%.",
      tags: ["Node.js", "Express", "Excel/VBA", "Automation"],
      github: "https://github.com/Marwan-Elmallah/Opportunity-Back",
      demo: null,
      highlight: "40% less manual reporting",
    },
    {
      title: "Portfolio Builder",
      emoji: "🧩",
      description: "Backend for a full-stack developer portfolio platform with JWT auth, Joi validation, Supabase storage, and clean CRUD REST architecture.",
      tags: ["Node.js", "Express", "Supabase", "JWT", "Joi"],
      github: "https://github.com/Marwan-Elmallah/Portfolio_Builder",
      demo: "https://marwan-elmallah.github.io/Own_Portfolio",
      highlight: null,
    },
    {
      title: "Chat Group App",
      emoji: "💬",
      description: "Real-time full-stack chat application with Socket.io-powered bidirectional messaging, group room management, and MongoDB for flexible storage.",
      tags: ["Node.js", "Socket.io", "MongoDB", "Express"],
      github: "https://github.com/Marwan-Elmallah/Chat-Group-Back",
      demo: "https://marwan-elmallah.github.io/Chat-Group-Front",
      highlight: null,
    },
  ],

  achievements: [
    { icon: "🏅", metric: "Promoted May 2026", detail: "Senior TSE with expanded oversight at Bayanat" },
    { icon: "📉", metric: "30% less downtime", detail: "Proactive root-cause analysis at Bayanat" },
    { icon: "📊", metric: "40% faster reporting", detail: "Custom Excel/VBA automation tools" },
    { icon: "✅", metric: "98% SLA compliance", detail: "Tier 2/3 support for 100+ enterprise users" },
    { icon: "📡", metric: "85% first-call resolution", detail: "Advanced networking at Telecom Egypt" },
    { icon: "⚡", metric: "15+ APIs in 2 weeks", detail: "MVP delivery at EVO Smart Control" },
    { icon: "🌐", metric: "200+ installations", detail: "Fiber-optic ONT & static IP nationwide" },
    { icon: "🏛️", metric: "GRA Accredited", detail: "UAE Vehicle Tracking certification" },
  ],
};

// ─── THEME ────────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: "#080F1D",
    bgAlt: "#0C1526",
    bgCard: "#0F1E35",
    bgCardHover: "#142340",
    border: "rgba(201,168,76,0.18)",
    borderHover: "rgba(201,168,76,0.55)",
    gold: "#C9A84C",
    goldLight: "#E8C76A",
    goldDim: "rgba(201,168,76,0.12)",
    text: "#EDF0F4",
    textMuted: "#8DA9C4",
    textSubtle: "#4A6585",
    navBg: "rgba(8,15,29,0.96)",
    inputBg: "#080F1D",
    shadow: "0 12px 40px rgba(0,0,0,0.6)",
    timelineLine: "rgba(201,168,76,0.25)",
  },
  light: {
    bg: "#F7F3EC",
    bgAlt: "#FFFFFF",
    bgCard: "#FFFFFF",
    bgCardHover: "#FDF9F2",
    border: "rgba(140,100,30,0.13)",
    borderHover: "rgba(140,100,30,0.38)",
    gold: "#8C641E",
    goldLight: "#B8892E",
    goldDim: "rgba(140,100,30,0.08)",
    text: "#16213E",
    textMuted: "#4A5568",
    textSubtle: "#718096",
    navBg: "rgba(247,243,236,0.96)",
    inputBg: "#FFFFFF",
    shadow: "0 8px 32px rgba(0,0,0,0.07)",
    timelineLine: "rgba(140,100,30,0.25)",
  },
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
const IconSun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const IconMoon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconGithub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const IconExternal = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const IconWhatsApp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

// ─── FADE IN ──────────────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1, rootMargin: "-60px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s` }}>
      {children}
    </div>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = isDark ? THEMES.dark : THEMES.light;

  useEffect(() => {
    const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.25 });
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await emailjs.send("service_duyg6a8", "template_y5t6pe9", {
        from_name: formData.name, from_email: formData.email,
        subject: formData.subject, message: formData.message,
      }, "NgXBqz22eksGa97Ra");
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch { setFormStatus("error"); }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const s = {
    root: { fontFamily: "'Cormorant Garamond', Georgia, serif", background: t.bg, color: t.text, minHeight: "100vh", transition: "background 0.3s, color 0.3s" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: t.navBg, backdropFilter: "blur(14px)", borderBottom: `1px solid ${t.border}`, padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px", transition: "background 0.3s" },
    logo: { fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.18em", color: t.gold, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Playfair Display', serif" },
    navLink: (id) => ({ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: activeSection === id ? t.gold : t.textMuted, cursor: "pointer", transition: "color 0.2s", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, border: "none", background: "none", padding: "4px 0", borderBottom: activeSection === id ? `1px solid ${t.gold}` : "1px solid transparent" }),
    themeBtn: { background: "none", border: `1px solid ${t.border}`, borderRadius: "50%", width: "34px", height: "34px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: t.gold },
    section: { padding: "100px 0 80px", maxWidth: "1100px", margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem" },
    eyebrow: { fontSize: "0.68rem", letterSpacing: "0.32em", textTransform: "uppercase", color: t.gold, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, marginBottom: "0.4rem" },
    h2: { fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: t.text, marginBottom: "0.8rem", lineHeight: 1.15 },
    rule: { width: "52px", height: "2px", background: `linear-gradient(90deg, ${t.gold}, transparent)`, marginBottom: "2.8rem" },
    card: { background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "2px", padding: "1.5rem 2rem", transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:wght@300;400;500&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .card-hover:hover { border-color: ${t.borderHover} !important; transform: translateY(-3px); box-shadow: ${t.shadow}; }
        .nav-link:hover { color: ${t.goldLight} !important; }
        .tag { display: inline-block; font-size: 0.65rem; letter-spacing: 0.09em; text-transform: uppercase; padding: 3px 9px; border-radius: 1px; font-family: 'Source Sans 3', sans-serif; font-weight: 600; }
        .btn-gold { background: linear-gradient(135deg, ${t.gold}, ${t.goldLight}); color: #080F1D; border: none; padding: 11px 28px; font-family: 'Source Sans 3', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; cursor: pointer; border-radius: 1px; transition: opacity 0.2s, transform 0.2s; }
        .btn-gold:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-gold:disabled { opacity: 0.55; cursor: not-allowed; }
        .btn-outline { background: none; border: 1px solid ${t.gold}; color: ${t.gold}; padding: 9px 20px; font-family: 'Source Sans 3', sans-serif; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; cursor: pointer; border-radius: 1px; transition: background 0.2s; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; }
        .btn-outline:hover { background: ${t.gold}18; }
        input, textarea { width: 100%; background: ${t.inputBg}; border: 1px solid ${t.border}; color: ${t.text}; padding: 11px 14px; font-family: 'Source Sans 3', sans-serif; font-size: 0.88rem; border-radius: 1px; outline: none; transition: border-color 0.2s; }
        input:focus, textarea:focus { border-color: ${t.gold}; }
        textarea { resize: vertical; min-height: 130px; }
        label { display: block; font-family: 'Source Sans 3', sans-serif; font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: ${t.textMuted}; margin-bottom: 5px; font-weight: 600; }
        .timeline-dot { width: 11px; height: 11px; border-radius: 50%; border: 2px solid ${t.gold}; background: ${t.bg}; position: absolute; left: -5.5px; top: 6px; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .hamburger span { width: 20px; height: 2px; background: ${t.gold}; transition: transform 0.3s; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { position: fixed; top: 60px; left: 0; right: 0; background: ${t.navBg}; border-bottom: 1px solid ${t.border}; padding: 1.5rem 2rem; display: flex; flex-direction: column; gap: 1.1rem; z-index: 99; backdrop-filter: blur(14px); }
          .about-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .hero-cta { flex-direction: column !important; align-items: flex-start !important; }
          .form-name-email { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.gold}55; border-radius: 3px; }
      `}</style>

      <div style={s.root}>

        {/* ── NAV ── */}
        <nav style={s.nav}>
          <div style={s.logo} onClick={() => scrollTo("hero")}>M.Elmallah</div>
          <div className="nav-desktop" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {navItems.map((item) => (
              <button key={item.id} className="nav-link" style={s.navLink(item.id)} onClick={() => scrollTo(item.id)}>{item.label}</button>
            ))}
            <button style={s.themeBtn} onClick={() => setIsDark(!isDark)}>{isDark ? <IconSun /> : <IconMoon />}</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button style={s.themeBtn} onClick={() => setIsDark(!isDark)} className="hamburger-theme">{isDark ? <IconSun /> : <IconMoon />}</button>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "" }} />
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <button key={item.id} style={{ ...s.navLink(item.id), fontSize: "0.95rem" }} onClick={() => scrollTo(item.id)}>{item.label}</button>
            ))}
          </div>
        )}

        {/* ── HERO ── */}
        <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "60px" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 70% 60% at 65% 45%, ${t.gold}07 0%, transparent 65%), linear-gradient(160deg, transparent 50%, ${t.gold}04 100%)`, pointerEvents: "none" }} />
          {/* Decorative grid */}
          <div style={{ position: "absolute", right: "6%", top: "18%", width: "260px", height: "260px", backgroundImage: `repeating-linear-gradient(0deg, ${t.gold}0D 0px, ${t.gold}0D 1px, transparent 1px, transparent 36px), repeating-linear-gradient(90deg, ${t.gold}0D 0px, ${t.gold}0D 1px, transparent 1px, transparent 36px)`, opacity: 0.7, pointerEvents: "none" }} />
          {/* Accent line */}
          <div style={{ position: "absolute", left: 0, top: "30%", width: "3px", height: "200px", background: `linear-gradient(180deg, transparent, ${t.gold}, transparent)`, opacity: 0.5 }} />

          <div style={{ ...s.section, paddingTop: "130px", paddingBottom: "80px", width: "100%" }}>
            <FadeIn>
              <p style={{ ...s.eyebrow, fontSize: "0.72rem" }}>Portfolio · 2025 — UAE</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, lineHeight: 1.0, marginBottom: "1.2rem", letterSpacing: "-0.025em" }}>
                Marwan<br />
                <span style={{ WebkitTextStroke: `2px ${t.gold}`, color: "transparent" }}>Elmallah</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p style={{ fontSize: "clamp(0.82rem, 1.5vw, 1rem)", color: t.gold, fontFamily: "'Source Sans 3', sans-serif", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.6rem", fontWeight: 400 }}>
                Senior Technical Support Engineer · Backend Developer
              </p>
              <p style={{ fontSize: "clamp(0.72rem, 1.2vw, 0.82rem)", color: t.textSubtle, fontFamily: "'Source Sans 3', sans-serif", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1.8rem" }}>
                Healthcare SaaS · Fintech · Moodle LMS · IoT · Networking
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <p style={{ maxWidth: "500px", color: t.textMuted, fontSize: "1.05rem", lineHeight: 1.85, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 300, marginBottom: "2.5rem" }}>
                {DATA.tagline}
              </p>
            </FadeIn>
            <FadeIn delay={0.32}>
              <div className="hero-cta" style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", alignItems: "center" }}>
                <button className="btn-gold" onClick={() => scrollTo("contact")}>Get In Touch</button>
                <button className="btn-outline" onClick={() => scrollTo("projects")}>View Projects</button>
                <a href={DATA.whatsapp} target="_blank" rel="noreferrer" className="btn-outline" style={{ color: "#25D366", borderColor: "#25D366" }}>
                  <IconWhatsApp /> WhatsApp
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "3rem", flexWrap: "wrap" }}>
                {[{ label: "LinkedIn", href: DATA.linkedin }, { label: "GitHub", href: DATA.github }, { label: "Portfolio", href: DATA.portfolio }, { label: "Email", href: `mailto:${DATA.email}` }].map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                    style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.textSubtle, textDecoration: "none", transition: "color 0.2s", fontWeight: 600 }}
                    onMouseEnter={(e) => (e.target.style.color = t.gold)}
                    onMouseLeave={(e) => (e.target.style.color = t.textSubtle)}>{l.label}</a>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ background: t.bgAlt, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
          <div style={s.section}>
            <FadeIn>
              <p style={s.eyebrow}>Background</p>
              <h2 style={s.h2}>About Me</h2>
              <div style={s.rule} />
            </FadeIn>
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3.5rem", alignItems: "start" }}>
              <FadeIn>
                {DATA.about.map((para, i) => (
                  <p key={i} style={{ color: t.textMuted, lineHeight: 1.9, fontSize: "1rem", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 300, marginBottom: i < DATA.about.length - 1 ? "1.1rem" : 0 }}>{para}</p>
                ))}

                {/* Certification badge */}
                <div style={{ marginTop: "2rem", display: "inline-flex", alignItems: "center", gap: "0.75rem", background: t.goldDim, border: `1px solid ${t.border}`, borderRadius: "2px", padding: "0.75rem 1.2rem" }}>
                  <span style={{ fontSize: "1.2rem" }}>🏛️</span>
                  <div>
                    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: t.gold, fontWeight: 700 }}>GRA Accredited</p>
                    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.82rem", color: t.textMuted }}>UAE Vehicle Tracking · General Regulatory Authority</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.12}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {[
                    { label: "Location", value: DATA.location },
                    { label: "Email", value: DATA.email },
                    { label: "Phone", value: DATA.phone },
                    { label: "Languages", value: "Arabic (Native) · English (Proficient)" },
                    { label: "Education", value: "B.Sc. Electronics & Communications — AIET (2020)" },
                    { label: "Certification", value: "GRA Vehicle Tracking Accreditation · UAE" },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", gap: "1rem", borderBottom: `1px solid ${t.border}`, paddingBottom: "0.7rem" }}>
                      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: t.gold, fontWeight: 700, minWidth: "95px", paddingTop: "2px" }}>{item.label}</span>
                      <span style={{ color: t.textMuted, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Stats */}
            <FadeIn delay={0.18}>
              <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", marginTop: "3rem", background: t.border }}>
                {DATA.stats.map((stat) => (
                  <div key={stat.label} style={{ background: t.bg, padding: "1.4rem 1.5rem", textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: t.gold }}>{stat.value}</div>
                    <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: t.textMuted, fontFamily: "'Source Sans 3', sans-serif", marginTop: "0.25rem" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills">
          <div style={s.section}>
            <FadeIn>
              <p style={s.eyebrow}>Expertise</p>
              <h2 style={s.h2}>Technical Skills</h2>
              <div style={s.rule} />
            </FadeIn>
            <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {DATA.skills.map((skill, i) => (
                <FadeIn key={skill.category} delay={i * 0.07}>
                  <div className="card-hover" style={{ ...s.card, height: "100%" }}>
                    <div style={{ fontSize: "1.6rem", marginBottom: "0.6rem" }}>{skill.icon}</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: t.text, marginBottom: "0.9rem", fontWeight: 700 }}>{skill.category}</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                      {skill.items.map((item) => (
                        <span key={item} className="tag" style={{ background: `${t.gold}13`, color: t.gold, border: `1px solid ${t.gold}28` }}>{item}</span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" style={{ background: t.bgAlt, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
          <div style={s.section}>
            <FadeIn>
              <p style={s.eyebrow}>Career History</p>
              <h2 style={s.h2}>Experience</h2>
              <div style={s.rule} />
            </FadeIn>
            <div style={{ position: "relative", paddingLeft: "2rem" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "1px", background: t.timelineLine }} />
              {DATA.experience.map((exp, i) => (
                <FadeIn key={i} delay={i * 0.09}>
                  <div style={{ position: "relative", marginBottom: "2.5rem" }}>
                    <div className="timeline-dot" />
                    <div className="card-hover" style={{ ...s.card, background: t.bg }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.4rem" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: t.text }}>{exp.role}</h3>
                            {exp.badge && (
                              <span className="tag" style={{ background: `${t.gold}22`, color: t.gold, border: `1px solid ${t.gold}45`, fontSize: "0.6rem" }}>↑ {exp.badge}</span>
                            )}
                          </div>
                          <p style={{ color: t.gold, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.82rem", fontWeight: 600, marginTop: "2px" }}>{exp.company} · {exp.location}</p>
                        </div>
                        <span className="tag" style={{ background: `${exp.color}13`, color: exp.color, border: `1px solid ${exp.color}30`, whiteSpace: "nowrap" }}>{exp.period}</span>
                      </div>
                      <ul style={{ marginTop: "0.9rem", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                        {exp.bullets.map((b, j) => (
                          <li key={j} style={{ color: t.textMuted, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.88rem", lineHeight: 1.72 }}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Achievements strip */}
            <FadeIn delay={0.1}>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ ...s.eyebrow, marginBottom: "1.2rem" }}>Key Achievements</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1px", background: t.border }}>
                  {DATA.achievements.map((a) => (
                    <div key={a.metric} style={{ background: t.bg, padding: "1rem 1.2rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.1rem", marginTop: "1px" }}>{a.icon}</span>
                      <div>
                        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: t.gold }}>{a.metric}</p>
                        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.78rem", color: t.textMuted, marginTop: "1px" }}>{a.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects">
          <div style={s.section}>
            <FadeIn>
              <p style={s.eyebrow}>Portfolio</p>
              <h2 style={s.h2}>Projects</h2>
              <div style={s.rule} />
            </FadeIn>
            <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
              {DATA.projects.map((proj, i) => (
                <FadeIn key={proj.title} delay={i * 0.07}>
                  <div className="card-hover" style={{ ...s.card, display: "flex", flexDirection: "column", height: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: t.text }}>
                        <span style={{ marginRight: "0.4rem" }}>{proj.emoji}</span>{proj.title}
                      </h3>
                      {proj.highlight && (
                        <span className="tag" style={{ background: `${t.gold}13`, color: t.gold, border: `1px solid ${t.gold}28`, whiteSpace: "nowrap", fontSize: "0.6rem" }}>{proj.highlight}</span>
                      )}
                    </div>
                    <p style={{ color: t.textMuted, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.88rem", lineHeight: 1.72, flex: 1, marginBottom: "1.1rem" }}>{proj.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "1.1rem" }}>
                      {proj.tags.map((tag) => (
                        <span key={tag} className="tag" style={{ background: `${t.gold}0C`, color: t.textMuted, border: `1px solid ${t.border}` }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "0.65rem", marginTop: "auto" }}>
                      {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" className="btn-outline"><IconGithub /> Code</a>}
                      {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer" className="btn-outline"><IconExternal /> Demo</a>}
                      {!proj.github && !proj.demo && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.72rem", color: t.textSubtle, letterSpacing: "0.1em", fontStyle: "italic" }}>Private · Internal</span>}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ background: t.bgAlt, borderTop: `1px solid ${t.border}` }}>
          <div style={s.section}>
            <FadeIn>
              <p style={s.eyebrow}>Get In Touch</p>
              <h2 style={s.h2}>Contact</h2>
              <div style={s.rule} />
            </FadeIn>
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem" }}>
              <FadeIn>
                <p style={{ color: t.textMuted, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "2rem" }}>
                  Open to backend engineering roles, Moodle development, technical consulting, and SaaS collaboration. I respond within 24 hours.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "2rem" }}>
                  {[
                    { label: "Email", value: DATA.email, href: `mailto:${DATA.email}` },
                    { label: "Phone", value: DATA.phone, href: `tel:${DATA.phone}` },
                    { label: "Location", value: DATA.location, href: null },
                  ].map((c) => (
                    <div key={c.label}>
                      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.gold, fontWeight: 700, marginBottom: "3px" }}>{c.label}</p>
                      {c.href ? <a href={c.href} style={{ color: t.text, fontFamily: "'Source Sans 3', sans-serif", textDecoration: "none", fontSize: "0.92rem" }}>{c.value}</a>
                        : <span style={{ color: t.text, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.92rem" }}>{c.value}</span>}
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.gold, fontWeight: 700, marginBottom: "0.9rem" }}>Quick Connect</p>
                <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                  <a href={DATA.whatsapp} target="_blank" rel="noreferrer" className="btn-outline" style={{ color: "#25D366", borderColor: "#25D366" }}><IconWhatsApp /> WhatsApp</a>
                  <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="btn-outline">LinkedIn</a>
                  <a href={DATA.github} target="_blank" rel="noreferrer" className="btn-outline"><IconGithub /> GitHub</a>
                </div>
              </FadeIn>

              <FadeIn delay={0.12}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  <div className="form-name-email" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div><label>Name</label><input type="text" placeholder="Your name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
                    <div><label>Email</label><input type="email" placeholder="your@email.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
                  </div>
                  <div><label>Subject</label><input type="text" placeholder="Project inquiry, role opportunity..." required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} /></div>
                  <div><label>Message</label><textarea placeholder="Tell me about your project, role, or question..." required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} /></div>
                  {formStatus === "success" && <div style={{ background: `${t.gold}13`, border: `1px solid ${t.gold}38`, borderRadius: "1px", padding: "11px 14px", color: t.gold, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.82rem", letterSpacing: "0.05em" }}>✓ Message sent — I'll get back to you within 24 hours.</div>}
                  {formStatus === "error" && <div style={{ background: "#e53e3e13", border: "1px solid #e53e3e38", borderRadius: "1px", padding: "11px 14px", color: "#e53e3e", fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.82rem" }}>✗ Something went wrong. Try WhatsApp instead.</div>}
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                    <button className="btn-gold" type="submit" disabled={formStatus === "sending"}>{formStatus === "sending" ? "Sending..." : "Send Message"}</button>
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.68rem", color: t.textSubtle, letterSpacing: "0.05em" }}>Powered by EmailJS</span>
                  </div>
                </form>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: `1px solid ${t.border}`, padding: "1.8rem 2rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: t.textSubtle, textTransform: "uppercase" }}>
            © 2025 Marwan Elmallah · Senior Technical Support Engineer & Backend Developer · UAE
          </p>
        </footer>

      </div>
    </>
  );
}
