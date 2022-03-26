import express, { Request, Response, NextFunction } from "express";
import { nextTick } from "process";
import { router } from "./users/users.js";

const app = express();
const port = 8000;

app.use("/users", router);

app.all("/hello", (req, res, next) => {
  console.log("all");
  next();
});

app.get("/hello", (req, res) => {
  res.send("Hi!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(401).send(err.message);
});

app.listen(port, () => {
  console.log(`Server working on http://localhost:${port}`);
});
