

import { z } from "zod";

const category = z.enum(['entertainment', 'myLife', 'technology', 'fashion', 'travel', 'games', 'jobs', 'others']);



const addPostsSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    imageUrl: z.string(),
    readTimeMints: z.number(),
    category: category,
    tags: z.array(z.string()),
});


export type addPostsTypes = z.infer<typeof addPostsSchema>

export function addPostsZodFunc(data: unknown) {
    return addPostsSchema.safeParse(data);
}