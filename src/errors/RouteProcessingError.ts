export class RouteProcessingError extends Error {
  statusCode: number;
  constructor(statusCode) {
    super();
    this.statusCode = statusCode;
  }
}
