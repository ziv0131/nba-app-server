import { fetchDataWithPagination, getLogger, fetchPlayers } from "../services";
import { HttpStatusCode } from "axios";
import dayjs from "dayjs";
import { validateQueryParams } from "../validation";
import { NextFunction, Request, Response } from "express";
import { playerSchema } from "ziv-nba-app-utils";

const logger = getLogger();

export const getPlayers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryStartTime = dayjs();
  logger.info(`player request was made, fetching players...`);

  try {
    const data = await fetchPlayers();
    res.status(HttpStatusCode.Accepted).json({ data });

    logger.info(
      `players were fetched successfully. querried ${
        data.length
      } players. Query Time: ${dayjs().diff(queryStartTime)};`
    );
  } catch (err) {
    next(err);
  }
};

// logger.info(
//   `players were fetched successfully. querried ${
//     data.length
//   } players. Query Time: ${dayjs().diff(queryStartTime)};${
//     corruptedData.length > 0
//       ? ` Recieved ${corruptedData.length} results with corrupted data. ${
//           corruptedData.length + data.length
//         } results in total;`
//       : ""
//   }`
// );
