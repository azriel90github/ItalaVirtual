import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createOrder } from "../functions/send-order";
import z from "zod";

const app = fastify();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.post('/order', async (request) => {
	const createOrderSchema = z.object({
		name: z.string(),
		number: z.number().int().min(9),
		location: z.string().min(10).max(15),
	})

	const body = createOrderSchema.parse(request.body)

	await createOrder({
		name: body.name,
		number: body.number,
		location: body.location,
	})
})

app
	.listen({
		port: 3334,
	})
	.then(() => {
		console.log("HTTP server running!");
	});