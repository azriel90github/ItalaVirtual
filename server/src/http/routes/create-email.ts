import type { FastifyPluginAsync, FastifyRequest } from 'fastify';
import sgMail from '@sendgrid/mail';
import { z } from 'zod';
import { pdf } from 'react-pdf'; // Bibliotecas para gerar o PDF
import { generateInvoice } from '../../../functions/generateInvoice'; // Função para gerar o layout do PDF

// Configure a chave de API do SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Validação do corpo da requisição usando Zod
const createEmailSchema = z.object({
  recipientEmail: z.string().email('E-mail inválido.'),
  subject: z.string().min(1, 'O assunto é obrigatório.'),
  text: z.string().min(1, 'O texto é obrigatório.'),
  formData: z.object({
    name: z.string(),
    // Adicione aqui outros campos que você está usando no seu formulário
  }),
});

// Tipagem do corpo da requisição
type CreateEmailRequestBody = z.infer<typeof createEmailSchema>;

export const createEmailRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    '/create-email',
    async (request: FastifyRequest<{ Body: CreateEmailRequestBody }>, reply) => {
      try {
        // Valida o corpo da requisição
        const { recipientEmail, subject, text, formData } = createEmailSchema.parse(
          request.body
        );

        // **1. Gerar o PDF**
        console.log('Gerando PDF...');
        const invoiceComponent = generateInvoice(formData); // Função para gerar o layout do PDF
        const pdfBlob = await pdf(invoiceComponent).toBlob();

        if (!pdfBlob) {
          console.error('Erro ao gerar o PDF: Blob vazio.');
          return reply.status(500).send({ error: 'Erro ao gerar o PDF.' });
        }

        // **2. Converter PDF Blob para Base64**
        console.log('Convertendo PDF para Base64...');
        const pdfBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(pdfBlob); // Retorna como Base64
        });

        // **3. Configuração do e-mail**
        const emailData = {
          to: recipientEmail,
          from: process.env.EMAIL_FROM || 'no-reply@seu-dominio.com', // E-mail autorizado no SendGrid
          subject,
          text,
          attachments: [
            {
              content: pdfBase64.split(',')[1], // Remove o prefixo "data:application/pdf;base64,"
              filename: 'document.pdf',
              type: 'application/pdf',
              disposition: 'attachment',
            },
          ],
        };

        // **4. Enviar o e-mail**
        await sgMail.send(emailData);

        // **5. Resposta de sucesso**
        reply.status(200).send({ message: 'E-mail enviado com sucesso!' });
      } catch (error) {
        // Diferencia erros de validação e erros gerais
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: 'Erro de validação',
            details: error.errors,
          });
        }

        request.log.error('Erro ao enviar e-mail:', error);
        reply.status(500).send({ error: 'Erro interno do servidor.' });
      }
    }
  );
};


