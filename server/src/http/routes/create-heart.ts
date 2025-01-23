import type { FastifyPluginAsync } from "fastify";
import { getProductsWithHearts } from "../../functions/send-heart";


export const getProductsRoute: FastifyPluginAsync = async (app) => {
  app.get('/products', async (request, reply) => {
    try {
      const products = await getProductsWithHearts();
      return reply.send(products);
    } catch (error) {
      return reply.status(500).send({ message: "Erro ao buscar produtos" });
    }
  });
};

