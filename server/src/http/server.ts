import fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';
import { sendEmailRoute } from './routes/create-email';
import Multipart from '@fastify/multipart';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = fastify();

async function startServer() {
  // Registra o plugin CORS com opções mais flexíveis
  await app.register(cors, {
    origin: (origin, cb) => {
      const allowedOrigins = ['http://localhost:5173']; // Adicione outros domínios permitidos aqui
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed'), false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Se você precisar de credenciais (cookies, autorização)
    allowedHeaders: ['Content-Type', 'Authorization'], // Especifique os cabeçalhos permitidos
  });

  // Registra o plugin Multipart para lidar com uploads de arquivos
  await app.register(Multipart, {
    attachFieldsToBody: true, // Anexa os campos do formulário ao corpo da requisição
    limits: {
      fieldNameSize: 100, // Tamanho máximo do nome do campo (em bytes)
      fieldSize: 1048576, // Tamanho máximo do campo (em bytes, 1MB por padrão)
      fields: 10, // Número máximo de campos não-arquivo
      fileSize: 1048576, // Tamanho máximo do arquivo (em bytes, 1MB por padrão)
      files: 2, // Número máximo de arquivos
      headerPairs: 2000 // Número máximo de pares de cabeçalho
    }
  });

  // Registra as rotas
  app.register(createSendOrder);
  app.register(getProducts);
  app.register(sendEmailRoute);

  // Tratamento de erros mais detalhado
  app.setErrorHandler((error, request, reply) => {
    console.error(error);

    // Erro relacionado a upload de arquivo
    if (error.name === 'FastifyError' && error.message.includes('Multipart')) {
      return reply.status(400).send({ message: 'Erro no upload do arquivo.' });
    }

    // Erro de validação
    if (error.validation) {
      return reply.status(400).send({ message: 'Erro de validação.', errors: error.validation });
    }

    // Erro genérico
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
