import fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';
import { sendEmailRoute } from './routes/create-email';

dotenv.config();

const app = fastify();

async function startServer() {
  // Registra o plugin CORS
  await app.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Registra as rotas
  app.register(createSendOrder);
  app.register(getProducts);
  app.register(sendEmailRoute);

  // Tratamento de erros
  app.setErrorHandler((error, _, reply) => {
    console.error(error);
    return reply.status(500).send({ message: 'Erro interno do servidor.' });
  });

  // Inicia o servidor
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

