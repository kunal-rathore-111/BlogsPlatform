import express from "express";
import { fetchController } from "../controller/fetchController.js";

export const fetchPosts = express();

fetchPosts.get('/', fetchController);