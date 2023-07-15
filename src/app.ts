import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { EAppRoute } from './Core/enums';
import { exampleLoggerMiddleware } from './Core/middleware';
import { ResponseUtils } from './Core/Utils';
import { JsonRouter } from './Routes/JsonRouter';

const port = process.env.PORT ?? 3030;

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'static'));

/** Middlewares */
/* Тестовый */
app.use(exampleLoggerMiddleware);
/* Для парсинга request.body из blob в json формат для запросов */
app.use(express.json());

app.get('/download/:pathname/:filename', (req, res) => {
    const { filename = '', pathname = '' } = req.params;

    if (!filename || !pathname) {
        ResponseUtils.sendError({ res, error: { message: 'Файл не найден' } });
    }
    res.download(path.resolve(__dirname, 'static', pathname, filename));
});

/** Роуты */
app.use(EAppRoute.JSON, JsonRouter);

// Папка со статикой static
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('*', (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log(`listen started port ${port}`));
