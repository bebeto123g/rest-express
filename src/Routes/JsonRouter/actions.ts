import { Request, Response } from 'express';
import { IAlbum } from '../../Models/AlbumsModel';
import { IComment } from '../../Models/CommentsModel';
import { EJsonEntity, JsonModel } from '../../Models/JsonModel';
import { IPhoto } from '../../Models/PhotosModel';
import { IPost } from '../../Models/PostsModel';
import { ITodo } from '../../Models/TodosModel';
import { IUser } from '../../Models/UsersModel';
import { JsonActionRouteDecorator } from './decorators';
import { IActionResponse, TJsonEntities } from './interfaces';

export class JsonActions {
    private readonly models: Record<EJsonEntity, JsonModel<TJsonEntities>>;
    private activeEntity: EJsonEntity | null;

    constructor() {
        this.models = {
            [EJsonEntity.TODOS]: new JsonModel<ITodo>(EJsonEntity.TODOS),
            [EJsonEntity.POSTS]: new JsonModel<IPost>(EJsonEntity.POSTS),
            [EJsonEntity.ALBUMS]: new JsonModel<IAlbum>(EJsonEntity.ALBUMS),
            [EJsonEntity.COMMENTS]: new JsonModel<IComment>(EJsonEntity.COMMENTS),
            [EJsonEntity.PHOTOS]: new JsonModel<IPhoto>(EJsonEntity.PHOTOS),
            [EJsonEntity.USERS]: new JsonModel<IUser>(EJsonEntity.USERS),
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
            status: 200,
            data: this.model.get({
                page: Number(page),
                limit: Number(limit),
                search: search.toString(),
            }),
        };
    }

    @JsonActionRouteDecorator
    public getById(req: Request, _res: Response): IActionResponse {
        return { status: 200, data: this.model.getById(Number(req.params.id)) };
    }

    @JsonActionRouteDecorator
    public create(req: Request, _res: Response): IActionResponse {
        return { status: 201, data: this.model.create(req.body) };
    }

    @JsonActionRouteDecorator
    public update(req: Request, _res: Response): IActionResponse {
        return { status: 200, data: this.model.update(Number(req.params.id), req.body) };
    }

    @JsonActionRouteDecorator
    public delete(req: Request, _res: Response): IActionResponse {
        this.model.delete(Number(req.params.id));
        return { status: 200 };
    }

    public setActiveEntity(req: Request) {
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
