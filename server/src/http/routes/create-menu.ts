import type { FastifyPluginAsync } from "fastify";
import { goods } from "../../db/schema";
import { db } from "../../db";

export const getProducts: FastifyPluginAsync = async (app) => {
  app.get('/products', async (request, reply) => {
    const products = await db.select().from(goods);
    return reply.send(products);
  });
};
