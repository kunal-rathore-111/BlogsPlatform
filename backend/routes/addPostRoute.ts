
import express from "express";
import { addPostMiddleware } from "../middleware/addPostMiddleware";
import { addController } from "../controller/addController";

const addPost = express();


addPost.post('/add-post/:password', addPostMiddleware, addController);