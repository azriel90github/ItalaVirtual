import type { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { sendPDF } from '../../functions/send-social';

// Definindo a interface para o corpo da requisição
interface CreateSocialRequestBody {
    pdfUrl: string;
    recipientPhoneNumber?: string;
    recipientMessengerId?: string;
    recipientInstagramId?: string;
    recipientEmail?: string;
    subject: string;
    text: string;
    accessToken: string;
}

// Definindo a rota create-social com Fastify
const createSocialRoute: FastifyPluginAsync = async (fastify, options) => {
    fastify.post('/create-social', async (request: FastifyRequest<{ Body: CreateSocialRequestBody }>, reply) => {
        const {
            pdfUrl,
            recipientPhoneNumber,
            recipientMessengerId,
            recipientInstagramId,
            recipientEmail,
            subject,
            text,
            accessToken
        } = request.body;

        try {
            // Passando 'fastify' como parte do objeto
            await sendPDF({
                fastify,  // Passando 'fastify' aqui
                pdfUrl,
                recipientPhoneNumber,
                recipientMessengerId,
                recipientInstagramId,
                recipientEmail,
                subject,
                text,
                accessToken
            });

            reply.status(200).send({ message: "PDF enviado com sucesso!" });
        } catch (error) {
            console.error("Erro ao processar a solicitação:", error);
            reply.status(500).send({ error: "Erro ao enviar o PDF." });
        }
    });
};

export default createSocialRoute;

