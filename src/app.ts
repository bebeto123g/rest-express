import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { sendJson } from './utils';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.post('/posts', sendJson);
app.post('/todos', sendJson);

// Папка со статикой static
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.listen(port, () => console.log('listen started port 3030'));
