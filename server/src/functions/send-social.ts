// Importando as dependências necessárias
import nodemailer from "nodemailer";
import type { FastifyInstance } from 'fastify';

// Função para enviar o PDF via WhatsApp
async function sendWhatsApp(fastify: FastifyInstance, pdfUrl: string, recipientPhoneNumber: string, accessToken: string) {
    const url = 'https://graph.facebook.com/v17.0/<YOUR_WHATSAPP_PHONE_NUMBER_ID>/messages';
    const data = {
        messaging_product: "whatsapp",
        to: recipientPhoneNumber,
        type: "document",
        document: {
            link: pdfUrl,
            filename: "document.pdf"
        }
    };

    await fastify.inject({
        method: 'POST',
        url,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        payload: data
    });
}

// Função para enviar o PDF via Messenger
async function sendMessenger(fastify: FastifyInstance, pdfUrl: string, recipientId: string, accessToken: string) {
    const url = 'https://graph.facebook.com/v17.0/me/messages';
    const data = {
        recipient: { id: recipientId },
        message: {
            attachment: {
                type: "file",
                payload: { url: pdfUrl, is_reusable: true }
            }
        }
    };

    await fastify.inject({
        method: 'POST',
        url,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        payload: data
    });
}

// Função para enviar o PDF via Instagram
async function sendInstagram(fastify: FastifyInstance, pdfUrl: string, recipientId: string, accessToken: string) {
    const url = 'https://graph.facebook.com/v17.0/me/messages';
    const data = {
        recipient: { id: recipientId },
        message: {
            attachment: {
                type: "file",
                payload: { url: pdfUrl, is_reusable: true }
            }
        }
    };

    await fastify.inject({
        method: 'POST',
        url,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        payload: data
    });
}

// Função para enviar o PDF via Email
async function sendEmail(pdfPath: string, recipientEmail: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail", // ou outro serviço de email
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: subject,
        text: text,
        attachments: [
            {
                filename: "document.pdf",
                path: pdfPath
            }
        ]
    });
}

// Tipagem para os parâmetros da função principal
interface SendPDFOptions {
    fastify: FastifyInstance;
    pdfUrl: string;
    recipientPhoneNumber?: string;
    recipientMessengerId?: string;
    recipientInstagramId?: string;
    recipientEmail?: string;
    subject: string;
    text: string;
    accessToken: string;
}

// Função principal para enviar o PDF para várias plataformas
export async function sendPDF({
    fastify,
    pdfUrl,
    recipientPhoneNumber,
    recipientMessengerId,
    recipientInstagramId,
    recipientEmail,
    subject,
    text,
    accessToken
}: SendPDFOptions) {
    try {
        // Envia via WhatsApp
        if (recipientPhoneNumber) {
            await sendWhatsApp(fastify, pdfUrl, recipientPhoneNumber, accessToken);
            console.log("PDF enviado via WhatsApp.");
        }

        // Envia via Messenger
        if (recipientMessengerId) {
            await sendMessenger(fastify, pdfUrl, recipientMessengerId, accessToken);
            console.log("PDF enviado via Messenger.");
        }

        // Envia via Instagram
        if (recipientInstagramId) {
            await sendInstagram(fastify, pdfUrl, recipientInstagramId, accessToken);
            console.log("PDF enviado via Instagram.");
        }

        // Envia via Email
        if (recipientEmail) {
            await sendEmail(pdfUrl, recipientEmail, subject, text);
            console.log("PDF enviado via Email.");
        }
    } catch (error) {
        console.error("Erro ao enviar o PDF:", error);
    }
}
