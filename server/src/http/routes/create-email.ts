import type { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import sgMail from '@sendgrid/mail';
import { z } from 'zod';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Validação do corpo da requisição
const createEmailSchema = z.object({
  recipientEmail: z.string().email('E-mail inválido.'),
  subject: z.string().min(1, 'O assunto é obrigatório.'),
  text: z.string().min(1, 'O texto é obrigatório.'),
  pdfBase64: z
    .string()
    .regex(/^data:application\/pdf;base64,/, 'O PDF deve estar em formato Base64.'),
});

// Tipagem do corpo da requisição
type CreateEmailRequestBody = z.infer<typeof createEmailSchema>;

// Rota de envio de e-mail
export const createEmailRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    '/create-email',
    async (
      request: FastifyRequest<{ Body: CreateEmailRequestBody }>,
      reply: FastifyReply
    ) => {
      try {
        // Log inicial
        request.log.info('Iniciando envio de e-mail...');
        request.log.info('Dados recebidos:', request.body);

        // Validação do corpo da requisição
        const { recipientEmail, subject, text, pdfBase64 } = createEmailSchema.parse(request.body);
        const pdfContent = pdfBase64.split(',')[1];

        // Configuração do e-mail
        const emailData = {
          to: recipientEmail,
          from: process.env.EMAIL_FROM || 'no-reply@seu-dominio.com',
          subject,
          text,
          attachments: [
            {
              content: pdfContent,
              filename: 'document.pdf',
              type: 'application/pdf',
              disposition: 'attachment',
            },
          ],
        };

        // Envia o e-mail usando SendGrid
        await sgMail.send(emailData);

        request.log.info('E-mail enviado com sucesso.');
        reply.status(200).send({ message: 'E-mail enviado com sucesso!' });
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        // Erro de validação do Zod
        if (error instanceof z.ZodError) {
          request.log.error('Erro de validação:', error.errors);
          return reply.status(400).send({
            error: 'Erro de validação',
            details: error.errors,
          });
        }

        // Erros específicos do SendGrid
        if (error.response) {
          request.log.error('Erro no SendGrid:', {
            status: error.response.statusCode,
            body: error.response.body,
          });
          return reply.status(500).send({
            error: 'Falha ao enviar e-mail',
            details: error.response.body,
          });
        }

        // Outros erros
        request.log.error('Erro interno no servidor:', error);
        reply.status(500).send({ error: 'Erro interno do servidor.' });
      }
    }
  );
};


