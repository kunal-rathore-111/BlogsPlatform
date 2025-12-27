import { db } from "../drizzle/db.js";
import { postsTable } from "../drizzle/tables.js";
import type { addPostsTypes } from "../validations/addZod.js";


export const addPostsFunc = async (data: addPostsTypes) => {
    // db function 
    await db.insert(postsTable).values(data);
}