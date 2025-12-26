import type { RequestHandler } from "express";
import { defaultReturn } from "../utils/defaultMethods";
import { addPostsFunc } from "../services/addPostService";


export const addController: RequestHandler = async (req, res) => {

    try {
        // db storing function
        await addPostsFunc(req.body);
        return res.status(201).json({ message: "Content added successfully" })
    } catch (error) {

        console.error(error);
        return defaultReturn(res);
    }


}