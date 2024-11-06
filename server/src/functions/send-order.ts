import { db } from "../db";
import { customerOrder } from "../db/schema";

interface CreateOrderRequests {
  name: string
  number: number
  paymentMethod: string
  cityOrNeighborhood: string
  landmark: string
}

export async function createOrder({
  name,
  number,
  paymentMethod,
  cityOrNeighborhood,
  landmark,
} : CreateOrderRequests ) {
  const result = await db.insert(customerOrder).values({
    name,
    number,
    paymentMethod,
    cityOrNeighborhood,
    landmark,
  }).returning()

  const order = result[0]

  return {
    order,
  }
}