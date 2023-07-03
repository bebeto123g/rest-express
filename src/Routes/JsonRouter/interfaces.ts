import { IAlbum } from '../../Models/AlbumsModel';
import { IComment } from '../../Models/CommentsModel';
import { IPhoto } from '../../Models/PhotosModel';
import { IPost } from '../../Models/PostsModel';
import { ITodo } from '../../Models/TodosModel';
import { IUser } from '../../Models/UsersModel';

export interface IActionResponse {
    status?: number;
    data?: unknown;
}

export type TJsonEntities = ITodo | IPost | IAlbum | IComment | IPhoto | IUser;
