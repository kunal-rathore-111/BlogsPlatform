import z from "zod";
import { category } from "./addZod";


export const updatePostSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    fullDetail: z.string().min(50).optional(),
    imageUrl: z.string().optional(),
    readTimeMints: z.number().optional(),
    category: category.optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().min(5).optional(),
})


export type updatePostTypes = z.infer<typeof updatePostSchema>;
