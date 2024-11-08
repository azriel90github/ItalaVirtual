CREATE TABLE IF NOT EXISTS "customer_order" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"number" numeric NOT NULL,
	"location" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
