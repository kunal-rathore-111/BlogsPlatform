import type { RequestHandler, Response } from "express";
import { defaultReturn } from "../utils/defaultMethods.js";
import { addPostsSchema } from "../validations/addZod.js";
import { PostsValidationZodFunc } from "../utils/zodValidationFunc.js";
import z from "zod";


export const addPostMiddleware: RequestHandler = (req, res, next) => {


    // zod input validation
    const addZodResult = PostsValidationZodFunc(req.body, addPostsSchema);

    if (!addZodResult.success) {
        console.error(z.flattenError(addZodResult.error));
        return defaultReturn(res);
    }
    next();
}