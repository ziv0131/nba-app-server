import { Router } from "express";
import {
  checkMongoDBConnection,
  registerUser,
  userLogin,
} from "../controllers";

export const usersRouter = Router();

usersRouter.get("/checkConnection", checkMongoDBConnection);
usersRouter.post("/register", registerUser);
usersRouter.post("/login", userLogin);
