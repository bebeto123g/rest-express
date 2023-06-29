"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJson = void 0;
const path_1 = __importDefault(require("path"));
const sendJson = (req, res) => {
    console.log(req.path);
    const name = req.path.replace(/\W/, '');
    res.status(200).sendFile(path_1.default.resolve(__dirname, '../static/json', `${name}.json`));
};
exports.sendJson = sendJson;
