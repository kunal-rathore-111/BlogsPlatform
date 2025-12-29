

import 'dotenv/config'; // import + use 
import helmet from 'helmet'; // prevent XSS etc attacks
import morgan from "morgan";
import cors from "cors";
import express from 'express';
import { fetchPosts } from './routes/fetchPostRoute.js';
import { addPost } from './routes/addPostRoute.js';
import { deletePost } from './routes/deletePostRoute.js';
import { updatePost } from './routes/updatePostRotue.js';

const app = express();
app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());

const frotendURL = process.env.Frontend_URL;

const origins = ['http://localhost:5173', frotendURL, 'https://portfolio-react-v1-71u4.vercel.app'];


app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true) // for postman and mobiles

        else if (origins.includes(origin)) return callback(null, true);

        else {
            return callback(new Error("Invalid origin"));
        }
    },
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
}));

const PORT = 3000;

app.use('/fetch-posts', fetchPosts);
app.use('/add-post', addPost);
app.use('/update-post', updatePost);
app.use('/delete-post', deletePost);


app.get('/', (req, res) => {
    res.json({ message: 'ON INITIAL ROUTE' });
})



app.listen(PORT, () => {
    console.log("Server running on PORT- ", PORT);
});

