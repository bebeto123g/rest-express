import { Request, Response } from 'express';
import { IActionResponse } from '../../Core/interfaces';
import { EJsonEntity, JSON_MODEL_LIST, JsonModel, TJsonEntities } from '../../Models/JsonModel';
import { JsonActionRouteDecorator } from './decorators';

type TModelsList = Record<EJsonEntity, JsonModel<TJsonEntities>>;

export class JsonActions {
    private readonly models: TModelsList;
    private activeEntity: EJsonEntity | null;

    constructor() {
        this.models = JsonActions.createModels();
        this.activeEntity = null;

        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.setActiveEntity = this.setActiveEntity.bind(this);
    }

    @JsonActionRouteDecorator
    public get(req: Request, _res: Response): IActionResponse | void {
        const { page = 1, limit = 100, search = '' } = req.query;
        return {
            status: 200,
            data: this.model.get({
                page: Number(page),
                limit: Number(limit),
                search: search.toString(),
            }),
        };
    }

    @JsonActionRouteDecorator
    public getById(req: Request, _res: Response): IActionResponse | void {
        return { status: 200, data: this.model.getById(Number(req.params.id)) };
    }

    @JsonActionRouteDecorator
    public create(req: Request, _res: Response): IActionResponse | void {
        return { status: 201, data: this.model.create(req.body) };
    }

    @JsonActionRouteDecorator
    public update(req: Request, _res: Response): IActionResponse | void {
        return { status: 200, data: this.model.update(Number(req.params.id), req.body) };
    }

    @JsonActionRouteDecorator
    public delete(req: Request, _res: Response): IActionResponse | void {
        this.model.delete(Number(req.params.id));
        return { status: 200 };
    }

    public setActiveEntity(req: Request): void {
        this.activeEntity = req.params.json as EJsonEntity;
    }

    private get model(): JsonModel<TJsonEntities> {
        if (!this.activeEntity) {
            throw new Error('dev error activeEntity get model');
        }

        const model = this.models[this.activeEntity];
        if (!model) {
            throw new Error(`not found json model ${this.activeEntity}`);
        }

        return model;
    }

    private static createModels(): TModelsList {
        return JSON_MODEL_LIST.reduce(
            (acc, modelKey) => ({ ...acc, [modelKey]: new JsonModel<TJsonEntities>(modelKey) }),
            {} as TModelsList
        );
    }
}
