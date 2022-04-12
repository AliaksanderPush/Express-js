import { Request, Response, NextFunction } from 'express';

export interface IMiddleware {
	execute(req: Request, res: Response, nex: NextFunction): void;
}
