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
  
};