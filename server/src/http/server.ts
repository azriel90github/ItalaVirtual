import fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';
import fs from 'node:fs';
import path from 'node:path';
import mime from 'mime-types'; // Para validação adicional de tipos MIME
import { createSendWhatsapp } from './routes/createSendWhatsapp';

const app = fastify();

async function startServer() {
  // Registra o plugin CORS
  await app.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Registra o plugin para multipart (upload de arquivos)
  await app.register(multipart);

  // Registra a rota para envio de mensagens no WhatsApp
  await app.register(createSendWhatsapp);

  // Registra as rotas existentes
  app.register(createSendOrder);
  app.register(getProducts);

  // Adiciona a rota para upload de PDFs
  app.post('/upload-pdf', async (request, reply) => {
    try {
      // Verifique o cabeçalho Content-Type para garantir que é multipart
      const contentType = request.headers['content-type'];
      if (!contentType || !contentType.startsWith('multipart/form-data')) {
        return reply.status(415).send({ message: 'Tipo de mídia inválido. Envie um arquivo como multipart/form-data.' });
      }

      // Verifica se o corpo da requisição é multipart
      const data = await request.file();
      if (!data) {
        return reply.status(400).send({ message: 'Nenhum arquivo foi enviado.' });
      }

      // Valida se o arquivo enviado é um PDF
      const mimeType = mime.lookup(data.filename);
      const fileExtension = path.extname(data.filename).toLowerCase();
      if (fileExtension !== '.pdf' || mimeType !== 'application/pdf') {
        return reply.status(400).send({ message: 'Por favor, envie um arquivo PDF válido.' });
      }

      // Define o diretório de upload e garante que ele exista
      const uploadDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }); // Cria o diretório se ele não existir
      }

      // Garante que o nome do arquivo seja único para evitar sobrescrita
      const uniqueFileName = `${Date.now()}-${data.filename}`;
      const filePath = path.join(uploadDir, uniqueFileName);

      // Salva o arquivo no diretório
      const stream = fs.createWriteStream(filePath);
      await data.file.pipe(stream);

      // Retorna a resposta com o caminho do arquivo
      return reply.status(200).send({
        message: 'Arquivo enviado com sucesso!',
        filePath,
      });
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
      return reply.status(500).send({
        message: 'Erro interno ao processar o upload.',
      });
    }
  });

  // Tratamento de erros
  app.setErrorHandler((error, _, reply) => {
    console.error('Erro capturado pelo ErrorHandler:', error);
    return reply.status(500).send({ message: 'Erro interno do servidor.' });
  });

  // Inicia o servidor
  try {
    const PORT = process.env.PORT || 3334;
    await app.listen({
      host: '0.0.0.0',
      port: Number(PORT),
    });
    console.log(`🚀 Servidor HTTP em execução na porta ${PORT}!`);
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
}

startServer();


