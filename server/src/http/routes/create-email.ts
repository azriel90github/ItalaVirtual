import type { FastifyPluginAsync } from 'fastify';
import nodemailer from 'nodemailer';
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import fs from 'fs/promises'; // Usando a API de Promises do fs para evitar bloqueios na thread
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from 'path';
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
      try {
        const { email, name, pdfBase64 } = request.body as {
          email: string;
          name: string;
          pdfBase64: string;
        };

        // Salvar o PDF no servidor temporariamente
        const tempDir = path.resolve(__dirname, 'temp');
        await fs.mkdir(tempDir, { recursive: true }); // Garantir que o diretório existe
        const filePath = path.join(tempDir, `Fatura_${name}.pdf`);
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');
        await fs.writeFile(filePath, pdfBuffer);

        // Configuração do transporte de email
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER, // Variável de ambiente
            pass: process.env.EMAIL_PASS, // Variável de ambiente
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
              filename: `Fatura_${name}.pdf`,
              path: filePath,
            },
          ],
        };

        // Enviar o email
        await transporter.sendMail(mailOptions);

        // Remover o arquivo temporário
        await fs.unlink(filePath);

        return reply.status(200).send({ message: 'E-mail enviado com sucesso!' });
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return reply.status(500).send({ message: 'Erro ao enviar o e-mail.' });
      }
    }
  );
};
