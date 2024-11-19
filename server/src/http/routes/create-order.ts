//import { z } from 'zod';
import type { FastifyPluginAsync } from 'fastify';
import { createOrder } from '../../functions/send-order';

export const createSendOrder: FastifyPluginAsync = async (app) => {
  app.post(
    '/order',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'number', 'paymentMethod', 'cityOrNeighborhood', 'landmark'],
          properties: {
            name: { type: 'string' },
            number: { type: 'number' },
            flavors: { type: 'number' },
            payment: { type: 'number' },
            paymentMethod: { type: 'string' },
            cityOrNeighborhood: { type: 'string' },
            landmark: { type: 'string' }
          }
        }
      }
    },
    async (request, reply) => {
      const { name, number, flavors, payment, paymentMethod, cityOrNeighborhood, landmark } = request.body as {
        name: string;
        number: number;
        flavors: number;
        payment: number;
        paymentMethod: string;
        cityOrNeighborhood: string;
        landmark: string;
      };

      const result = await createOrder({
        name,
        number,
        flavors,
        payment,
        paymentMethod,
        cityOrNeighborhood,
        landmark,
      });

      return reply.status(201).send(result);
    }
  );
};