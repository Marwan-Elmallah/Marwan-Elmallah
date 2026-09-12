import { DATA } from "@/data/portfolio-data";

/* Dependency-free CV PDF writer (core Helvetica fonts only).
   Same content as before, driven by DATA — no native/bundler-sensitive deps. */

type Exp = { role: string; company: string; location: string; period: string; bullets: string[] };
type Skill = { category: string; items: string[] };
type Proj = { title: string; description: string; tags: string[] };
type Ach = { metric: string; detail: string };

const INK = "0.10 0.10 0.10";
const MUTED = "0.33 0.33 0.33";
const FAINT = "0.53 0.53 0.53";
const GOLD = "0.55 0.43 0.16";
const RULE = "0.85 0.79 0.54";

const M = 46;
const PW = 595.28;
const PH = 841.89;
const W = PW - M * 2;

const sanitise = (s: string) =>
  s
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/→/g, "->")
    .replace(/·/g, "|")
    .replace(/[^\x20-\x7E]/g, "");

function esc(s: string) {
  return sanitise(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

class Page {
  ops: string[] = [];
  text(x: number, y: number, size: number, font: string, color: string, s: string) {
    this.ops.push(`BT /${font} ${size} Tf ${color} rg ${x.toFixed(1)} ${y.toFixed(1)} Td (${esc(s)}) Tj ET`);
  }
  rule(x1: number, y: number, x2: number, w: number, color: string) {
    this.ops.push(`${color} RG ${w} w ${x1.toFixed(1)} ${y.toFixed(1)} m ${x2.toFixed(1)} ${y.toFixed(1)} l S`);
  }
}

function wrap(kind: "H" | "HB", size: number, text: string, maxW: number): string[] {
  const avg = size * (kind === "HB" ? 0.55 : 0.5);
  const words = sanitise(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const t = cur ? cur + " " + w : w;
    if (t.length * avg <= maxW || !cur) cur = t;
    else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}

export function buildCvPdf(): Buffer {
  const pages: Page[] = [new Page()];
  let y = PH - 60;
  const page = () => pages[pages.length - 1];
  const need = (h: number) => { if (y - h < 50) { pages.push(new Page()); y = PH - 60; } };
  const gap = (n: number) => { y -= n; };

  const para = (s: string, size: number, bold: boolean, color: string, lh: number, indent = 0) => {
    for (const line of wrap(bold ? "HB" : "H", size, s, W - indent)) {
      need(lh);
      page().text(M + indent, y - size, size, bold ? "F2" : "F1", color, line);
      y -= lh;
    }
  };
  const centered = (s: string, size: number, bold: boolean, color: string, lh: number) => {
    const avg = size * (bold ? 0.55 : 0.5);
    for (const line of wrap(bold ? "HB" : "H", size, s, W)) {
      need(lh);
      page().text(M + Math.max(0, (W - line.length * avg) / 2), y - size, size, bold ? "F2" : "F1", color, line);
      y -= lh;
    }
  };
  const head = (title: string) => {
    need(40); gap(10);
    para(title.toUpperCase(), 11, true, GOLD, 14);
    page().rule(M, y + 3, M + W, 0.75, RULE);
    gap(10);
  };

  centered(String(DATA.name), 23, true, INK, 28);
  centered(String(DATA.title), 10.5, true, GOLD, 15);
  gap(4);
  centered(`${DATA.location}  |  ${DATA.email}  |  ${DATA.phone}`, 8.5, false, MUTED, 12);
  centered(`${DATA.linkedin}  |  ${DATA.portfolio}`, 8.5, false, MUTED, 12);
  gap(6);
  page().rule(M, y, M + W, 1.5, RULE);
  gap(4);

  head("Professional Summary");
  para((DATA.about as string[]).join(" "), 9.2, false, INK, 13);

  head("Professional Experience");
  for (const job of DATA.experience as Exp[]) {
    need(40);
    para(job.role, 10, true, INK, 13);
    para(`${job.company} - ${job.location} | ${job.period}`, 9, false, MUTED, 12);
    gap(3);
    for (const b of job.bullets.slice(0, 4)) para(`-  ${b}`, 9.2, false, INK, 13, 6);
    gap(6);
  }

  head("Technical Skills");
  for (const g of DATA.skills as Skill[]) {
    need(28);
    para(`${g.category}: ${g.items.join("  |  ")}`, 9.2, false, INK, 13);
    gap(3);
  }

  head("Selected Projects");
  for (const p of (DATA.projects as Proj[]).slice(0, 6)) {
    need(52);
    para(p.title, 9.5, true, INK, 13);
    para(p.description, 9, false, INK, 12.5);
    para(p.tags.join("  |  "), 8.3, false, FAINT, 11.5);
    gap(6);
  }

  head("Key Achievements");
  for (const a of DATA.achievements as Ach[]) {
    need(16);
    para(`${a.metric} - ${a.detail}`, 9.2, false, INK, 13, 6);
    gap(1);
  }

  head("Education & Certifications");
  para("-  B.Sc. Electronics & Communications Engineering - Alexandria Institute of Engineering & Technology (AIET), 2020", 9.2, false, INK, 13);
  para("-  Vehicle Tracking System Accreditation - UAE General Regulatory Authority (GRA), Active", 9.2, false, INK, 13);
  para("-  CCNA-Level Networking - Cisco curriculum", 9.2, false, INK, 13);

  gap(10);
  centered(`Generated from ${DATA.portfolio} - references & project links available online.`, 7.5, false, FAINT, 11);

  // Assemble PDF (numbered objects, correct offsets)
  const bufs: Buffer[] = [];
  const offsets: number[] = [];
  const pdfHead = Buffer.from("%PDF-1.4\n", "latin1");
  const pushObj = (n: number, dict: string, stream?: Buffer) => {
    offsets[n] = pdfHead.length + bufs.reduce((a, b) => a + b.length, 0);
    bufs.push(Buffer.from(`${n} 0 obj${dict}`, "latin1"));
    if (stream) {
      bufs.push(stream);
      bufs.push(Buffer.from("endstream\nendobj\n", "latin1"));
    } else {
      bufs.push(Buffer.from("endobj\n", "latin1"));
    }
  };

  const contents: Buffer[] = pages.map((p) => Buffer.from(p.ops.join("\n") + "\n", "latin1"));
  const nPages = pages.length;
  const pageObj = (i: number) => 4 + i;
  const contentObj = (i: number) => 4 + nPages + i;
  const boldObj = 4 + nPages * 2;

  pushObj(1, "<</Type/Catalog/Pages 2 0 R>>\n");
  pushObj(2, `<</Type/Pages/Kids[${pages.map((_, i) => `${pageObj(i)} 0 R`).join(" ")}]/Count ${nPages}>>\n`);
  pushObj(3, "<</Type/Font/Subtype/Type1/BaseFont/Helvetica/Encoding/WinAnsiEncoding>>\n");
  pages.forEach((_, i) => {
    pushObj(pageObj(i), `<</Type/Page/Parent 2 0 R/MediaBox[0 0 ${PW} ${PH}]/Resources<</Font<</F1 3 0 R/F2 ${boldObj} 0 R>>>>/Contents ${contentObj(i)} 0 R>>\n`);
  });
  pages.forEach((_, i) => {
    pushObj(contentObj(i), `<</Length ${contents[i].length}>>stream\n`, contents[i]);
  });
  pushObj(boldObj, "<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold/Encoding/WinAnsiEncoding>>\n");

  const total = boldObj;
  let buf = Buffer.concat([pdfHead, ...bufs]);
  const xrefPos = buf.length;
  let xref = `xref\n0 ${total + 1}\n0000000000 65535 f \n`;
  for (let n = 1; n <= total; n++) xref += `${String(offsets[n] ?? 0).padStart(10, "0")} 00000 n \n`;
  buf = Buffer.concat([buf, Buffer.from(xref, "latin1"),
    Buffer.from(`trailer<</Size ${total + 1}/Root 1 0 R>>startxref\n${xrefPos}\n%%EOF`, "latin1")]);
  return buf;
}

