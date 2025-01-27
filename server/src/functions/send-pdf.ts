import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

interface SendPDFOptions {
  pdfBase64: string;
  recipientEmail: string;
  subject: string;
  text: string;
}

export const sendPDF = async ({ pdfBase64, recipientEmail, subject, text }: SendPDFOptions) => {
  try {
    const emailData = {
      to: recipientEmail,
      from: 'azrielgithub@gmail.com',
      subject,
      text,
      attachments: [
        {
          content: pdfBase64.split(',')[1], // Remove o prefixo "data:application/pdf;base64,"
          filename: 'document.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };

    await sgMail.send(emailData);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    throw new Error('Erro ao enviar o e-mail.');
  }
};

