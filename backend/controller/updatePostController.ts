import type { RequestHandler } from "express";
import { updatePostFunc } from "../services/updatePostService";



export const updatePostController: RequestHandler = async (req, res) => {


    const id = req.params.id ?? '';
    try {
        await updatePostFunc(id, req.body);
        res.json({ message: "POST Updated" });
    } catch (err) {
        const message = 'Something wrong while deleting';

        console.error(message, err);
        res.json({ message });
    }

}