import { HttpStatusCode } from "axios";
import {
  InvalidRequestParametersError,
  InvalidExternalAPIResponseError,
} from "../errors";
import { getLogger } from "../services";
import { NextFunction, Response, Request, ErrorRequestHandler } from "express";

const logger = getLogger();

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof InvalidRequestParametersError) {
    logger.warn(
      `Request was recieved with invalid request parameters; invalid parameters: ${err.message}`
    );
    res.status(HttpStatusCode.BadRequest).send(err.message);
    return;
  }
  if (err instanceof InvalidExternalAPIResponseError) {
    logger.error(err.message);
    res
      .status(HttpStatusCode.InternalServerError)
      .send("Couldn't get the requested data.");
    return;
  }
  logger.error(`Unexpected error occurred: ${err}`);
  res
    .status(HttpStatusCode.InternalServerError)
    .send("Couldn't handle the request.");
};
