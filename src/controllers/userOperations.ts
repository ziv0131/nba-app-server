import { checkConnection, getLogger } from "../services";
import { User } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationFailureError } from "../errors/AuthenticationFailureError";
import { HttpStatusCode } from "axios";
import {
  userRegistrationAndLoginValidationSchema,
  validateQueryParams,
} from "../validation";

const logger = getLogger();

export const checkMongoDBConnection = async (req, res, next) => {
  logger.info("connection check started");
  const isConnectionSuccessful = checkConnection();
  const responseMessage = `connection attempt has ${
    isConnectionSuccessful ? "succeeded" : "failed"
  }`;
  res
    .status(
      isConnectionSuccessful
        ? HttpStatusCode.Ok
        : HttpStatusCode.InternalServerError
    )
    .send(responseMessage);

  isConnectionSuccessful
    ? logger.info(responseMessage)
    : logger.emerg(responseMessage);
};

export const registerUser = async (req, res, next) => {
  logger.info("starting user registration");
  const { username, password } = validateQueryParams(
    req.body,
    userRegistrationAndLoginValidationSchema
  );
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();

  const confirmationMessage = "User registered successfully";
  res.status(HttpStatusCode.Created).json({ message: confirmationMessage });

  logger.info(`${confirmationMessage} with username: ${username}`);
};

export const userLogin = async (req, res) => {
  logger.info("starting user login");

  const { username, password } = validateQueryParams(
    req.body,
    userRegistrationAndLoginValidationSchema
  );
  const user = await User.findOne({ username });
  if (!user) {
    throw new AuthenticationFailureError(
      HttpStatusCode.Unauthorized,
      "Authentication failed - user not found with these credentials"
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new AuthenticationFailureError(
      HttpStatusCode.Unauthorized,
      "Authentication failed - passwords do not match"
    );
  }

  const token = jwt.sign({ userId: user._id }, process.env.AUTH_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.status(HttpStatusCode.Unauthorized).json({ token });

  logger.info("login succeeded");
};
