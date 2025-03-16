import { RouteProcessingError } from "./RouteProcessingError";

export class AuthenticationFailureError extends RouteProcessingError {
  constructor(statusCode: number, message: string) {
    super(statusCode);
    this.message = message;
  }
}
