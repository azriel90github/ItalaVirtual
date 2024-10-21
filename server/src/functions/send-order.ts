import { db } from "../db";
import { customerOrder } from "../db/schema";

interface CreateOrderRequests {
  name: string
  number: number
  location: string
}

export async function createOrder({
  name,
  number,
  location,
} : CreateOrderRequests ) {
  const result = await db.insert(customerOrder).values({
    name,
    number,
    location,
  }).returning()

  const good = result[0]

  return {
    good,
  }
}