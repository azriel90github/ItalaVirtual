import { db } from "../db";
import { customerOrder } from "../db/schema";

interface CreateGoalRequest {
	name: string;
	number: number;
	location: string;
}

export async function sendOrder({ name, number, location }: CreateGoalRequest) {
	const result = await db
		.insert(customerOrder)
		.values({
			name,
			number,
			location,
		})
		.returning();
}
