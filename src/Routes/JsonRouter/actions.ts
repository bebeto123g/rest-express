import { Request, Response } from 'express';
import { EJsonEntity, JsonModel } from '../../Models/JsonModel';
import { IPost } from '../../Models/PostsModel';
import { ITodo } from '../../Models/TodosModel';
import { JsonActionRouteDecorator } from './decorators';
import { IActionResponse } from './interfaces';

export class JsonActions {
    private readonly models: Record<EJsonEntity, JsonModel<ITodo | IPost>>;
    private activeEntity: EJsonEntity | null;

    constructor() {
        this.models = {
            [EJsonEntity.TODOS]: new JsonModel<ITodo>(EJsonEntity.TODOS),
            [EJsonEntity.POSTS]: new JsonModel<IPost>(EJsonEntity.POSTS),
        };

        this.activeEntity = null;

        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.setActiveEntity = this.setActiveEntity.bind(this);
    }

    @JsonActionRouteDecorator
    public get(req: Request, _res: Response): IActionResponse {
        const { page = 1, limit = 100, search = '' } = req.query;
        return {
            data: this.model.get({
                page: Number(page),
                limit: Number(limit),
                search: search.toString(),
            }),
        };
    }

    @JsonActionRouteDecorator
    public getById(req: Request, _res: Response): IActionResponse {
        return { data: this.model.getById(Number(req.params.id)) };
    }

    @JsonActionRouteDecorator
    public create(req: Request, _res: Response): IActionResponse {
        return { data: this.model.create(req.body), status: 201 };
    }

    @JsonActionRouteDecorator
    public update(req: Request, _res: Response): IActionResponse {
        return { data: this.model.update(Number(req.params.id), req.body) };
    }

    @JsonActionRouteDecorator
    public delete(req: Request, _res: Response): IActionResponse {
        this.model.delete(Number(req.params.id));
        return {};
    }

    private setActiveEntity(req: Request) {
        this.activeEntity = req.params.json as EJsonEntity;
    }

    private get model() {
        if (!this.activeEntity) {
            throw new Error('dev error activeEntity get model');
        }

        const model = this.models[this.activeEntity];
        if (!model) {
            throw new Error(`not found json model ${this.activeEntity}`);
        }

        return model;
    }
}
