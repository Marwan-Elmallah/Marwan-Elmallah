export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const { buildCvPdf } = await import("@/lib/cv-pdf");
    const pdf = buildCvPdf();
    return new Response(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Marwan_Elmallah_CV.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    return Response.json({ error: "CV generation failed", detail: String(e) }, { status: 500 });
  }
}
