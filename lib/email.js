import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY
const FROM = process.env.EMAIL_FROM || 'ASANYX Analytics <notifications@asanyxanalytics.com>'
const TO = process.env.EMAIL_TO || 'contact@asanyxanalytics.com'

let resend = null
if (apiKey) {
  try { resend = new Resend(apiKey) } catch (e) { console.error('[email] Resend init failed', e) }
}

const BRAND = {
  primary: '#0A2540',
  accent: '#1E6BFF',
  cyan: '#06D6E0',
  emerald: '#10B981',
  bg: '#F6F9FC',
  muted: '#64748B',
  border: '#E2E8F0',
  text: '#0F172A',
}

function shell({ title, preheader, children }) {
  return `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /><title>${title}</title></head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:${BRAND.text};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader || ''}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 0;"><tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,0.06);">
    <tr><td style="padding:0;">
      <table role="presentation" width="100%"><tr><td style="background:linear-gradient(120deg,${BRAND.primary} 0%,${BRAND.accent} 55%,${BRAND.cyan} 100%);padding:22px 28px;">
        <table role="presentation"><tr>
          <td style="vertical-align:middle;"><div style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">ASANYX Analytics</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.75);letter-spacing:2px;text-transform:uppercase;margin-top:2px;">Data · Insights · AI · Intelligence</div></td>
        </tr></table>
      </td></tr></table>
    </td></tr>
    <tr><td style="padding:32px 28px 12px 28px;">${children}</td></tr>
    <tr><td style="padding:8px 28px 28px 28px;"><hr style="border:none;border-top:1px solid ${BRAND.border};margin:20px 0;" />
      <div style="font-size:12px;color:${BRAND.muted};line-height:1.6;">
        ASANYX Analytics (OPC) Private Limited &nbsp;·&nbsp; contact@asanyxanalytics.com &nbsp;·&nbsp; +91 8468982682<br/>
        <a href="https://www.linkedin.com/company/asanyx-analytics-pvt-ltd/" style="color:${BRAND.accent};text-decoration:none;">LinkedIn</a> &nbsp;·&nbsp;
        <a href="https://asanyxanalytics.com" style="color:${BRAND.accent};text-decoration:none;">asanyxanalytics.com</a>
      </div>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`
}

function row(k, v) {
  if (v === undefined || v === null || v === '') return ''
  return `<tr><td style="padding:8px 0;border-bottom:1px solid ${BRAND.border};font-size:13px;color:${BRAND.muted};width:140px;vertical-align:top;">${k}</td><td style="padding:8px 0;border-bottom:1px solid ${BRAND.border};font-size:14px;color:${BRAND.text};vertical-align:top;">${String(v).replace(/</g,'&lt;').replace(/\n/g,'<br/>')}</td></tr>`
}

export function internalTemplate({ type, submissionId, data }) {
  const keyMap = { contact: 'Contact Enquiry', consultation: 'Consultation Request', newsletter: 'Newsletter Signup', 'careers/apply': 'Career Application', 'resources/download': 'Resource Download' }
  const label = keyMap[type] || type
  const rowsHtml = Object.entries(data || {}).map(([k, v]) => row(k, v)).join('')
  return {
    subject: `[ASANYX] New ${label}${data.name ? ` — ${data.name}` : ''}`,
    html: shell({
      title: `New ${label}`,
      preheader: `A new ${label.toLowerCase()} was submitted on your website.`,
      children: `
        <div style="display:inline-block;background:${BRAND.emerald}15;color:${BRAND.emerald};font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;letter-spacing:0.5px;text-transform:uppercase;">New Lead</div>
        <h1 style="font-size:22px;font-weight:800;margin:14px 0 4px 0;">${label} received</h1>
        <p style="font-size:14px;color:${BRAND.muted};margin:0 0 20px 0;">Submission ID: <code style="font-family:monospace;">${submissionId}</code></p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Inter,sans-serif;">${rowsHtml}</table>
        ${data.email ? `<div style="margin-top:22px;"><a href="mailto:${data.email}" style="display:inline-block;background:linear-gradient(120deg,${BRAND.primary},${BRAND.accent},${BRAND.cyan});color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px;">Reply to ${data.name || 'sender'}</a></div>` : ''}
      `,
    }),
  }
}

export function visitorTemplate({ type, data }) {
  const label = { contact: 'message', consultation: 'consultation request', newsletter: 'subscription', 'careers/apply': 'application', 'resources/download': 'resource request' }[type] || 'message'
  const heading = type === 'newsletter' ? 'Welcome to the ASANYX brief.' : type === 'careers/apply' ? 'Thank you for applying to ASANYX Analytics.' : 'Thank you for reaching out.'
  return {
    subject: `We received your ${label} — ASANYX Analytics`,
    html: shell({
      title: heading,
      preheader: `Thanks ${data.name || ''}, we have received your ${label} and will respond within one business day.`,
      children: `
        <h1 style="font-size:24px;font-weight:800;margin:0 0 10px 0;letter-spacing:-0.5px;">${heading}</h1>
        <p style="font-size:15px;line-height:1.7;color:${BRAND.text};margin:0 0 14px 0;">Hi ${data.name || 'there'},</p>
        <p style="font-size:15px;line-height:1.7;color:${BRAND.text};margin:0 0 14px 0;">Thank you for connecting with <strong>ASANYX Analytics</strong>. We have received your ${label} and one of our team members will get back to you within <strong>one business day</strong>.</p>
        ${type === 'contact' || type === 'consultation' ? `<p style="font-size:15px;line-height:1.7;color:${BRAND.text};margin:0 0 14px 0;">In the meantime, feel free to explore our services, case studies and resources — or reply to this email with any additional context.</p>` : ''}
        ${type === 'careers/apply' ? `<p style="font-size:15px;line-height:1.7;color:${BRAND.text};margin:0 0 14px 0;">We currently have no open positions, but we review every application carefully and will reach out when a matching role opens.</p>` : ''}
        <div style="margin:22px 0 8px 0;">
          <a href="https://asanyxanalytics.com/services" style="display:inline-block;background:linear-gradient(120deg,${BRAND.primary},${BRAND.accent},${BRAND.cyan});color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px;">Explore our Services</a>
          &nbsp;
          <a href="https://asanyxanalytics.com/case-studies" style="display:inline-block;color:${BRAND.accent};padding:12px 18px;text-decoration:none;font-weight:600;font-size:14px;border:1px solid ${BRAND.border};border-radius:999px;">See Case Studies</a>
        </div>
        <p style="font-size:14px;line-height:1.7;color:${BRAND.muted};margin:22px 0 0 0;">Warm regards,<br/><strong style="color:${BRAND.text};">Akshay Birare</strong><br/>Founder, Director &amp; CEO<br/>ASANYX Analytics (OPC) Private Limited</p>
      `,
    }),
  }
}

export async function sendEmails({ type, submissionId, data }) {
  if (!resend) { console.log('[email] Skipped, Resend not configured'); return { skipped: true } }
  const results = {}
  try {
    const t = internalTemplate({ type, submissionId, data })
    const r = await resend.emails.send({ from: FROM, to: TO, subject: t.subject, html: t.html, replyTo: data.email || undefined, headers: { 'X-Submission-Id': String(submissionId), 'Idempotency-Key': `internal-${type}-${submissionId}` } })
    results.internal = r
    console.log('[email] internal sent', type, submissionId, r?.data?.id || r?.error?.message)
  } catch (e) { console.error('[email] internal error', e?.message || e); results.internalError = e?.message }

  if (data.email && type !== 'newsletter') {
    try {
      const t = visitorTemplate({ type, data })
      const r = await resend.emails.send({ from: FROM, to: data.email, subject: t.subject, html: t.html, headers: { 'X-Submission-Id': String(submissionId), 'Idempotency-Key': `visitor-${type}-${submissionId}` } })
      results.visitor = r
      console.log('[email] visitor sent', type, submissionId, r?.data?.id || r?.error?.message)
    } catch (e) { console.error('[email] visitor error', e?.message || e); results.visitorError = e?.message }
  } else if (data.email && type === 'newsletter') {
    try {
      const t = visitorTemplate({ type, data })
      const r = await resend.emails.send({ from: FROM, to: data.email, subject: t.subject, html: t.html, headers: { 'Idempotency-Key': `visitor-newsletter-${data.email}` } })
      results.visitor = r
    } catch (e) { results.visitorError = e?.message }
  }
  return results
}
