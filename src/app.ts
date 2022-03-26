import express, { Express } from "express";
import { UserController } from "./users/user.controller";
import { ExeptionFilter } from "./errors/exeption.filter";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  userController: UserController;
  exeptionFilter: ExeptionFilter;

  constructor(
    logger: LoggerService,
    userController: UserController,
    exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  useRouters() {
    console.log("ok");
    this.app.use("/users", this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRouters();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`🚀 Server ready at http://localhost:${this.port}`);
  }
}
