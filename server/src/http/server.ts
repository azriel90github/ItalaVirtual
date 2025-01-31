import fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = fastify({
  logger: true,
});

interface SendInvoiceBody {
  email: string;
  name: string;
  pdfUrl: string;
}

async function startServer() {
  // Verifique se as variáveis de ambiente necessárias estão configuradas
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    app.log.error('As variáveis de ambiente EMAIL_USER e EMAIL_PASS não estão configuradas!');
    process.exit(1);
  }

  await app.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  await app.register(multipart);
  app.register(require('@fastify/formbody'));

  // Endpoint para envio de PDF por e-mail
  app.post<{ Body: SendInvoiceBody }>('/send-invoice', async (request, reply) => {
    try {
      const { email, name, pdfUrl } = request.body;
      if (!email || !name || !pdfUrl) {
        return reply.status(400).send({ error: 'Dados insuficientes' });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Novo Pedido - Cliente ${name}`,
        text: `Olá, um novo pedido foi gerado para o cliente ${name}. Você pode visualizar o PDF clicando no link abaixo:\n\n${pdfUrl}`,
      };

      await transporter.sendMail(mailOptions);
      reply.send({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
      app.log.error('Erro no envio do e-mail:', error);
      reply.status(500).send({ error: 'Erro ao enviar e-mail' });
    }
  });

  // Registra as rotas
  app.register(createSendOrder);
  app.register(getProducts);

  app.addHook('onRequest', async (request, reply) => {
    app.log.info(`Requisição recebida: ${request.method} ${request.url}`);
  });

  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  });

  try {
    await app.listen({
      host: '0.0.0.0',
      port: 3334,
    });
    app.log.info('🚀 Servidor HTTP em execução na porta 3334!');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();