import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { UserLoginDto } from '../dto/user-login.dto';
import 'reflect-metadata';
import { IUserController } from './userController.interface';
import { User } from './user.entity';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerServise: ILogger) {
		super(loggerServise);
		this.bindRouters([
			{ path: '/register', methot: 'post', func: this.register },
			{ path: '/login', methot: 'post', func: this.login },
		]);
	}

	/*
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRouters([
      { path: "/register", methot: "post", func: this.register },
      { path: "/login", methot: "post", func: this.login },
    ]);
  }
  */
	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		console.log(req.body);
		next(new HTTPError(401, 'Error auth'));
	}

	async register(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newUser = new User(body.email, body.name);
		await newUser.setPassword(body.password);
		this.ok(res, newUser);
	}
}
