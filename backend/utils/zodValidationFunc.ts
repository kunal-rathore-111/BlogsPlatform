import type { ZodSchema } from "zod";

export function PostsValidationZodFunc(data: unknown, schema: ZodSchema) {
    return schema.safeParse(data);
}
