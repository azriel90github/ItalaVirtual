import z from "zod";
import dotenv from "dotenv";

// Carregar variáveis do arquivo .env
dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  EMAIL_USER: z.string().email(), // Validar como um email válido
  EMAIL_PASS: z.string().min(1), // Garantir que não esteja vazio
});

export const env = envSchema.parse(process.env);