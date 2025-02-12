import { fetchDataWithPagination, getLogger } from "../services";
import { HttpStatusCode } from "axios";
import dayjs from "dayjs";
import { validateQueryParams } from "../validation";
import { Request, Response } from "express";
import { playerSchema } from "ziv-nba-app-utils";

const logger = getLogger();

export const getAllPlayers = async (req: Request, res: Response) => {
  const queryStartTime = dayjs();
  logger.info(`player request was made, fetching players...`);

  const queryParams = validateQueryParams(req.query);
  const { data, corruptedData } = await fetchDataWithPagination(
    "players",
    queryParams,
    playerSchema
  );
  res.status(HttpStatusCode.Accepted).json({ data, corruptedData });

  logger.info(
    `players were fetched successfully. querried ${
      data.length
    } players. Query Time: ${dayjs().diff(queryStartTime)};${
      corruptedData.length > 0
        ? ` Recieved ${corruptedData.length} results with corrupted data. ${
            corruptedData.length + data.length
          } results in total;`
        : ""
    }`
  );
};
