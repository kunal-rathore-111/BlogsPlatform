

import 'dotenv/config'; // import + use 
import helmet from 'helmet'; // prevent XSS etc attacks
import morgan from "morgan";

import express from 'express';
import { fetchPosts } from './routes/fetchPostRoute';

const app = express();
app.use(helmet());
app.use(morgan('dev'));

const PORT = 3000;


app.get('/', (req, res) => {
    res.json({ message: 'ON INITIAL ROUTE' });
})

app.get('/fetch-posts', fetchPosts);


app.listen(PORT, () => {
    console.log("Server running on PORT- ", PORT);
});

