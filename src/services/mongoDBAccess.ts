import mongoose from "mongoose";
import { getLogger } from "../services";

const logger = getLogger();
const uri =
  "mongodb+srv://zivGuimpel:WRsbORvn90CEOQvQ@zivnbaappcluster.1vlic.mongodb.net/";

export const checkConnection = async () => {
  try {
    await mongoose.connect(uri);
    logger.info("connected!");
  } catch (error) {
    logger.error("Eize Zain: " + error);
  }
};
