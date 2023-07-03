import { Response } from 'express';

export interface IResponseSendProps {
    res: Response;
    status?: number;
    data?: unknown | null;
    error?: any;
}
