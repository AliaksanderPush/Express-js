import { Response, Request, NextFunction } from "express";

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  methot: "get" | "post" | "patch" | "delete" | "put";
}
