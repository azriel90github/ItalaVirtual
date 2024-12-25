import type { FastifyPluginAsync } from 'fastify';
import nodemailer from 'nodemailer';
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

export const sendEmailRoute: FastifyPluginAsync = async (app) => {
  app.post(
    '/send-email',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'name', 'pdfBase64'],
          properties: {
            email: { type: 'string', format: 'email' },
            name: { type: 'string', minLength: 1 },
            pdfBase64: { type: 'string', minLength: 1 },
          },
        },
      },      
    },
    async (request, reply) => {
      const tempDir = path.resolve(__dirname, 'temp');
      let filePath: string | undefined;

      try {
        // Verificar o corpo da requisição
        console.log('Requisição recebida:', request.body);

        const { email, name, pdfBase64 } = request.body as {
          email: string;
          name: string;
          pdfBase64: string;
        };

        // Verificação do formato Base64 para o PDF com um regex mais rigoroso
        const base64Regex = /^([A-Za-z0-9+/=]+\s*)+$/;
        if (!base64Regex.test(pdfBase64)) {
          return reply.status(400).send({ message: 'Formato inválido de Base64 para o PDF.' });
        }

        // Sanitização do nome para evitar problemas ao criar o arquivo
        const sanitizedName = name.replace(/[^a-zA-Z0-9_-]/g, '_');
        
        // Salvar o PDF no servidor temporariamente
        await fs.mkdir(tempDir, { recursive: true });
        filePath = path.join(tempDir, `Fatura_${sanitizedName}.pdf`);
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');
        await fs.writeFile(filePath, pdfBuffer);

        // Configuração do transporte de email
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
          console.error('Configurações de e-mail ausentes.');
          return reply.status(500).send({ message: 'Configurações de e-mail não estão definidas.' });
        }

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN,
          },
        });
        

        // Configurações do email
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: `Fatura para ${name}`,
          text: `Olá ${name}, segue em anexo a sua fatura.`,
          attachments: [
            {
              filename: `Fatura_${sanitizedName}.pdf`,
              path: filePath,
            },
          ],
        };

        // Enviar o email
        await transporter.sendMail(mailOptions);

        // Log de sucesso
        console.log(`E-mail enviado com sucesso para ${email}`);
        return reply.status(200).send({ message: 'E-mail enviado com sucesso!' });
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        // Verificar se o erro é relacionado ao envio de e-mail
        if (error instanceof Error) {
          return reply.status(500).send({ message: 'Erro ao enviar o e-mail.' });
        }
        return reply.status(500).send({ message: 'Erro inesperado ao processar a requisição.' });
      } finally {
        // Garantir que o arquivo temporário seja removido
        if (filePath) {
          try {
            await fs.unlink(filePath);
            console.log(`Arquivo temporário ${filePath} removido.`);
          } catch (unlinkError) {
            console.error(`Erro ao remover arquivo temporário ${filePath}:`, unlinkError);
          }
        }
      }
    }
  );
};
