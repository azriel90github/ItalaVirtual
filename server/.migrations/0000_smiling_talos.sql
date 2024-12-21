CREATE TABLE IF NOT EXISTS "customer_order" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"number" text NOT NULL,
	"flavors" text NOT NULL,
	"payment" text NOT NULL,
	"payment_method" text NOT NULL,
	"city_or_neighborhood" text NOT NULL,
	"landmark" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "goods" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"price" numeric NOT NULL,
	"heart" integer DEFAULT 0 NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL
);
