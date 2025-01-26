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
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const mailOptions: any = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject,
      text,
    };

    // Condicional para adicionar anexos apenas se pdfUrl estiver presente
    if (pdfUrl) {
      mailOptions.attachments = [
        {
          filename: 'document.pdf',
          path: pdfUrl,
        },
      ];
    }

    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso.');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}

