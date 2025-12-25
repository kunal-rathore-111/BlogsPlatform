import type { Response } from "express";

export function defaultReturn(res: Response) {
    res.json({ message: "Please see server logs" })
}