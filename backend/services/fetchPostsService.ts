import { db } from "../drizzle/db.js"
import { postsTable } from "../drizzle/tables.js"
import { desc } from "drizzle-orm"


// db function 
export const fetchPostsFunc = async () => {

    try {
        const data = await db.select().from(postsTable).orderBy(desc(postsTable.updated_at));
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}