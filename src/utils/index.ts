import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { EStatusCode } from '../enums';

export const sendJson = (req: Request, res: Response) => {
    const dataPath = path.resolve(__dirname, '../static/json', `${req.params.json}.json`);

    fs.readFile(dataPath, 'utf8',(err, json) => {
        if (!json || err) {
            res.status(400).send({
                statusCode: EStatusCode.NOT_FOUND_JSON,
                statusDesc: 'Данные недоступны или не существуют',
                data: null,
            });

            return;
        }

        let data = JSON.parse(json) as Array<unknown>;
        const searchQuery = req.query.search as string;

        if (searchQuery) {
            data = data.filter(({ title }) => title?.toLowerCase().includes(searchQuery.toLowerCase()))
        }

        res.status(200).send({
            statusCode: EStatusCode.OK,
            statusDesc: null,
            data,
        });
    });
};
