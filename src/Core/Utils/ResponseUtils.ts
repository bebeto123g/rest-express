import { EStatusCode } from '../enums';
import { IResponseSendProps } from './interfaces';

export class ResponseUtils {
    public static sendError(props: IResponseSendProps) {
        const { res, status = 400, error } = props;

        res.status(status).send({
            statusCode: EStatusCode.NOT_FOUND_JSON,
            statusDesc: error?.message || 'Данные недоступны или не существуют',
            data: null,
        });
    }

    public static sendSuccess(props: IResponseSendProps) {
        const { res, status = 200, data = null } = props;
        res.status(status).send({
            statusCode: EStatusCode.OK,
            statusDesc: null,
            data,
        });
    }
}
