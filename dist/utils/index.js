"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItemToJson = exports.sendJson = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const enums_1 = require("../enums");
/** Метод для отправки массивов из static/json, добавлен поиск элементов */
const sendJson = (req, res) => {
    const dataPath = path_1.default.resolve(__dirname, '../static/json', `${req.params.json}.json`);
    fs_1.default.readFile(dataPath, 'utf8', (err, json) => {
        if (!json || err) {
            res.status(400).send({
                statusCode: enums_1.EStatusCode.NOT_FOUND_JSON,
                statusDesc: 'Данные недоступны или не существуют',
                data: null,
            });
            return;
        }
        let data = JSON.parse(json);
        const searchQuery = req.query.search;
        if (searchQuery) {
            data = data.filter(({ title }) => title === null || title === void 0 ? void 0 : title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        res.status(200).send({
            statusCode: enums_1.EStatusCode.OK,
            statusDesc: null,
            data,
        });
    });
};
exports.sendJson = sendJson;
/** Пока абстрактные методы для работы с имеющимися json */
const addItemToJson = (req, res) => {
    const entity = req.params.json;
    const dataPath = path_1.default.resolve(__dirname, '../static/json', `${entity}.json`);
    let json = fs_1.default.readFileSync(dataPath);
    if (!json) {
        res.status(400).send({
            statusCode: enums_1.EStatusCode.NOT_FOUND_JSON,
            statusDesc: 'Данные недоступны или не существуют',
            data: null,
        });
    }
    let item;
    if (entity === enums_1.EJsonEntity.POSTS) {
        item = {
            id: Date.now(),
            title: req.body.title || '',
            text: req.body.text || '',
            createDate: new Date(),
        };
    }
    else if (entity === enums_1.EJsonEntity.TODOS) {
        item = {
            id: Date.now(),
            title: req.body.title || '',
            completed: false,
        };
    }
    const jsonData = JSON.parse(json);
    jsonData.unshift(item);
    fs_1.default.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));
    res.status(200).send({
        statusCode: enums_1.EStatusCode.OK,
        statusDesc: null,
        data: item,
    });
};
exports.addItemToJson = addItemToJson;
