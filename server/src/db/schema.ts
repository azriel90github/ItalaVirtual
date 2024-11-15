import {
	pgTable,
	text,
	integer,
	timestamp,
} from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";

export const goods = pgTable("goods", {
	id: text("id").primaryKey().$defaultFn(() => createId()),
	title: text("title").notNull(),
	heart: integer("heart"),
	price: integer('price').notNull(), // Aqui o campo price será numérico (com casas decimais)
	description: text("description").notNull(),
	category: text('category').notNull(),  // Adicionando a coluna category
});

export const customerOrder = pgTable("customer_order", {
	id: text("id").primaryKey().$defaultFn(() => createId()),
	name: text().notNull(),
	number: text("number").notNull(),
	paymentMethod: text().notNull(),
	cityOrNeighborhood: text().notNull(),
	landmark: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});


