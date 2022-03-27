import express, { Express } from 'express';
import { UserController } from './users/user.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { Server } from 'http';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import { BodyParser, json } from 'body-parser';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	// logger: ILogger;
	// userController: UserController;
	// exeptionFilter: ExeptionFilter;

	/*
  constructor(
    logger: ILogger,
    userController: UserController,
    exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }
 */
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express();
		this.port = 8000;
		//this.logger = logger;
		//this.userController = userController;
		//this.exeptionFilter = exeptionFilter;
	}

	useRouters(): void {
		this.app.use('/users', this.userController.router);
	}
	useMiddleware(): void {
		this.app.use(json());
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRouters();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`🚀 Server ready at http://localhost:${this.port}`);
	}
}
