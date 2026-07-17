CREATE TABLE "fevorits" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_ID" text NOT NULL,
	"reciope_id" integer NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"cook_time" text,
	"servings" text,
	"create_at" timestamp DEFAULT now()
);
