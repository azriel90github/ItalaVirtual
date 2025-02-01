import z from "zod";

// Define o esquema para as variáveis de ambiente
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
});

// Valida as variáveis de ambiente
export const env = envSchema.parse(process.env);

