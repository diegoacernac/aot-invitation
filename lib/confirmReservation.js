import { Resend } from 'resend';

const BRANCHES = {
  legion: {
    name: 'Legión de Exploración',
    title: 'Tu misión: cine',
    plan: 'Cine',
  },
  police: {
    name: 'Policía Militar',
    title: 'Tu misión: cenar pollito',
    plan: 'Cenar pollito',
  },
  garrison: {
    name: 'Guarnición',
    title: 'Tu misión: plan casual',
    plan: 'Plan casual',
  },
};

export class ConfirmError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

function buildEmailHtml({ branch, accent }) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <body style="margin:0;padding:0;background:#0f0f12;font-family:Georgia,serif;color:#ede9e4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f12;padding:40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" style="max-width:520px;border:1px solid ${accent};background:#15151a;">
                <tr>
                  <td style="padding:32px 28px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:${accent};">
                      Misión confirmada
                    </p>
                    <h1 style="margin:0 0 20px;font-size:24px;color:#fff;">
                      ¡Tu destino está sellado!
                    </h1>
                    <p style="margin:0 0 24px;line-height:1.7;color:#b8b4ae;">
                      Amor, guardé tu respuesta. Estos son los detalles de tu misión:
                    </p>
                    <table width="100%" style="border-top:1px solid #2a2a30;border-bottom:1px solid #2a2a30;margin-bottom:24px;">
                      <tr>
                        <td style="padding:16px 0;text-align:left;">
                          <p style="margin:0 0 8px;color:${accent};font-size:12px;letter-spacing:2px;text-transform:uppercase;">
                            Cuerpo
                          </p>
                          <p style="margin:0;color:#fff;">${branch.name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:16px 0;text-align:left;">
                          <p style="margin:0 0 8px;color:${accent};font-size:12px;letter-spacing:2px;text-transform:uppercase;">
                            Plan pendiente
                          </p>
                          <p style="margin:0;color:#fff;">${branch.title}</p>
                          <p style="margin:8px 0 0;color:#b8b4ae;font-size:14px;">Para cuando podamos salir — fecha por acordar</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:16px 0;text-align:left;">
                          <p style="margin:0 0 8px;color:${accent};font-size:12px;letter-spacing:2px;text-transform:uppercase;">
                            Hoy
                          </p>
                          <p style="margin:0;color:#fff;">Tiempo juntos en tu casa</p>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:0;color:#b8b4ae;line-height:1.7;">
                      Nos vemos hoy. El resto lo acordamos después. ❤️
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function getAccent(branchId) {
  if (branchId === 'legion') return '#4a7c59';
  if (branchId === 'police') return '#8b6914';
  return '#5a5a8a';
}

export async function confirmReservation({ email, branchId }) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ConfirmError('Email inválido');
  }

  const branch = BRANCHES[branchId];
  if (!branch) {
    throw new ConfirmError('Rama inválida');
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new ConfirmError('Falta configurar RESEND_API_KEY', 500);
  }

  const html = buildEmailHtml({
    branch,
    accent: getAccent(branchId),
  });

  const payload = {
    from: process.env.FROM_EMAIL || 'Invitación AOT <onboarding@resend.dev>',
    to: email,
    subject: `¡Misión confirmada! — ${branch.name}`,
    html,
  };

  if (process.env.NOTIFY_EMAIL) {
    payload.bcc = process.env.NOTIFY_EMAIL;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send(payload);

  return { ok: true };
}
