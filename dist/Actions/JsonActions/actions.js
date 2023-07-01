"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonActions = void 0;
const enums_1 = require("../../Core/enums");
const JsonModel_1 = require("../../Models/JsonModel");
class JsonActions {
    constructor() {
        this.models = {
            [JsonModel_1.EJsonEntity.TODOS]: new JsonModel_1.JsonModel(JsonModel_1.EJsonEntity.TODOS),
            [JsonModel_1.EJsonEntity.POSTS]: new JsonModel_1.JsonModel(JsonModel_1.EJsonEntity.POSTS),
        };
        this.activeEntity = null;
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.setActiveEntity = this.setActiveEntity.bind(this);
    }
    get(req, res) {
        try {
            this.setActiveEntity(req);
            const { page = 1, limit = 100, search = '' } = req.query;
            const data = this.model.get({
                page: Number(page),
                limit: Number(limit),
                search: search.toString(),
            });
            res.status(200).send({
                statusCode: enums_1.EStatusCode.OK,
                statusDesc: null,
                data,
            });
        }
        catch (e) {
            JsonActions.sendError(res, e);
        }
    }
    getById(req, res) {
        try {
            this.setActiveEntity(req);
            this.model.getById(Number(req.params.id));
        }
        catch (e) {
            JsonActions.sendError(res, e);
        }
    }
    create(req, res) {
        try {
            this.setActiveEntity(req);
            this.model.create(req.body);
        }
        catch (e) {
            JsonActions.sendError(res, e);
        }
    }
    update(req, res) {
        try {
            this.setActiveEntity(req);
            this.model.update(Number(req.params.id), req.body);
        }
        catch (e) {
            JsonActions.sendError(res, e);
        }
    }
    delete(req, res) {
        try {
            this.setActiveEntity(req);
            this.model.delete(Number(req.params.id));
        }
        catch (e) {
            JsonActions.sendError(res, e);
        }
    }
    setActiveEntity(req) {
        this.activeEntity = req.params.json;
    }
    get model() {
        if (!this.activeEntity) {
            throw new Error('dev error activeEntity get model');
        }
        const model = this.models[this.activeEntity];
        if (!model) {
            throw new Error(`not found json model ${this.activeEntity}`);
        }
        return model;
    }
    static sendError(res, e) {
        res.status(400).send({
            statusCode: enums_1.EStatusCode.NOT_FOUND_JSON,
            statusDesc: (e === null || e === void 0 ? void 0 : e.message) || 'Данные недоступны или не существуют',
            data: null,
        });
    }
}
exports.JsonActions = JsonActions;
