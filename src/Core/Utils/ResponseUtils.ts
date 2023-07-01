import { Response } from 'express';
import { EStatusCode } from '../enums';

export class ResponseUtils {
    public static sendError(res: Response, e: any) {
        res.status(400).send({
            statusCode: EStatusCode.NOT_FOUND_JSON,
            statusDesc: e?.message || 'Данные недоступны или не существуют',
            data: null,
        });
    }

    public static sendSuccess(props: { res: Response; status?: number; data?: unknown }) {
        const { res, status = 200, data = null } = props;
        res.status(status).send({
            statusCode: EStatusCode.OK,
            statusDesc: null,
            data,
        });
    }
}
