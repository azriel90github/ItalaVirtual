import { db } from "../db";
import { customerOrder } from "../db/schema";

// Defina e exporte a interface
export interface CreateOrderRequests {
  name: string;
  number: number;
  flavors: number;
  payment: number;
  paymentMethod: string;
  cityOrNeighborhood: string;
  landmark: string;
}

export async function createOrder({
  name,
  number,
  flavors,
  payment,
  paymentMethod,
  cityOrNeighborhood,
  landmark,
}: CreateOrderRequests) {
  const result = await db.insert(customerOrder).values({
    name,
    number: String(number), // Converte number para string
    flavors: String(flavors), // Use flavors em vez de number
    payment: String(payment), // Use payment em vez de number
    paymentMethod,
    cityOrNeighborhood,
    landmark,
  }).returning();

  const order = result[0];

  return {
    order,
  };
}