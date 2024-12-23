import fastify from 'fastify';
import cors from '@fastify/cors';
import nodemailer from 'nodemailer';
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';

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

  // Rota para envio de e-mail
  app.post('/send-email', async (request, reply) => {
    const { email, subject, text, attachment } = request.body as { email: string; subject: string; text: string; attachment: string };

    // Configuração do transporte de e-mail
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Pode ser alterado para outro serviço, como Outlook ou SMTP personalizado
      auth: {
        user: 'seuemail@gmail.com', // Substitua pelo seu email
        pass: 'suasenha', // Substitua pela sua senha ou token de aplicação
      },
    });

    try {
      // Configuração do e-mail
      const mailOptions = {
        from: 'seuemail@gmail.com',
        to: email,
        subject: subject,
        text: text,
        attachments: [
          {
            filename: 'Fatura.pdf',
            content: Buffer.from(attachment, 'base64'), // Decodifica o anexo
            contentType: 'application/pdf',
          },
        ],
      };

      // Envio do e-mail
      await transporter.sendMail(mailOptions);
      reply.status(200).send({ message: 'Email enviado com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
      reply.status(500).send({ message: 'Erro ao enviar o e-mail.', error });
    }
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
