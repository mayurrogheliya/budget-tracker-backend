import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes.js'

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
)

app.use(express.json({ limit: '80kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1', routes);

export default app;