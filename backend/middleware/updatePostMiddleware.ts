import type { RequestHandler, Response } from "express";
import { defaultReturn } from "../utils/defaultMethods.js";
import { PostsValidationZodFunc } from "../utils/zodValidationFunc.js";
import z from "zod";
import { updatePostSchema } from "../validations/updateZod.js";


export const updatePostMiddleware: RequestHandler = (req, res, next) => {


    // zod input validation
    const updateZodResult = PostsValidationZodFunc(req.body, updatePostSchema);

    if (!updateZodResult.success) {
        console.error(z.flattenError(updateZodResult.error));
        return defaultReturn(res);
    }
    next();
}