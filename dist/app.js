"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const JsonActions_1 = require("./Actions/JsonActions");
dotenv_1.default.config();
const app = (0, express_1.default)();
/* Middleware для парсинга request.body из blob в json формат для запросов */
app.use(express_1.default.json());
const port = process.env.PORT || 3030;
const jsonActions = new JsonActions_1.JsonActions();
app.post(JsonActions_1.EJsonRoute.GET, jsonActions.get);
app.post(JsonActions_1.EJsonRoute.GET_BY_ID, jsonActions.getById);
app.post(JsonActions_1.EJsonRoute.CREATE, jsonActions.create);
app.put(JsonActions_1.EJsonRoute.UPDATE, jsonActions.update);
app.delete(JsonActions_1.EJsonRoute.DELETE, jsonActions.delete);
// Папка со статикой static
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'static')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, 'static', 'index.html'));
});
app.listen(port, () => console.log(`listen started port ${port}`));
