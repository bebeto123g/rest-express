import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { addItemToJson, sendJson } from './utils';

dotenv.config();

const app = express();
/* Middleware для парсинга request.body из blob в json формат для запросов */
app.use(express.json())

const port = process.env.PORT || 3030;

app.post('/:json', sendJson);
app.post('/:json/create', addItemToJson);

// Папка со статикой static
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.listen(port, () => console.log('listen started port 3030'));
