import fastify from "fastify";

const app = fastify();

app
	.listen({
		port: 3334,
	})
	.then(() => {
		console.log("HTTP server running!");
	});