import type { RequestHandler } from "express";
import { deletePostFunc } from "../services/deletePostService.js";
import { checkID } from "../validations/checkPostsId.js";


export const deleteController: RequestHandler = async (req, res) => {

    const id = req.params.id;
    if (!id) {
        return res.json({ message: "POST id not found" })
    }
    const checkIdResult = checkID(id);
    if (!checkIdResult) {
        return res.json({ message: "ID type is invalid" })
    }

    try {
        await deletePostFunc(id);
        res.json({ message: "POST Deleted" });
    } catch (err) {
        const message = 'Something wrong while deleting';

        console.error(message, err);
        res.json({ message });
    }

}