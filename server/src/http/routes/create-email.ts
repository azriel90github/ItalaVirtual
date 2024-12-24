const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { email, subject, body, attachment } = req.body;

  if (!email || !subject || !body || !attachment) {
    return res.status(400).json({ message: "Dados inválidos para envio de email." });
  }

  try {
    // Configuração do transporte de email
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com", // Substituir pelo servidor SMTP
      port: 587,
      secure: false,
      auth: {
        user: "seu-email@example.com", // Email de envio
        pass: "sua-senha",            // Senha do email
      },
    });

    // Configuração da mensagem
    const mailOptions = {
      from: '"Minha Loja" <seu-email@example.com>', // Nome e email do remetente
      to: email,                                   // Destinatário
      subject: subject,                            // Assunto do email
      text: body,                                  // Corpo do email em texto puro
      attachments: [
        {
          filename: attachment.filename,
          content: Buffer.from(attachment.content), // O conteúdo do anexo deve ser um buffer
          contentType: attachment.contentType,
        },
      ],
    };

    // Envio do email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    res.status(500).json({ message: "Erro ao enviar email.", error });
  }
});

const PORT = 3334;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
