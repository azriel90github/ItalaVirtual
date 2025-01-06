const fetch = require('node-fetch');

// Função para enviar mensagens via WhatsApp usando Twilio
export async function sendWhatsappMessage({
  name,
  number,
  pdfUrl,
}: {
  name: string;
  number: string;
  pdfUrl: string;
}): Promise<{ messageId: string }> {
  const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
  const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
  const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
    throw new Error('Twilio credentials are not properly configured.');
  }

  if (!/^\+\d+$/.test(number)) {
    throw new Error('Invalid phone number format. Use international format with country code.');
  }

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: TWILIO_WHATSAPP_NUMBER,
        To: `whatsapp:${number}`,
        Body: `Olá ${name}, segue em anexo o documento solicitado.`,
        MediaUrl: pdfUrl,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Twilio API Error:', errorText);
    throw new Error('Failed to send WhatsApp message. Please try again later.');
  }

  const result = await response.json();
  return { messageId: result.sid };
}
