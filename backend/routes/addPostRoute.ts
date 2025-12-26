
import express from "express";
import { addPostMiddleware } from "../middleware/addPostMiddleware";
import { addController } from "../controller/addController";
import { checkPasswordMiddleware } from "../middleware/checkPasswordMiddleware";

export const addPost = express();


addPost.post('/', checkPasswordMiddleware, addPostMiddleware, addController);