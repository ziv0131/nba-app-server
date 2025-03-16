import { config } from "dotenv";
import { getLogger } from "./services/LoggerService";
import express from "express";
import { errorHandler } from "./middlewares/index";
import { mainRouter } from "./routes/mainRouter";

config();
const app = express();
const PORT = process.env.PORT;
const logger = getLogger();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mainRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(
    `Server is successfully running, and App is listening on port: ${PORT}`
  );
});
