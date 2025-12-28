


import express from "express";
import { checkPasswordMiddleware } from "../middleware/checkPasswordMiddleware.js";
import { deleteController } from "../controller/deleteController.js";
import { checkIdMiddleware } from "../middleware/checkIdMiddleware.js";

export const deletePost = express();


deletePost.delete('/:id', checkPasswordMiddleware, checkIdMiddleware, deleteController);