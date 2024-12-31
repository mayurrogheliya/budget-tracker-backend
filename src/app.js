import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes.js'
import cookieParser from 'cookie-parser';

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
)

app.use(express.json({ limit: '80kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1', routes);

app.get("/", (req, res) => {
    res.send("Hello from budget tracker!");
});

export default app;