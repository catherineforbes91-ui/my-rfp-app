import wixSecretsBackend from 'wix-secrets-backend';
import sgMail from '@sendgrid/mail';

export async function sendEmail({ to, subject, html }) {
  const secret = JSON.parse(await wixSecretsBackend.getSecret("SENDGRID"));
  sgMail.setApiKey(secret.apiKey);
  const msg = {
    to,
    from: secret.senderEmail,
    subject,
    html
  };
  return sgMail.send(msg);
}
