import { IAlbum } from '../AlbumsModel';
import { IComment } from '../CommentsModel';
import { IPhoto } from '../PhotosModel';
import { IPost } from '../PostsModel';
import { ITodo } from '../TodosModel';
import { IUser } from '../UsersModel';

export type TJsonEntities = ITodo | IPost | IAlbum | IComment | IPhoto | IUser;
