import type { RequestHandler } from "express";
import { defaultReturn } from "../utils/defaultMethods";



export const checkPasswordMiddleware: RequestHandler = (req, res, next) => {


    const password = req.headers['password'];
    if (!password) {
        console.error("ENTER PASSWORD");
        return defaultReturn(res);
    }

    const addPostPassword = process.env.ADD_POST_PASSWORD;

    if (!addPostPassword) {
        console.error("PASSWORD IS NOT PRESENT IN .ENV");

        return defaultReturn(res);

    }
    if (password !== process.env.ADD_POST_PASSWORD) {
        console.error("INCORRECT PASSWORD");
        return defaultReturn(res);
    }
    next();
}