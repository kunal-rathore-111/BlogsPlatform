import type { RequestHandler } from "express";
import { defaultReturn } from "../utils/defaultMethods";


export const addController: RequestHandler = (req, res) => {

    try {

        // db storing function

    } catch (error) {

        console.error(error);
        defaultReturn(res);
    }

    return res.json({ message: "Content added successfully" })
}