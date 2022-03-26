import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { LoggerService } from "../logger/logger.service";

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRouters([
      { path: "/register", methot: "post", func: this.register },
      { path: "/login", methot: "post", func: this.login },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, "Error auth"));
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }
}
