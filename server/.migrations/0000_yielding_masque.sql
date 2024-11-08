CREATE TABLE IF NOT EXISTS "goods" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"heart" integer,
	"price" numeric NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL
);
