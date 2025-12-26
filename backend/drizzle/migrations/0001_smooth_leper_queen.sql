ALTER TABLE "postsTable" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "postsTable" ADD COLUMN "fullDetail" text NOT NULL;