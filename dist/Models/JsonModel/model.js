"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonModel = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class JsonModel {
    constructor(entity) {
        this.entity = entity;
    }
    /** Загружаем элементы по пагинации */
    get({ page = 1, limit = 100, search = '' }) {
        let jsonData = this.getJson();
        if (search) {
            jsonData = jsonData.filter(({ title }) => title === null || title === void 0 ? void 0 : title.toLowerCase().includes(search.toLowerCase()));
        }
        const start = page === 1 ? 0 : page * limit - 1;
        return jsonData.splice(start, limit);
    }
    /** Загружаем элемент по id */
    getById(id) {
        const element = this.getJson().find((el) => el.id === id);
        if (!element) {
            throw new Error(`element by id=${id} not found`);
        }
        return element;
    }
    /** Создаем новый элемент */
    create(element) {
        if (!element) {
            throw new Error(`element create body not found`);
        }
        const item = Object.assign(Object.assign({}, element), { id: Date.now() });
        // тут что-то типа валидации, но нужн будет разделять модели для каждой сущности, но мне лень
        this.setJson([item, ...this.getJson()]);
        return item;
    }
    /** Изменяем элемент id */
    update(id, updateData) {
        if (!updateData) {
            throw new Error(`element updateData body not found`);
        }
        const jsonData = this.getJson();
        const index = jsonData.findIndex((el) => el.id === id);
        if (index === -1) {
            throw new Error(`element by id=${id} not found`);
        }
        // тут что-то типа валидации
        jsonData[index] = Object.assign(Object.assign({}, jsonData[index]), updateData);
        this.setJson(jsonData);
        return jsonData[index];
    }
    /** Удаляем элемент по id */
    delete(id) {
        const jsonData = this.getJson().filter((el) => el.id !== id);
        this.setJson(jsonData);
    }
    /** Загружаем JSON */
    getJson() {
        const dataPath = path_1.default.resolve(__dirname, '../../static/json', `${this.entity}.json`);
        const json = fs_1.default.readFileSync(dataPath).toString();
        if (!json) {
            throw new Error(`${this.entity} json not found`);
        }
        return JSON.parse(json);
    }
    /** Записываем JSON */
    setJson(jsonData) {
        const dataPath = path_1.default.resolve(__dirname, '../../static/json', `${this.entity}.json`);
        fs_1.default.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));
    }
}
exports.JsonModel = JsonModel;
