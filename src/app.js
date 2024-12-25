import express from 'express';
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: process.env.USER_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
)

app.use(express.json({ limit: '80kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

export default app;