import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { IPost, ITodo } from '../interfaces';
import { EJsonEntity, EStatusCode } from '../enums';

/** Метод для отправки массивов из static/json, добавлен поиск элементов */
export const sendJson = (req: Request, res: Response) => {
    const dataPath = path.resolve(__dirname, '../static/json', `${req.params.json}.json`);

    fs.readFile(dataPath, 'utf8', (err, json) => {
        if (!json || err) {
            res.status(400).send({
                statusCode: EStatusCode.NOT_FOUND_JSON,
                statusDesc: 'Данные недоступны или не существуют',
                data: null,
            });

            return;
        }

        let data = JSON.parse(json) as Array<IPost | ITodo>;
        const searchQuery = req.query.search as string;

        if (searchQuery) {
            data = data.filter(({ title }) => title?.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        res.status(200).send({
            statusCode: EStatusCode.OK,
            statusDesc: null,
            data,
        });
    });
};

/** Пока абстрактные методы для работы с имеющимися json */
export const addItemToJson = (req: Request, res: Response) => {
    const entity = req.params.json as EJsonEntity;
    const dataPath = path.resolve(__dirname, '../static/json', `${entity}.json`);
    let json = fs.readFileSync(dataPath) as string;

    if (!json) {
        res.status(400).send({
            statusCode: EStatusCode.NOT_FOUND_JSON,
            statusDesc: 'Данные недоступны или не существуют',
            data: null,
        });
    }

    let item: ITodo | IPost;

    if (entity === EJsonEntity.POSTS) {
        item = {
            id: Date.now(),
            title: req.body.title || '',
            text: req.body.text || '',
            createDate: new Date(),
        };
    } else if (entity === EJsonEntity.TODOS) {
        item = {
            id: Date.now(),
            title: req.body.title || '',
            completed: false,
        };
    }

    const jsonData = JSON.parse(json) as Array<IPost | ITodo>;
    jsonData.unshift(item);

    fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));

    res.status(200).send({
        statusCode: EStatusCode.OK,
        statusDesc: null,
        data: item,
    });
};
