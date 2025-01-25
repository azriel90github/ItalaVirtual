import fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart'; // Importa o plugin para upload de arquivos
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';
import { createEmailRoute } from './routes/create-email';


const app = fastify({
  logger: true, // Ativa o logger integrado do Fastify
});

async function startServer() {
  // Validação de variáveis de ambiente
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    app.log.error('As variáveis de ambiente EMAIL_USER e EMAIL_PASS não estão configuradas!');
    process.exit(1); // Interrompe a execução se as variáveis de ambiente não forem encontradas
  }

  // Registra o plugin CORS
  await app.register(cors, {
    origin: true, // Alterar conforme o ambiente do front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Registra o plugin para multipart (uploads de arquivos)
  await app.register(multipart);
  app.register(require('@fastify/formbody'));

  // Registra as rotas existentes
  app.register(createSendOrder);
  app.register(getProducts);
  app.register(createEmailRoute);

  // Middleware de rastreamento (opcional)
  app.addHook('onRequest', async (request, reply) => {
    app.log.info(`Requisição recebida: ${request.method} ${request.url}`);
  });

  // Tratamento de erros globais
  app.setErrorHandler((error, request, reply) => {
    // Registra o erro detalhado
    app.log.error(error);
    // Envia resposta genérica para o cliente
    reply.status(500).send({ error: 'Erro interno do servidor' });
  });

  // Inicia o servidor
  try {
    await app.listen({
      host: '0.0.0.0',  // Ou localhost caso preferir
      port: 3334,
    });
    app.log.info('🚀 Servidor HTTP em execução na porta 3334!');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();

