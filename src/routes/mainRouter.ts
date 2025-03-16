import { getLogger } from "../services/LoggerService";
import { Request, Response, Router } from "express";
import { HttpStatusCode } from "axios";
import { playerRouter } from ".";
import { usersRouter } from "./usersRoutes";

export const mainRouter = Router();
const logger = getLogger();

mainRouter.get("/", (_req: Request, res: Response) => {
  logger.info("a generic request was made");
  res.status(HttpStatusCode.Accepted).send("Hi, server is running.");
});

// mainRouter.use("/players", playerRouter);

mainRouter.use("/users", usersRouter);
