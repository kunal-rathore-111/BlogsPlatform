
import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    throw new Error("DATABASE_URL not found");
}

export default defineConfig({
    dialect: "postgresql",
    schema: "./drizzle/tables.ts",
    out: "./drizzle/migrations",
    dbCredentials: {
        url: dbUrl,
    },
});