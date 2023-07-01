import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { EAppRoute } from './Core/enums';
import { JsonRouter } from './Routes/JsonRouter';

const port = process.env.PORT || 3030;

dotenv.config();

const app = express();
/* Middleware для парсинга request.body из blob в json формат для запросов */
app.use(express.json());
app.use(EAppRoute.JSON, JsonRouter);

// Папка со статикой static
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.listen(port, () => console.log(`listen started port ${port}`));
