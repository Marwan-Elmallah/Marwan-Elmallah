export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import PDFDocument from "pdfkit";
import { DATA } from "@/data/portfolio-data";

// Colors — light professional theme (ATS friendly)
const INK = "#1a1a1a";
const MUTED = "#555555";
const FAINT = "#888888";
const GOLD = "#8c6e2a";
const RULE = "#d9c98a";

const M = 46; // page margin
const W = 595.28 - M * 2; // A4 usable width

function header(doc: InstanceType<typeof PDFDocument>) {
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(24).text(DATA.name, M, 40, { width: W, align: "center" });
  doc.moveDown(0.15);
  doc.fillColor(GOLD).font("Helvetica-Bold").fontSize(10.5).text(DATA.title, M, doc.y, { width: W, align: "center" });
  doc.moveDown(0.35);
  const contact = `${DATA.location}  |  ${DATA.email}  |  ${DATA.phone}\n${DATA.linkedin}  |  ${DATA.portfolio}`;
  doc.fillColor(MUTED).font("Helvetica").fontSize(8.5).text(contact, M, doc.y, { width: W, align: "center", lineGap: 3 });
  doc.moveDown(0.5);
  doc.strokeColor(RULE).lineWidth(1.5).moveTo(M, doc.y).lineTo(M + W, doc.y).stroke();
}

function section(doc: InstanceType<typeof PDFDocument>, title: string) {
  doc.moveDown(0.9);
  if (doc.y > 740) doc.addPage();
  doc.fillColor(GOLD).font("Helvetica-Bold").fontSize(11).text(title.toUpperCase(), M, doc.y, { width: W });
  doc.moveDown(0.2);
  doc.strokeColor(RULE).lineWidth(0.75).moveTo(M, doc.y).lineTo(M + W, doc.y).stroke();
  doc.moveDown(0.45);
}

function body(doc: InstanceType<typeof PDFDocument>, text: string, opts: { size?: number; gap?: number } = {}) {
  doc.fillColor(INK).font("Helvetica").fontSize(opts.size ?? 9.2).text(text, M, doc.y, { width: W, lineGap: opts.gap ?? 3 });
}

function bullet(doc: InstanceType<typeof PDFDocument>, text: string) {
  if (doc.y > 755) doc.addPage();
  const y = doc.y;
  doc.fillColor(GOLD).font("Helvetica-Bold").fontSize(9.2).text("-", M, y, { width: 12 });
  doc.fillColor(INK).font("Helvetica").fontSize(9.2).text(text, M + 13, y, { width: W - 13, lineGap: 3 });
  doc.moveDown(0.35);
}

function jobHead(doc: InstanceType<typeof PDFDocument>, role: string, company: string, meta: string) {
  if (doc.y > 715) doc.addPage();
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(10).text(role, M, doc.y, { width: W });
  doc.fillColor(MUTED).font("Helvetica").fontSize(9).text(`${company} — ${meta}`, M, doc.y + 1, { width: W });
  doc.moveDown(0.4);
}

function twoCol(doc: InstanceType<typeof PDFDocument>, left: string, right: string) {
  if (doc.y > 755) doc.addPage();
  const y = doc.y;
  doc.fillColor(INK).font("Helvetica").fontSize(9.2).text(left, M, y, { width: W / 2 - 8 });
  const yAfterLeft = doc.y;
  doc.fillColor(INK).font("Helvetica").fontSize(9.2).text(right, M + W / 2 + 8, y, { width: W / 2 - 8 });
  doc.y = Math.max(yAfterLeft, doc.y) + 2;
}

export async function GET() {
  const doc = new PDFDocument({ size: "A4", margin: M, info: { Title: `${DATA.name} — CV`, Author: DATA.name } });
  const chunks: Buffer[] = [];
  doc.on("data", (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((resolve) => doc.on("end", () => resolve(Buffer.concat(chunks))));

  header(doc);

  // Summary
  section(doc, "Professional Summary");
  body(doc, DATA.about.join(" "));

  // Experience
  section(doc, "Professional Experience");
  for (const job of DATA.experience as { role: string; company: string; location: string; period: string; bullets: string[] }[]) {
    jobHead(doc, job.role, job.company, `${job.location} | ${job.period}`);
    for (const b of job.bullets.slice(0, 4)) bullet(doc, b);
    doc.moveDown(0.35);
  }

  // Skills
  section(doc, "Technical Skills");
  for (const g of DATA.skills as { category: string; items: string[] }[]) {
    if (doc.y > 745) doc.addPage();
    doc.fillColor(INK).font("Helvetica-Bold").fontSize(9.2).text(`${g.category}: `, M, doc.y, { continued: true, width: W });
    doc.fillColor(MUTED).font("Helvetica").fontSize(9.2).text(g.items.join("  |  "), { lineGap: 3 });
    doc.moveDown(0.35);
  }

  // Selected projects
  section(doc, "Selected Projects");
  for (const p of (DATA.projects as { title: string; description: string; tags: string[] }[]).slice(0, 6)) {
    if (doc.y > 730) doc.addPage();
    doc.fillColor(INK).font("Helvetica-Bold").fontSize(9.5).text(p.title, M, doc.y, { width: W });
    body(doc, p.description, { size: 9 });
    doc.fillColor(FAINT).font("Helvetica-Oblique").fontSize(8.3).text(p.tags.join("  |  "), M, doc.y + 1, { width: W });
    doc.moveDown(0.6);
  }

  // Achievements
  section(doc, "Key Achievements");
  const ach = DATA.achievements as { metric: string; detail: string }[];
  for (let i = 0; i < ach.length; i += 2) {
    twoCol(doc, `${ach[i].metric} — ${ach[i].detail}`, ach[i + 1] ? `${ach[i + 1].metric} — ${ach[i + 1].detail}` : "");
  }

  // Education
  section(doc, "Education & Certifications");
  bullet(doc, "B.Sc. Electronics & Communications Engineering — Alexandria Institute of Engineering & Technology (AIET), 2020");
  bullet(doc, "Vehicle Tracking System Accreditation — UAE General Regulatory Authority (GRA), Active");
  bullet(doc, "CCNA-Level Networking — Cisco curriculum");

  // Footer on last page
  doc.moveDown(0.8);
  doc.fillColor(FAINT).font("Helvetica").fontSize(7.5)
    .text(`Generated from ${DATA.portfolio} — references & project links available online.`, M, doc.y, { width: W, align: "center" });

  doc.end();
  const pdf = await done;
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Marwan_Elmallah_CV.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
