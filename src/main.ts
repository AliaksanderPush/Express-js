import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './users/user.controller';
import 'reflect-metadata';
import { UserService } from './users/users.service';
import { IUserController } from './users/userController.interface';
import { IUserService } from './users/userrs.service.interface';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.servise.innterface';
//async function bootstrap() {
/*
    const logger = new LoggerService();
    const app = new App(
    logger,
    new UserController(logger),
    new ExeptionFilter(logger)
  );
   await app.init();
  }
  //bootstrap();

 */
const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService);
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
});

function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
