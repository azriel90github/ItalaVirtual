import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createOrder } from '../../functions/send-order';

export const createSendOrder: FastifyPluginAsyncZod = async ( app ) => {
  app.post(
    "/order",
    {
      schema: {
        body: z.object({
          name: z.string(),
          number: z.number().int().min(9),
          paymentMethod: z.string(),
          cityOrNeighborhood: z.string().min(10).max(25),
          landmark: z.string().min(10).max(25),
        }),
      },
    },
    async (request) => {
      const { name, number, paymentMethod, cityOrNeighborhood, landmark } = request.body;
  
      await createOrder({
        name,
        number,
        paymentMethod,
        cityOrNeighborhood,
        landmark,
      });
    },
  );
  
};