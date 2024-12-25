import type { FastifyPluginAsync } from 'fastify';
import nodemailer from 'nodemailer';
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import fs from 'fs';

export const sendEmailRoute: FastifyPluginAsync = async (app) => {
  app.get(
    '/send-email',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'name', 'pdfBase64'],
          properties: {
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            pdfBase64: { type: 'string' },
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

        // Salva o PDF no servidor temporariamente
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');
        const filePath = `./temp/Fatura_${name}.pdf`;
        fs.writeFileSync(filePath, pdfBuffer);

        // Configuração do transporte de email
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'azrielgithub@gmail.com', // Substitua pelo seu e-mail
            pass: 'azriel@90',  // Substitua pela sua senha ou token de app
          },
        });

        // Configurações do email
        const mailOptions = {
          from: 'azrielgithub@gmail.com', // Substitua pelo seu e-mail
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

        // Envia o email
        await transporter.sendMail(mailOptions);

        // Remove o arquivo temporário
        fs.unlinkSync(filePath);

        return reply.status(200).send({ message: 'E-mail enviado com sucesso!' });
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return reply.status(500).send({ message: 'Erro ao enviar o e-mail.' });
      }
    }
  );
};
