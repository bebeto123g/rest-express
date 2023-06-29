import { Request, Response } from 'express';
import path from 'path';

export const sendJson = (req: Request, res: Response) => {
    console.log(req.path);
    const name = req.path.replace(/\W/, '')
    res.status(200).sendFile(path.resolve(__dirname, '../static/json', `${name}.json`))
};
