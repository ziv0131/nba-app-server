import axios from "axios";
import { NoDataRecievedError } from "../errors/NoDataRecievedError";
import { QueryParams } from "../types/QueryParams";

export const fetchExternalApiData = async (
  endpoint: string,
  params: QueryParams
) => {
  const response = await axios.get(
    `${process.env.EXTERNAL_API_PREFIX}/${endpoint}`,
    {
      headers: {
        Authorization: process.env.EXTERNAL_API_AUTHORIZATION_KEY,
      },
      params,
    }
  );

  if (!response.data) {
    throw new NoDataRecievedError(response, endpoint);
  }

  return response.data;
};
