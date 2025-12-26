import { db } from "../drizzle/db";
import { postsTable } from "../drizzle/tables";
import type { addPostsTypes } from "../validations/addZod";


export const addPostsFunc = async (data: addPostsTypes) => {
    // db function 
    await db.insert(postsTable).values(data);
}