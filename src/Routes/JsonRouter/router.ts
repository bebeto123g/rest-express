import { Router } from 'express';
import { JsonActions } from '../../Actions/JsonActions';
import { EJsonRoute } from './enums';

export const JsonRouter = Router();
const actions = new JsonActions();

JsonRouter.get(EJsonRoute.GET, actions.get);
JsonRouter.get(EJsonRoute.GET_BY_ID, actions.getById);
JsonRouter.post(EJsonRoute.CREATE, actions.create);
JsonRouter.put(EJsonRoute.UPDATE, actions.update);
JsonRouter.delete(EJsonRoute.DELETE, actions.delete);
