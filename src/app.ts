import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { EJsonRoute, JsonActions } from './Actions/JsonActions';

dotenv.config();

const app = express();
/* Middleware для парсинга request.body из blob в json формат для запросов */
app.use(express.json());

const port = process.env.PORT || 3030;

const jsonActions = new JsonActions();

app.post(EJsonRoute.GET, jsonActions.get);
app.post(EJsonRoute.GET_BY_ID, jsonActions.getById);
app.post(EJsonRoute.CREATE, jsonActions.create);
app.put(EJsonRoute.UPDATE, jsonActions.update);
app.delete(EJsonRoute.DELETE, jsonActions.delete);

// Папка со статикой static
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.listen(port, () => console.log(`listen started port ${port}`));
