import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, contact, pieceLabel, materialLbl, budgetLbl, vision, engraving, cotNum, today } = req.body;

  // ── FILAS DE DETALLE ─────────────────────────────────────────────────────────
  const row = (label, val, bg = "#0f0f0f", valCol = "#F0EDE8") => `
    <tr style="background:${bg}">
      <td style="padding:14px 20px;font-family:'Courier New',monospace;font-size:9px;color:#555;letter-spacing:2px;text-transform:uppercase;border-right:1px solid #1a1a1a;border-top:1px solid #1a1a1a;white-space:nowrap;width:130px">${label}</td>
      <td style="padding:14px 20px;font-family:'Courier New',monospace;font-size:12px;color:${valCol};border-top:1px solid #1a1a1a">${val}</td>
    </tr>`;

  // ── HTML DEL EMAIL ────────────────────────────────────────────────────────────
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Cotización FORJA ${cotNum}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a">
<table width="100%" cellspacing="0" cellpadding="0" style="background:#0a0a0a">
<tr><td align="center" style="padding:32px 16px">

<table width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#0a0a0a;border:1px solid #2a2a2a">

  <!-- FRANJA DORADA SUPERIOR -->
  <tr>
    <td style="height:3px;background:#C9A84C;padding:0;font-size:0;line-height:0">&nbsp;</td>
  </tr>

  <!-- CABECERA: texto izq · logo der -->
  <tr>
    <td style="padding:0;border-bottom:1px solid #1e1e1e">
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <!-- Texto de marca -->
          <td style="padding:36px 36px 32px;vertical-align:middle">
            <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:48px;font-weight:400;color:#C9A84C;letter-spacing:18px;line-height:1">FORJA</p>
            <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:5px;color:#A8A9AD;text-transform:uppercase">JOYERÍA MASCULINA DE AUTOR</p>
            <p style="margin:0;font-family:'Courier New',monospace;font-size:8px;letter-spacing:3px;color:#444;text-transform:uppercase">PLATA 925 · ORO 18K · PIEZAS ÚNICAS</p>
          </td>
          <!-- Logo box top-right -->
          <td style="padding:28px 32px;vertical-align:middle;text-align:center;width:110px">
            <table cellspacing="0" cellpadding="0" align="center" style="border:1px solid #C9A84C;margin:0 auto">
              <tr>
                <td style="width:84px;height:84px;text-align:center;vertical-align:middle;background:#0d0d0d">
                  <p style="margin:0;font-family:'Courier New',monospace;font-size:34px;color:#C9A84C;line-height:1">&#9672;</p>
                  <p style="margin:7px 0 0;font-family:'Courier New',monospace;font-size:7px;letter-spacing:5px;color:#C9A84C;text-transform:uppercase">FORJA</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- N° COTIZACIÓN -->
  <tr>
    <td style="padding:28px 36px;text-align:center;border-bottom:1px solid #1e1e1e;background:#0d0d0d">
      <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:6px;color:#C9A84C;text-transform:uppercase">NUEVA COTIZACIÓN</p>
      <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:36px;font-weight:300;color:#F0EDE8;letter-spacing:4px;line-height:1">${cotNum}</p>
      <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;color:#444;letter-spacing:3px">${today}</p>
    </td>
  </tr>

  <!-- DATOS CLIENTE -->
  <tr>
    <td style="padding:24px 36px 0">
      <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#C9A84C;text-transform:uppercase">Datos de contacto</p>
      <table width="100%" cellspacing="0" cellpadding="0" style="background:#111;border:1px solid #1e1e1e">
        <tr>
          <td style="padding:16px 20px;border-right:1px solid #1e1e1e">
            <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:3px;color:#555;text-transform:uppercase">CLIENTE</p>
            <p style="margin:0;font-family:'Courier New',monospace;font-size:13px;color:#F0EDE8">${name}</p>
          </td>
          <td style="padding:16px 20px;border-right:1px solid #1e1e1e">
            <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:3px;color:#555;text-transform:uppercase">CONTACTO</p>
            <p style="margin:0;font-family:'Courier New',monospace;font-size:13px;color:#F0EDE8">${contact}</p>
          </td>
          <td style="padding:16px 20px">
            <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:3px;color:#555;text-transform:uppercase">FECHA</p>
            <p style="margin:0;font-family:'Courier New',monospace;font-size:13px;color:#F0EDE8">${today}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- DETALLE DE COTIZACIÓN -->
  <tr>
    <td style="padding:24px 36px 0">
      <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#C9A84C;text-transform:uppercase">Detalle de cotización</p>
      <table width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #1e1e1e">
        <tr style="background:#151515">
          <td style="padding:12px 20px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:3px;color:#C9A84C;text-transform:uppercase;border-right:1px solid #1e1e1e;width:130px">CAMPO</td>
          <td style="padding:12px 20px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:3px;color:#C9A84C;text-transform:uppercase">DETALLE</td>
        </tr>
        ${row("PIEZA",       pieceLabel,  "#0f0f0f")}
        ${row("MATERIAL",    materialLbl, "#111111")}
        ${row("PRESUPUESTO", budgetLbl,   "#0f0f0f", "#C9A84C")}
        ${engraving ? row("GRABADO", engraving, "#111111") : ""}
      </table>
    </td>
  </tr>

  <!-- VISIÓN DEL CLIENTE -->
  <tr>
    <td style="padding:24px 36px 0">
      <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#C9A84C;text-transform:uppercase">Visión del cliente</p>
      <div style="background:#111;border:1px solid #1e1e1e;border-left:3px solid #C9A84C;padding:20px 24px">
        <p style="margin:0;font-family:Georgia,serif;font-size:15px;color:#A8A9AD;line-height:1.9;font-style:italic">&ldquo;${vision}&rdquo;</p>
      </div>
    </td>
  </tr>

  <!-- CONDICIONES -->
  <tr>
    <td style="padding:20px 36px">
      <div style="background:#0d0d0d;border:1px solid #1e1e1e;border-left:2px solid #C9A84C;padding:16px 20px">
        <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:3px;color:#C9A84C;text-transform:uppercase">CONDICIONES</p>
        <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;color:#555;line-height:2.2">
          &mdash; Cotización válida por 15 días. Pieza única forjada bajo pedido.<br>
          &mdash; Tiempo de entrega: 5&ndash;7 días hábiles. Anticipo del 50% para iniciar la forja.<br>
          &mdash; Incluye empaque premium (negro absoluto + foil dorado) y certificado de autoría.
        </p>
      </div>
    </td>
  </tr>

  <!-- PIE -->
  <tr>
    <td style="padding:24px 36px;text-align:center;border-top:1px solid #1e1e1e;background:#0a0a0a">
      <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:6px;color:#C9A84C;text-transform:uppercase">EL LUJO DE LA IDENTIDAD</p>
      <p style="margin:0;font-family:'Courier New',monospace;font-size:7px;color:#2a2a2a;letter-spacing:2px">${cotNum} &middot; ${today} &middot; FORJA-COT-V2</p>
    </td>
  </tr>

</table>

</td></tr>
</table>
</body>
</html>`;

  // ── ENVÍO ─────────────────────────────────────────────────────────────────────
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
