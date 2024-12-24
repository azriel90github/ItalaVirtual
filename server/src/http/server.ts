import fastify from 'fastify';
import cors from '@fastify/cors';
import nodemailer from 'nodemailer';
// biome-ignore lint/style/useNodejsImportProtocol: Precisamos de fs para arquivos locais.
import fs from 'fs';
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from 'path';
import dotenv from 'dotenv';
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';

dotenv.config();

const app = fastify();

async function sendEmailWithPDF({ email, name, pdfPath }: { email: string; name: string; pdfPath: string }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Variável de ambiente
      pass: process.env.EMAIL_PASS, // Variável de ambiente
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Fatura para ${name}`,
    text: `Olá ${name}, segue em anexo a sua fatura.`,
    attachments: [
      {
        filename: `Fatura_${name}.pdf`,
        path: pdfPath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}

app.get('/send-email', async (request, reply) => {
  try {
    const { email, name, pdfBase64 } = request.body as {
      email: string;
      name: string;
      pdfBase64: string;
    };

    if (!email || !name || !pdfBase64) {
      return reply.status(400).send({ message: 'Dados incompletos.' });
    }

    // Certifique-se de que a pasta temporária existe
    const tempDir = path.resolve('./temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const filePath = path.join(tempDir, `Fatura_${name}.pdf`);

    fs.writeFileSync(filePath, pdfBuffer);

    await sendEmailWithPDF({ email, name, pdfPath: filePath });

    // Remove o arquivo temporário
    fs.unlinkSync(filePath);

    return reply.status(200).send({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return reply.status(500).send({ message: 'Erro ao enviar o e-mail.' });
  }
});

async function startServer() {
  await app.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  app.register(createSendOrder);
  app.register(getProducts);

  app.setErrorHandler((error, _, reply) => {
    console.error(error);
    return reply.status(500).send({ message: 'Erro interno do servidor.' });
  });

  try {
    await app.listen({
      host: '0.0.0.0',
      port: 3334,
    });
    console.log('🚀 Servidor HTTP em execução!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
