import fastify from 'fastify';
import cors from '@fastify/cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';

dotenv.config();

const app = fastify();

async function startServer() {
  await app.register(cors, {
    origin: ['http://localhost:5173'], // Ajuste conforme necessário
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  app.register(createSendOrder);
  app.register(getProducts);

  app.post('/send-email', async (request, reply) => {
    const { email, subject, text, attachment } = request.body as { email: string; subject: string; text: string; attachment: string };

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
        attachments: [
          {
            filename: 'Fatura.pdf',
            content: Buffer.from(attachment, 'base64'),
            contentType: 'application/pdf',
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      reply.status(200).send({ message: 'Email enviado com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
      reply.status(500).send({ message: 'Erro ao enviar o e-mail.', error });
    }
  });

  app.setErrorHandler((error, _, reply) => {
    console.error(error);
    reply.status(500).send({ message: 'Erro interno do servidor.' });
  });

  try {
    const PORT = process.env.PORT || 3334;
    const HOST = process.env.HOST || '127.0.0.1';

    await app.listen({ host: HOST, port: Number(PORT) });
    console.log(`🚀 Servidor HTTP em execução em ${HOST}:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
