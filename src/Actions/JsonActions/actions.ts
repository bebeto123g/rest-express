import { Request, Response } from 'express';
import { EStatusCode } from '../../Core/enums';
import { EJsonEntity, JsonModel } from '../../Models/JsonModel';
import { IPost } from '../../Models/PostsModel';
import { ITodo } from '../../Models/TodosModel';

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

    public get(req: Request, res: Response) {
        try {
            this.setActiveEntity(req);
            const { page = 1, limit = 100, search = '' } = req.query;

            const data = this.model.get({
                page: Number(page),
                limit: Number(limit),
                search: search.toString(),
            });

            res.status(200).send({
                statusCode: EStatusCode.OK,
                statusDesc: null,
                data,
            });
        } catch (e) {
            JsonActions.sendError(res, e);
        }
    }

    public getById(req: Request, res: Response) {
        try {
            this.setActiveEntity(req);
            this.model.getById(Number(req.params.id));
        } catch (e) {
            JsonActions.sendError(res, e);
        }
    }

    public create(req: Request, res: Response) {
        try {
            this.setActiveEntity(req);
            this.model.create(req.body);
        } catch (e) {
            JsonActions.sendError(res, e);
        }
    }

    public update(req: Request, res: Response) {
        try {
            this.setActiveEntity(req);
            this.model.update(Number(req.params.id), req.body);
        } catch (e) {
            JsonActions.sendError(res, e);
        }
    }

    public delete(req: Request, res: Response) {
        try {
            this.setActiveEntity(req);
            this.model.delete(Number(req.params.id));
        } catch (e) {
            JsonActions.sendError(res, e);
        }
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

    private static sendError(res: Response, e: any) {
        res.status(400).send({
            statusCode: EStatusCode.NOT_FOUND_JSON,
            statusDesc: e?.message || 'Данные недоступны или не существуют',
            data: null,
        });
    }
}
