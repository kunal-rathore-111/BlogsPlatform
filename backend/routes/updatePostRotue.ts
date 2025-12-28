
import express from "express";
import { checkPasswordMiddleware } from "../middleware/checkPasswordMiddleware";
import { checkIdMiddleware } from "../middleware/checkIdMiddleware";
import { updatePostController } from "../controller/updatePostController";
import { updatePostMiddleware } from "../middleware/updatePostMiddleware";

export const updatePost = express();


updatePost.put('/:id', checkPasswordMiddleware, checkIdMiddleware, updatePostMiddleware, updatePostController);