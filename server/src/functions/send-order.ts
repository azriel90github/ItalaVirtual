import { db } from "../db";
import { customerOrder } from "../db/schema";

interface CreateOrderRequests {
  name: string
  number: number
  paymentMethod: string
  location: string
}

export async function createOrder({
  name,
  number,
  paymentMethod,
  location,
} : CreateOrderRequests ) {
  const result = await db.insert(customerOrder).values({
    name,
    number,
    paymentMethod,
    location,
  }).returning()

  const good = result[0]

  return {
    good,
  }
}