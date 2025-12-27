

import { z } from "zod";

const category = z.enum(['Entertainment', 'myLife', 'Technology', 'Fashion', 'Travel', 'Games', 'Jobs', 'Others']);



const addPostsSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10).optional(),
    fullDetail: z.string().min(50),
    imageUrl: z.string(),
    readTimeMints: z.number(),
    category: category,
    tags: z.array(z.string()),
});


export type addPostsTypes = z.infer<typeof addPostsSchema>

export function addPostsZodFunc(data: unknown) {
    return addPostsSchema.safeParse(data);
}