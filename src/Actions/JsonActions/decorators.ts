import { Request, Response } from 'express';
import { IActionResponse } from '../../Core/interfaces';
import { ResponseUtils } from '../../Core/Utils';
import { JsonActions } from './actions';

/** Декоратор для методовов JsonActions, которые служат обработчиками роутов */
export function JsonActionRouteDecorator(
    originalMethod: (req: Request, res: Response) => IActionResponse | void,
    _context: any
) {
    function replacementMethod(this: JsonActions, req: Request, res: Response) {
        try {
            this.setActiveEntity(req);
            const originalData = originalMethod.call(this, req, res) || null;

            if (!originalData) {
                ResponseUtils.sendError({ res, status: 500, error: { message: 'Неопознанная оказия! :(' } });
                return;
            }

            const { data, status } = originalData;
            ResponseUtils.sendSuccess({ res, data, status });
        } catch (error) {
            ResponseUtils.sendError({ res, error });
        }
    }

    return replacementMethod;
}
