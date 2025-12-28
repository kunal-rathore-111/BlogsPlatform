
import express from "express";
import { addPostMiddleware } from "../middleware/addPostMiddleware.js";
import { addController } from "../controller/addController.js";
import { checkPasswordMiddleware } from "../middleware/checkPasswordMiddleware.js";
import { checkIdMiddleware } from "../middleware/checkIdMiddleware.js";

export const addPost = express();


addPost.post('/', checkPasswordMiddleware, checkIdMiddleware, addPostMiddleware, addController);