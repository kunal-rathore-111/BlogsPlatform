import type { RequestHandler } from "express";
import { fetchPostsFunc } from "../services/fetchPostsService";




export const fetchController: RequestHandler = (req, res) => {


    const posts = fetchPostsFunc();


    res.json({
        posts
    })
} 