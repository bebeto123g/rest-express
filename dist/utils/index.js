"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJson = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const enums_1 = require("../enums");
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
