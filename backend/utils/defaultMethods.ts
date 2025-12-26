import type { Response } from "express";

export function defaultReturn(res: Response) {
    return res.status(500).json({ message: "Please see server logs" });
}