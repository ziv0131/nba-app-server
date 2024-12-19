import { getLogger } from "../services/LoggerService";
import express, { Request, Response, Router } from "express";
import axios from "axios";
import { ParsedQs } from "qs";
import { getPlayersValidationSchema } from "../validation/playersRequestSchema";
import { InvalidRequestParametersError } from "../errors";
import { HttpStatusCode } from "axios";
import { fetchExternalApiData } from "../services";

export const router = Router();
const logger = getLogger();

router.get("/", (_req: Request, res: Response) => {
  logger.info("a request was made");
  res.status(HttpStatusCode.Accepted).send("Hi, server is running.");
});

router.get("/players", async (req, res) => {
  logger.info(`player request was made, fetching players...`);
  const queryParams = validateQueryParams(req.query);

  const players = await fetchExternalApiData("players", queryParams);

  res.status(200).json(players);
  logger.info(`players were fetched successfully`);
});

function validateQueryParams(query: ParsedQs) {
  const validationResult = getPlayersValidationSchema.safeParse(query);
  if (!!validationResult.success) {
    return validationResult.data;
  }

  throw new InvalidRequestParametersError(validationResult.error.errors);
}
