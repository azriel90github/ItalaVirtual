import type { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { sendPDF } from '../../functions/send-email';
import { z } from 'zod';

// Esquema de validação com zod
const createEmailSchema = z.object({
    pdfUrl: z.string().url().default(""), // Retorna string vazia se não for fornecido
    recipientEmail: z.string().email(),
    subject: z.string().min(1, 'O assunto é obrigatório.'),
    text: z.string().min(1, 'O texto é obrigatório.'),
  });
  

// Tipagem para o corpo da requisição com base no esquema
type CreateEmailRequestBody = z.infer<typeof createEmailSchema>;

export const createEmailRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/create-email', async (request: FastifyRequest<{ Body: CreateEmailRequestBody }>, reply) => {
    try {
      // Validação do corpo da requisição
      const parsedBody = createEmailSchema.parse(request.body);
      const { pdfUrl, recipientEmail, subject, text } = parsedBody;

      // Chamada para a função de envio de email
      await sendPDF({ pdfUrl, recipientEmail, subject, text });

      // Resposta de sucesso
      reply.status(200).send({ message: 'Email enviado com sucesso!' });
    } catch (error) {
      // Diferencia erros de validação e erros gerais
      if (error instanceof z.ZodError) {
        console.error('Erro de validação:', error.errors);
        return reply.status(400).send({
          error: 'Erro de validação',
          details: error.errors,
        });
      }

      console.error('Erro ao enviar o email:', error);
      reply.status(500).send({ error: 'Erro interno do servidor.' });
    }
  });
};



