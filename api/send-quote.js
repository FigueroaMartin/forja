import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== "POST") return res.status(405).end();

  const { name, contact, pieceLabel, materialLbl, budgetLbl, vision, engraving, cotNum, today } = req.body;

  // ── HTML DEL EMAIL ────────────────────────────────────────────────────────
  const row = (label, val, bg = "#0f0f0f", valCol = "#F0EDE8") => `
    <tr style="background:${bg}">
      <td style="padding:11px 16px;font-family:'Courier New',monospace;font-size:8px;color:#555;letter-spacing:2px;text-transform:uppercase;border-right:1px solid #1a1a1a;border-top:1px solid #1a1a1a;white-space:nowrap">${label}</td>
      <td style="padding:11px 16px;font-family:'Courier New',monospace;font-size:9px;color:${valCol};border-top:1px solid #1a1a1a">${val}</td>
    </tr>`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Cotización FORJA ${cotNum}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a">
<table width="100%" cellspacing="0" cellpadding="0" style="background:#0a0a0a">
<tr><td align="center" style="padding:32px 16px">
<table width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#0a0a0a;border:1px solid #1e1e1e">

  <!-- CABECERA -->
  <tr><td style="padding:40px;text-align:center;border-bottom:1px solid #1e1e1e">
    <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:36px;font-weight:400;color:#C9A84C;letter-spacing:14px">FORJA</p>
    <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:7px;letter-spacing:4px;color:#A8A9AD">JOYERÍA MASCULINA DE AUTOR</p>
    <p style="margin:0;font-family:'Courier New',monospace;font-size:6px;letter-spacing:3px;color:#444">PLATA 925 · ORO 18K · PIEZAS ÚNICAS</p>
  </td></tr>

  <!-- N° COTIZACIÓN -->
  <tr><td style="padding:28px 40px;text-align:center;border-bottom:1px solid #1e1e1e">
    <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:7px;letter-spacing:5px;color:#C9A84C;text-transform:uppercase">NUEVA COTIZACIÓN</p>
    <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#F0EDE8;letter-spacing:3px">${cotNum}</p>
    <p style="margin:0;font-family:'Courier New',monospace;font-size:7px;color:#333;letter-spacing:2px">${today}</p>
  </td></tr>

  <!-- DATOS CLIENTE -->
  <tr><td style="padding:24px 40px 0">
    <table width="100%" cellspacing="0" cellpadding="0" style="background:#111;border:1px solid #1e1e1e">
      <tr>
        <td style="padding:14px 16px;border-right:1px solid #1e1e1e">
          <p style="margin:0 0 5px;font-family:'Courier New',monospace;font-size:6px;letter-spacing:3px;color:#555;text-transform:uppercase">CLIENTE</p>
          <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;color:#F0EDE8">${name}</p>
        </td>
        <td style="padding:14px 16px;border-right:1px solid #1e1e1e">
          <p style="margin:0 0 5px;font-family:'Courier New',monospace;font-size:6px;letter-spacing:3px;color:#555;text-transform:uppercase">CONTACTO</p>
          <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;color:#F0EDE8">${contact}</p>
        </td>
        <td style="padding:14px 16px">
          <p style="margin:0 0 5px;font-family:'Courier New',monospace;font-size:6px;letter-spacing:3px;color:#555;text-transform:uppercase">FECHA</p>
          <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;color:#F0EDE8">${today}</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- DETALLE -->
  <tr><td style="padding:24px 40px 0">
    <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:7px;letter-spacing:3px;color:#555;text-transform:uppercase">DETALLE DE COTIZACIÓN</p>
    <table width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #1e1e1e">
      <tr style="background:#151515">
        <td style="padding:10px 16px;font-family:'Courier New',monospace;font-size:7px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;border-right:1px solid #1e1e1e">CAMPO</td>
        <td style="padding:10px 16px;font-family:'Courier New',monospace;font-size:7px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase">DETALLE</td>
      </tr>
      ${row("PIEZA",       pieceLabel,  "#0f0f0f")}
      ${row("MATERIAL",    materialLbl, "#111111")}
      ${row("PRESUPUESTO", budgetLbl,   "#0f0f0f", "#C9A84C")}
      ${engraving ? row("GRABADO", engraving, "#111111") : ""}
    </table>
  </td></tr>

  <!-- VISIÓN -->
  <tr><td style="padding:24px 40px 0">
    <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:7px;letter-spacing:3px;color:#555;text-transform:uppercase">VISIÓN DEL CLIENTE</p>
    <div style="background:#111;border:1px solid #1e1e1e;border-left:3px solid #C9A84C;padding:18px 20px">
      <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:#A8A9AD;line-height:1.85;font-style:italic">"${vision}"</p>
    </div>
  </td></tr>

  <!-- CONDICIONES -->
  <tr><td style="padding:20px 40px">
    <div style="background:#0d0d0d;border:1px solid #1e1e1e;border-left:2px solid #C9A84C;padding:14px 18px">
      <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:6px;letter-spacing:3px;color:#C9A84C;text-transform:uppercase">CONDICIONES</p>
      <p style="margin:0;font-family:'Courier New',monospace;font-size:7px;color:#444;line-height:2.1">
        — Cotización válida por 15 días. Pieza única forjada bajo pedido.<br>
        — Tiempo de entrega: 5–7 días hábiles. Anticipo del 50% para iniciar la forja.<br>
        — Incluye empaque premium (negro absoluto + foil dorado) y certificado de autoría.
      </p>
    </div>
  </td></tr>

  <!-- PIE -->
  <tr><td style="padding:24px 40px;text-align:center;border-top:1px solid #1e1e1e">
    <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:6px;letter-spacing:5px;color:#C9A84C;text-transform:uppercase">EL LUJO DE LA IDENTIDAD</p>
    <p style="margin:0;font-family:'Courier New',monospace;font-size:6px;color:#222;letter-spacing:2px">${cotNum} · ${today} · FORJA-COT-V1</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;

  // ── ENVÍO ─────────────────────────────────────────────────────────────────
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"FORJA Web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: contact.includes("@") ? contact : undefined,
      subject: `[${cotNum}] Cotización FORJA — ${pieceLabel} · ${name}`,
      html,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
