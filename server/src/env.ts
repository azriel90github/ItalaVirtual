import z from "zod";
import dotenv from "dotenv";

dotenv.config();
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  EMAIL_USER: z.string().email(), // Validação para e-mail
  EMAIL_PASS: z.string(), // Validação para senha (simples string)
});

export const env = envSchema.parse(process.env);
//     await app.listen(5173);