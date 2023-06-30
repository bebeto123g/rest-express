"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("./utils");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.post('/json/:json', utils_1.sendJson);
// Папка со статикой static
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'static')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, 'static', 'index.html'));
});
app.listen(port, () => console.log('listen started port 3030'));
