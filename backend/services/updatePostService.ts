



import { eq } from "drizzle-orm";
import { db } from "../drizzle/db.js";
import { postsTable } from "../drizzle/tables.js";
import type { updatePostTypes } from "../validations/updateZod.js";



export async function updatePostFunc(id: string, data: updatePostTypes) {
    return await db.update(postsTable).set(data).where(eq(postsTable.id, id))
}