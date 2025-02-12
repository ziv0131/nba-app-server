import { Router } from "express";
import { getAllPlayers } from "../controllers/playerOperations";

export const playerRouter = Router();

playerRouter.get("/getAll", getAllPlayers);
