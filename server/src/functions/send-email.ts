import nodemailer from 'nodemailer';

interface SendPDFOptions {
  pdfUrl?: string;
  recipientEmail: string;
  subject: string;
  text: string;
}

export async function sendPDF({ pdfUrl, recipientEmail, subject, text }: SendPDFOptions) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject,
      text,
      attachments: [
        {
          filename: 'document.pdf',
          path: pdfUrl,
        },
      ],
    });
    console.log('Email enviado com sucesso.');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}


