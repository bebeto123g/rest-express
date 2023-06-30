import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { sendJson } from './utils';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.post('/json/:json', sendJson);

// Папка со статикой static
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.listen(port, () => console.log('listen started port 3030'));
