import fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import fastifyStatic from '@fastify/static';
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';

// Carregar variáveis de ambiente
dotenv.config();

const app = fastify({ logger: true });

async function startServer() {
  await app.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  await app.register(multipart);
  app.register(require('@fastify/formbody'));

  // Servir arquivos estáticos
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads/',
  });

  // 📤 Upload de PDF
  app.post('/upload', async (request, reply) => {
    try {
      const data = await request.file();
      if (!data) return reply.status(400).send({ error: 'Nenhum arquivo enviado' });

      if (data.mimetype !== 'application/pdf') {
        return reply.status(400).send({ error: 'O arquivo deve ser um PDF' });
      }

      const uploadDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

      const fileName = `invoice_${Date.now()}.pdf`;
      const filePath = path.join(uploadDir, fileName);
      await fs.promises.writeFile(filePath, await data.toBuffer());

      reply.send({ url: `http://localhost:3334/uploads/${fileName}` });
    } catch (error) {
      app.log.error('❌ Erro no upload do arquivo:', error);
      reply.status(500).send({ error: 'Erro ao processar o upload' });
    }
  });

  // Rotas adicionais
  app.register(createSendOrder);
  app.register(getProducts);

  app.addHook('onRequest', async (request, reply) => {
    app.log.info(`🔹 Requisição recebida: ${request.method} ${request.url}`);
  });

  app.setErrorHandler((error, request, reply) => {
    app.log.error('🔥 Erro interno do servidor:', error);
    reply.status(500).send({ error: 'Erro interno do servidor', details: error.message });
  });

  try {
    await app.listen({ host: '0.0.0.0', port: 3334 });
    app.log.info('🚀 Servidor rodando na porta 3334!');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();

process.on('SIGINT', () => {
  app.log.info('🔻 Desligando o servidor...');
  app.close(() => {
    app.log.info('✅ Servidor desligado.');
    process.exit(0);
  });
});
