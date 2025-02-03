import fastify from 'fastify';
import cors from '@fastify/cors';
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';


const app = fastify();

async function startServer() {
  await app.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

