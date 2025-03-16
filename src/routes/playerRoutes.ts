import { Router } from "express";
import { getPlayers } from "../controllers/playerOperations";
import { fetchPlayers } from "../services";

export const playerRouter = Router();

playerRouter.get("/getAll", getPlayers);
