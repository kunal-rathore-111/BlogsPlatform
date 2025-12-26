import express from "express";
import { fetchController } from "../controller/fetchController";

export const fetchPosts = express();

fetchPosts.get('/', fetchController);