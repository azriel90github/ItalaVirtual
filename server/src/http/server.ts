import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createSendOrder } from "./routes/create-order";
//import { createOrder } from "../functions/send-order";
//import z from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

//Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createSendOrder)

app
	.listen({
		port: 3334,
	})
	.then(() => {
		console.log("HTTP server running!");
	});