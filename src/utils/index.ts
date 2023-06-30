import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { EStatusCode } from '../enums';

export const sendJson = (req: Request, res: Response) => {
    const dataPath = path.resolve(__dirname, '../static/json', `${req.params.json}.json`);

    fs.readFile(dataPath, 'utf8',(err, data) => {
        if (!data || err) {
            res.status(400).send({
                statusCode: EStatusCode.NOT_FOUND_JSON,
                statusDesc: 'Данные недоступны или не существуют',
                data: null,
            });

            return;
        }

        res.status(200).send({
            statusCode: EStatusCode.OK,
            statusDesc: null,
            data: JSON.parse(data),
        });
    });
};
