import type { FastifyPluginAsync } from 'fastify';
import { sendWhatsappMessage } from '../../functions/sendWhatsappMessage';


export const createSendWhatsapp: FastifyPluginAsync = async (app) => {
  app.post(
    '/send-whatsapp',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'number', 'pdfUrl'],
          properties: {
            name: { type: 'string' },
            number: { type: 'string', pattern: '^\\+\\d+$' }, // Número no formato internacional
            pdfUrl: { type: 'string', format: 'uri' },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, number, pdfUrl } = request.body as {
        name: string;
        number: string;
        pdfUrl: string;
      };

      try {
        const result = await sendWhatsappMessage({ name, number, pdfUrl });

        return reply.status(201).send({
          success: true,
          message: 'WhatsApp message sent successfully.',
          data: result,
        });
      } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred.';
        return reply.status(500).send({ success: false, message: errorMessage });
      }
    }
  );
};
