import { eq } from "drizzle-orm";
import { db } from "../drizzle/db.js";
import { postsTable } from "../drizzle/tables.js";



export async function deletePostFunc(id: string) {
    return await db.delete(postsTable).where(eq(postsTable.id, id));
}