import { NextFunction, Request, Response } from 'express';

let countResponse = 0;

export function exampleLoggerMiddleware(request: Request, response: Response, next: NextFunction): void {
    console.log({ count: ++countResponse });
    next();
}
