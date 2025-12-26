import { db } from "../drizzle/db"
import { postsTable } from "../drizzle/tables"


// db function 
export const fetchPostsFunc = async () => {

    try {
        const data = await db.select().from(postsTable);
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}