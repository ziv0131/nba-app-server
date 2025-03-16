import { HttpStatusCode } from "axios";
import { AuthenticationFailureError } from "../errors";

const jwt = require("jsonwebtoken");

export const C2BAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    throw new AuthenticationFailureError(
      HttpStatusCode.Unauthorized,
      "Authentication failed - no token was sent"
    );
  }
  const decoded = jwt.verify(
    token,
    process.env.AUTH_SECRET_KEY,
    (error, decoded) => {
      if (error) {
        throw new AuthenticationFailureError(
          HttpStatusCode.Unauthorized,
          "Authentication failed - token is invalid"
        );
      }
      req.user = decoded;
      next();
    }
  );
  res.status(401).json({ error: "Invalid token" });
};
