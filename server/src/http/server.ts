import fastify from "fastify";
import { createOrder } from "../functions/send-order";
import z from "zod";

const app = fastify();

app.post('/goods', async (request) => {
	const createOrderSchema = z.object({
		name: z.string(),
		number: z.number().int().min(9).max(9),
		location: z.string().min(10).max(15)
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