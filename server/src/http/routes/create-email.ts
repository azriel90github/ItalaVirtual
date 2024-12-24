const fastify = require("fastify")({ logger: true });
const nodemailer = require("nodemailer");
const fastifyPlugin = require("fastify-plugin");

// Plugin para envio de email
import type { FastifyInstance } from "fastify";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const emailPlugin = async (fastify: FastifyInstance, options: { [key: string]: any }) => {
  // Configuração do transporte de email
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com", // Substitua pelo servidor SMTP
    port: 587,
    secure: false,
    auth: {
      user: "seu-email@example.com", // Email de envio
      pass: "sua-senha",            // Senha do email
    },
  });

  // Adicionando o transporte ao Fastify
  fastify.decorate("sendEmail", async ({ email, subject, body, attachment }: { email: string, subject: string, body: string, attachment: { filename: string, content: string, contentType: string } }) => {
    const mailOptions = {
      from: '"Minha Loja" <seu-email@example.com>', // Nome e email do remetente
      to: email,                                   // Destinatário
      subject,                                     // Assunto do email
      text: body,                                  // Corpo do email
      attachments: [
        {
          filename: attachment.filename,
          content: Buffer.from(attachment.content), // O conteúdo do anexo deve ser um buffer
          contentType: attachment.contentType,
        },
      ],
    };

    // Envia o email
    return transporter.sendMail(mailOptions);
  });
};

// Registro do plugin
fastify.register(fastifyPlugin(emailPlugin));

// Rota para criar e enviar email
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
fastify.post("/send-email", async (request: { body: { email: any; subject: any; body: any; attachment: any; }; }, reply: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; error?: unknown; }): any; new(): any; }; }; }) => {
  const { email, subject, body, attachment } = request.body;

  if (!email || !subject || !body || !attachment) {
    return reply.status(400).send({ message: "Dados inválidos para envio de email." });
  }

  try {
    await fastify.sendEmail({ email, subject, body, attachment });
    return reply.status(200).send({ message: "Email enviado com sucesso!" });
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ message: "Erro ao enviar email.", error });
  }
});

// Inicia o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3334, host: "0.0.0.0" });
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    fastify.log.info(`Servidor rodando em http://localhost:3334`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
