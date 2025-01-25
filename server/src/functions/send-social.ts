// Importando as dependências necessárias
import nodemailer from "nodemailer";

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
    pdfUrl: string;
    recipientEmail: string;
    subject: string;
    text: string;
}

// Função principal para enviar o PDF por email
export async function sendPDF({
    pdfUrl,
    recipientEmail,
    subject,
    text
}: SendPDFOptions) {
    try {
        // Envia via Email
        await sendEmail(pdfUrl, recipientEmail, subject, text);
        console.log("PDF enviado via Email.");
    } catch (error) {
        console.error("Erro ao enviar o PDF:", error);
    }
}

