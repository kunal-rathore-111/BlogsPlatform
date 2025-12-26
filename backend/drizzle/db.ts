import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    throw new Error("DATABASE_URL not found");
}

const pool = new Pool({
    connectionString: dbUrl,
});

export const db = drizzle({ client: pool });
