
import express from "express";
import { checkPasswordMiddleware } from "../middleware/checkPasswordMiddleware.js";
import { checkIdMiddleware } from "../middleware/checkIdMiddleware.js";
import { updatePostController } from "../controller/updatePostController.js";
import { updatePostMiddleware } from "../middleware/updatePostMiddleware.js";

export const updatePost = express();


updatePost.put('/:id', checkPasswordMiddleware, checkIdMiddleware, updatePostMiddleware, updatePostController);