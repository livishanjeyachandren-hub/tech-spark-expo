import emailjs from "@emailjs/browser";

/**
 * Shared EmailJS configuration for Tech Talent Expo 2026.
 * The public key is a publishable client-side value (safe in the bundle);
 * it can be overridden with VITE_EMAILJS_PUBLIC_KEY.
 */
export const EMAILJS_SERVICE_ID = "service_ftekxeg";
export const EMAILJS_TEMPLATE_ID = "template_p5puyhk";
export const EMAILJS_PUBLIC_KEY =
  (import.meta.env["VITE_EMAILJS_PUBLIC_KEY"] as string | undefined) ?? "";

/** Admin inbox that receives a copy of every registration. */
export const ADMIN_EMAIL = "halloworld1103@gmail.com";

export type RegistrationEmailData = {
  registrationId: string;
  registeredAt: string;
  fullName: string;
  email: string;
  phone: string;
  category: string;
  track: string;
  domain: string;
  projectTitle: string;
  /** Base64 data URL of the registration QR code. */
  qrDataUrl: string;
};

/** Small helper so both templates share the same send call and error shape. */
async function send(params: Record<string, unknown>) {
  if (!EMAILJS_PUBLIC_KEY) {
    throw new Error("Email service is not configured yet.");
  }
  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params, {
    publicKey: EMAILJS_PUBLIC_KEY,
  });
}

/** Clean HTML block reused by both messages. */
function detailsTable(d: RegistrationEmailData) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;color:#6b7280;font-family:Arial,sans-serif;font-size:13px">${label}</td>` +
    `<td style="padding:6px 12px;color:#111827;font-family:Arial,sans-serif;font-size:13px;font-weight:600">${value}</td></tr>`;

  return `<table style="border-collapse:collapse;width:100%;background:#faf7ff;border:1px solid #e9d5ff;border-radius:10px">
      ${row("Registration ID", d.registrationId)}
      ${row("Full name", d.fullName)}
      ${row("Email", d.email)}
      ${row("Phone", d.phone)}
      ${row("Category", d.category)}
      ${row("Track", d.track)}
      ${row("Domain", d.domain)}
      ${row("Project title", d.projectTitle)}
      ${row("Registered at", d.registeredAt)}
    </table>`;
}

/** Notifies the organising committee about a new registration. */
export async function sendAdminRegistrationEmail(d: RegistrationEmailData) {
  await send({
    to_email: ADMIN_EMAIL,
    to_name: "Tech Talent Expo Admin",
    subject: `New registration — ${d.registrationId} (${d.fullName})`,
    reply_to: d.email,
    registration_id: d.registrationId,
    registration_date: d.registeredAt,
    full_name: d.fullName,
    email: d.email,
    phone_number: d.phone,
    category: d.category,
    track: d.track,
    domain: d.domain,
    project_title: d.projectTitle,
    qr_code: d.qrDataUrl,
    message_html: `<div style="font-family:Arial,sans-serif;color:#111827">
        <h2 style="color:#6d28d9;margin:0 0 12px">New registration received</h2>
        ${detailsTable(d)}
      </div>`,
  });
}

/** Sends the participant their confirmation with the QR pass. */
export async function sendUserVerificationEmail(d: RegistrationEmailData) {
  await send({
    to_email: d.email,
    to_name: d.fullName,
    subject: `Registration confirmed — ${d.registrationId} | Tech Talent Expo 2026`,
    reply_to: ADMIN_EMAIL,
    registration_id: d.registrationId,
    registration_date: d.registeredAt,
    full_name: d.fullName,
    email: d.email,
    phone_number: d.phone,
    category: d.category,
    track: d.track,
    domain: d.domain,
    project_title: d.projectTitle,
    qr_code: d.qrDataUrl,
    message_html: `<div style="font-family:Arial,sans-serif;color:#111827">
        <h2 style="color:#6d28d9;margin:0 0 8px">Thank you for registering, ${d.fullName}!</h2>
        <p style="font-size:14px">Your registration for <strong>Tech Talent Expo 2026</strong> was completed successfully.</p>
        ${detailsTable(d)}
        <p style="font-size:14px;margin-top:16px">Show the QR code below at the registration desk for instant check-in.</p>
        <img src="${d.qrDataUrl}" alt="Registration QR code" width="200" height="200" style="border-radius:10px;background:#fff;padding:8px" />
      </div>`,
  });
}
