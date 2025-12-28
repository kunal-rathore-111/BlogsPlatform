

import { z } from "zod";

//sharing with the updateZod
export const category = z.enum(['Entertainment', 'myLife', 'Technology', 'Fashion', 'Travel', 'Games', 'Jobs', 'Others']);


export const addPostsSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10).optional(),
    author: z.string().min(5).optional(),
    fullDetail: z.string().min(50),
    imageUrl: z.string(),
    readTimeMints: z.number(),
    category: category,
    tags: z.array(z.string()),
});


export type addPostsTypes = z.infer<typeof addPostsSchema>

