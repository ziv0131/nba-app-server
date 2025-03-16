import { AxiosResponse } from "axios";
import { ZodIssue } from "zod";

export class InvalidExternalAPIResponseError extends Error {
  constructor(
    response: AxiosResponse,
    responseErrors: ZodIssue[],
    requestURL: string
  ) {
    super();
    this.message = `Recieved an invalid response when fetching data from '${requestURL}';
    response had the following issues: ${responseErrors.map(
      ({ message }) => `${message}; `
    )} response status code: ${response.status}; message: ${
      response.statusText
    }`;
  }
}
