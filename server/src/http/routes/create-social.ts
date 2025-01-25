import type { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { sendPDF } from '../../functions/send-social';

// Definindo a interface para o corpo da requisição
interface CreateEmailRequestBody {
    pdfUrl: string;
    recipientEmail: string;
    subject: string;
    text: string;
}

// Definindo a rota create-email com Fastify
const createEmailRoute: FastifyPluginAsync = async (fastify, options) => {
    fastify.post('/create-email', async (request: FastifyRequest<{ Body: CreateEmailRequestBody }>, reply) => {
        const {
            pdfUrl,
            recipientEmail,
            subject,
            text
        } = request.body;

        try {
            // Chamando a função para enviar o PDF por email
            await sendPDF({
                pdfUrl,
                recipientEmail,
                subject,
                text
            });

            reply.status(200).send({ message: "PDF enviado com sucesso!" });
        } catch (error) {
            console.error("Erro ao processar a solicitação:", error);
            reply.status(500).send({ error: "Erro ao enviar o PDF." });
        }
    });
};

export default createEmailRoute;

