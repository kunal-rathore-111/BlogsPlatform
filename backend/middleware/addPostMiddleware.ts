import type { RequestHandler, Response } from "express";
import { defaultReturn } from "../utils/defaultMethods";
import { addPostsZodFunc } from "../validations/addZod";
import z from "zod";



export const addPostMiddleware: RequestHandler = (req, res, next) => {

    const password = req.params?.password;
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

    // zod input validation
    const addZodResult = addPostsZodFunc(req.body);
    if (!addZodResult.success) {
        console.error(z.flattenError(addZodResult.error));
        return defaultReturn(res);
    }
    next();
}