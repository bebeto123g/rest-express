import { Router } from 'express';
import { JsonActions } from './actions';
import { EJsonRoute } from './enums';

export const JsonRouter = Router();
const actions = new JsonActions();

JsonRouter.post(EJsonRoute.GET, actions.get);
JsonRouter.post(EJsonRoute.GET_BY_ID, actions.getById);
JsonRouter.post(EJsonRoute.CREATE, actions.create);
JsonRouter.put(EJsonRoute.UPDATE, actions.update);
JsonRouter.delete(EJsonRoute.DELETE, actions.delete);
