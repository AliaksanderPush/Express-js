import { Response, Request, NextFunction, Router } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	methot: keyof Pick<Router, 'get' | 'post' | 'patch' | 'delete' | 'put'>;
	middlewares?: IMiddleware[];
}
