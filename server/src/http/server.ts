import fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import fastifyStatic from '@fastify/static';
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

  // Configuração para servir arquivos estáticos
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads/',
  });

  // Endpoint para upload de arquivos
  app.post('/upload', async (request, reply) => {
    try {
      const data = await request.file(); // Recebe o arquivo enviado
      if (!data) {
        return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
      }

      // Cria o diretório de uploads se não existir
      const uploadDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      // Salva o arquivo no diretório de uploads
      const filePath = path.join(uploadDir, data.filename);
      await fs.promises.writeFile(filePath, await data.toBuffer());

      // Retorna a URL do arquivo
      reply.send({ url: `http://localhost:3334/uploads/${data.filename}` });
    } catch (error) {
      app.log.error('Erro no upload do arquivo:', error);
      reply.status(500).send({ error: 'Erro ao processar o upload' });
    }
  });

  // Endpoint para envio de PDF por e-mail
  app.post<{ Body: SendInvoiceBody }>('/send-invoice', async (request, reply) => {
    const { email, name, pdfUrl } = request.body;

    // Validação dos campos
    if (!email || !name || !pdfUrl) {
      app.log.error('Dados insuficientes: email, name ou pdfUrl faltando');
      return reply.status(400).send({ error: 'Dados insuficientes' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      app.log.error(`E-mail inválido: ${email}`);
      return reply.status(400).send({ error: 'E-mail inválido' });
    }

    try {
      app.log.info('Configurando o transporter do Nodemailer...');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      app.log.info('Preparando as opções do e-mail...');
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Novo Pedido - Cliente ${name}`,
        text: `Olá, um novo pedido foi gerado para o cliente ${name}. Você pode visualizar o PDF clicando no link abaixo:\n\n${pdfUrl}`,
      };

      app.log.info('Enviando e-mail...');
      await transporter.sendMail(mailOptions);
      app.log.info('E-mail enviado com sucesso!');

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