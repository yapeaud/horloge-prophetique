import nodemailer from 'nodemailer'

// Transporter réutilisable — créé une seule fois au démarrage du module.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // STARTTLS sur le port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

/**
 * Envoie le message de contact à l'adresse CONTACT_EMAIL_TO.
 * Un accusé de réception est également expédié à l'auteur du message.
 */
export const sendContactEmail = async ({ nom, email, sujet, message }) => {
  // Email reçu par l'équipe HP
  await transporter.sendMail({
    from: `"Formulaire Contact HP" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL_TO,
    replyTo: email,
    subject: `[Contact HP] ${sujet}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#0a063b">Nouveau message de contact</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;font-weight:bold;width:120px">Nom</td><td style="padding:8px">${nom}</td></tr>
          <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Sujet</td><td style="padding:8px">${sujet}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#f9f9f9;border-left:4px solid #ff8a14">
          <p style="margin:0;white-space:pre-line">${message}</p>
        </div>
      </div>
    `,
  })

  // Accusé de réception envoyé à l'expéditeur
  await transporter.sendMail({
    from: `"Horloge Prophétique" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Nous avons bien reçu votre message',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#0a063b">Merci, ${nom} !</h2>
        <p>Votre message a bien été reçu. Notre équipe vous répondra dans les meilleurs délais.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="color:#888;font-size:13px">Horloge Prophétique — horlogeprophetique@gmail.com</p>
      </div>
    `,
  })
}
