import type { Response } from "express";

export function defaultReturn(res: Response) {
    res.json({ message: "Admin please see server logs" })
}