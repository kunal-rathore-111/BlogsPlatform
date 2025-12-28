import type { RequestHandler } from "express";
import { checkID } from "../validations/checkPostsId.js";


export const checkIdMiddleware: RequestHandler = (req, res, next) => {

    const id = req.params.id;
    if (!id) {
        return res.json({ message: "POST id not found" })
    }
    const checkIdResult = checkID(id);
    if (!checkIdResult) {
        return res.json({ message: "ID type is invalid" })
    }

    next();
}