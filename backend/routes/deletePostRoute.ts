


import express from "express";
import { checkPasswordMiddleware } from "../middleware/checkPasswordMiddleware";
import { deleteController } from "../controller/deleteController";

export const deletePost = express();


deletePost.delete('/:id', checkPasswordMiddleware, deleteController);