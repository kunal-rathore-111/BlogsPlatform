CREATE TYPE "public"."categoryEnum" AS ENUM('entertainment', 'myLife', 'technology', 'fashion', 'travel', 'games', 'jobs', 'others');--> statement-breakpoint
CREATE TABLE "postsTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"imageUrl" text,
	"readTimeMints" integer NOT NULL,
	"category" "categoryEnum" DEFAULT 'others' NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
