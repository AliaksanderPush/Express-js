import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { UserLoginDto } from '../dto/user-login.dto';
import 'reflect-metadata';
import { IUserController } from './userController.interface';
import { UserService } from './users.service';
import { ValidateMidleWare } from '../common/validate.middleware';
import { UserRegisterDto } from '../dto/user-register.dto';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerServise: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerServise);
		this.bindRouters([
			{
				path: '/register',
				methot: 'post',
				func: this.register,
				middlewares: [new ValidateMidleWare(UserRegisterDto)],
			},
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
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, result);
	}
}
