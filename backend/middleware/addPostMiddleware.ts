import type { RequestHandler, Response } from "express";
import { defaultReturn } from "../utils/defaultMethods";
import { addPostsZodFunc } from "../validations/addZod";
import z from "zod";



export const addPostMiddleware: RequestHandler = (req, res, next) => {


    // zod input validation
    const addZodResult = addPostsZodFunc(req.body);
    if (!addZodResult.success) {
        console.error(z.flattenError(addZodResult.error));
        return defaultReturn(res);
    }
    next();
}