import { Request, Response } from 'express';
import { ResponseUtils } from '../../Core/Utils';
import { JsonActions } from './actions';
import { IActionResponse } from './interfaces';

/** Декоратор для методовов JsonActions, которые служат обработчиками роутов */
export function JsonActionRouteDecorator(
    originalMethod: (req: Request, res: Response) => IActionResponse,
    _context: any
) {
    function replacementMethod(this: JsonActions, req: Request, res: Response) {
        try {
            this.setActiveEntity(req);
            const { data, status } = originalMethod.call(this, req, res);
            ResponseUtils.sendSuccess({ res, data, status });
        } catch (error) {
            ResponseUtils.sendError({ res, error });
        }
    }

    return replacementMethod;
}
