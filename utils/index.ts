import { Request, Response } from 'express';
import path from 'path';

export const sendJson = (req: Request, res: Response) => {
    const name = req.path.replace(/\W/, '')
    res.sendFile(path.resolve(__dirname, '../static/json', `${name}.json`))
};

