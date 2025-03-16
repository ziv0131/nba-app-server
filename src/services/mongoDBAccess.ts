import mongoose from "mongoose";
import { getLogger } from "../services";

const logger = getLogger();
const uri = process.env.MONGO_CONNECTION_STRING;

export const checkConnection = async () => {
  try {
    await mongoose.connect(uri);
    logger.info("connected!");
  } catch (error) {
    logger.error("Eize Zain: " + error);
  }
};
