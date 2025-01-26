import fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import path from 'node:path';
import fs from 'node:fs';
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';
import { createEmailRoute } from './routes/create-email';

const app = fastify({
  logger: true,
});

async function startServer() {
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

  // Diretório público para uploads
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  // Endpoint para upload de arquivos
  app.post('/upload', async (request, reply) => {
    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
    }

    try {
      const fileName = `${Date.now()}-${data.filename}`;
      const filePath = path.join(uploadsDir, fileName);
      await data.toBuffer().then((buffer) => fs.writeFileSync(filePath, buffer));

      const fileUrl = `http://localhost:3334/uploads/${fileName}`;
      reply.status(200).send({ url: fileUrl });
    } catch (error) {
      app.log.error('Erro ao processar o upload:', error);
      reply.status(500).send({ error: 'Erro ao fazer upload do arquivo' });
    }
  });

  // Registra as rotas
  app.register(createSendOrder);
  app.register(getProducts);
  app.register(createEmailRoute);

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



