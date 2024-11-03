import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createOrder } from "../functions/send-order";
import z from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

//Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.post(
	"/order",
	{
		schema: {
			body: z.object({
				name: z.string(),
				number: z.number().int().min(9),
				paymentMethod: z.string(),
				location: z.string().min(10).max(15),
			}),
		},
	},
	async (request) => {
		const { name, number, location, paymentMethod } = request.body;

		await createOrder({
			name,
			number,
			paymentMethod,
			location,
		});
	},
);

app
	.listen({
		port: 3334,
	})
	.then(() => {
		console.log("HTTP server running!");
	});