import {
	pgTable,
	text,
	timestamp,
	numeric,
} from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";
//import { number } from "zod";

export const goods = pgTable("goods", {
	id: text("id").primaryKey().$defaultFn(() => createId()),
	title: text("title").notNull(),
	price: numeric("price").notNull(), // Aqui o campo price será numérico (com casas decimais)
	description: text("description").notNull(),
});

export const customerOrder = pgTable("customer_order", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  number: text("number").notNull(),
  flavors: text("flavors").notNull(),
  payment: text("payment").notNull(),
  paymentMethod: text("payment_method").notNull(),
  cityOrNeighborhood: text("city_or_neighborhood").notNull(),
  landmark: text("landmark").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});


