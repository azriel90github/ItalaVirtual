import z from "zod";

// Define o esquema para as variáveis de ambiente
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SENDGRID_API_KEY: z.string(),
  EMAIL_FROM: z.string().email(),
});

// Valida as variáveis de ambiente
export const env = envSchema.parse(process.env);

