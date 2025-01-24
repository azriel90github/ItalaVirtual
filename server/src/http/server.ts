import fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart'; // Importa o plugin para upload de arquivos
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';
import createSocialRoute from './routes/create-social';

const app = fastify();

async function startServer() {
  // Registra o plugin CORS
  await app.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Registra o plugin para multipart (uploads de arquivos)
  await app.register(multipart);

  // Registra as rotas existentes
  app.register(createSendOrder);
  app.register(getProducts);
  app.register(createSocialRoute);

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
