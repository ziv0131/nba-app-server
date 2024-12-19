import { AxiosResponse } from "axios";

export class NoDataRecievedError extends Error {

  constructor (response: AxiosResponse, endpoint: string) {
    super();
    this.message = `Recieved response without data when querrying from endpoint '/${endpoint}'; status code: ${response.status}; message: ${response.statusText}`
  }

}