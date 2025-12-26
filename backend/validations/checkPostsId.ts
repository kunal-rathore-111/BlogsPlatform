import z from "zod";

const idSchema = z.object({
    id: z.string().uuid()
})
export function checkID(id: unknown) {
    return idSchema.safeParse(id);
}