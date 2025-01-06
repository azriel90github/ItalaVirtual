import fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart'; // Importa o plugin para upload de arquivos
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';
//import { createSendWhatsapp } from './routes/create-whatsapp';
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import fs from 'fs';
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from 'path';

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

  // Adiciona a rota para upload de PDFs
  app.post('/upload-pdf', async (request, reply) => {
    // Verifica se o corpo da requisição é multipart
    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ message: 'Nenhum arquivo foi enviado.' });
    }

    // Garante que o arquivo enviado seja um PDF
    const fileExtension = path.extname(data.filename).toLowerCase();
    if (fileExtension !== '.pdf') {
      return reply.status(400).send({ message: 'Por favor, envie um arquivo PDF.' });
    }

    // Salva o arquivo no diretório "uploads"
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Cria o diretório se ele não existir
    }

    const filePath = path.join(uploadDir, data.filename);
    const stream = fs.createWriteStream(filePath);
    await data.file.pipe(stream);

    return reply.status(200).send({ message: 'Arquivo enviado com sucesso!', filePath });
  });

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
