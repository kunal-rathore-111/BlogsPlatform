import type { RequestHandler } from "express";
import { fetchPostsFunc } from "../services/fetchPostsService";




export const fetchController: RequestHandler = async (req, res) => {

    const posts = await fetchPostsFunc();
    if (posts != null) return res.json({
        posts
    })

    else return res.json({
        message: "fetch failed"
    })
} 