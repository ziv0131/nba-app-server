import axios from "axios";
import { InvalidExternalAPIResponseError } from "../errors/InvalidExternalAPIResponseError";
import { z, ZodIssue, ZodSchema } from "zod";
import { externalAPIResponseSchema } from "../validation";

export const fetchData = async (endpoint: string, params: {}) => {
  const requestURL = `${process.env.EXTERNAL_API_PREFIX}/${endpoint}`;

  const response = await axios.get(requestURL, {
    headers: {
      Authorization: process.env.EXTERNAL_API_AUTHORIZATION_KEY,
    },
    params,
  });

  const responseValidationResult = externalAPIResponseSchema.safeParse(
    response.data
  );

  if (!responseValidationResult.success) {
    throw new InvalidExternalAPIResponseError(
      response,
      responseValidationResult.error.errors,
      requestURL
    );
  }

  return responseValidationResult.data;
};

export const fetchDataWithPagination = async (
  endpoint: string,
  validationSchema: ZodSchema,
  queryParams: object = {},
  per_page: number = 100
) => {
  let cursor = 1;
  let corruptedData: { record: object; errors: ZodIssue[] }[] = [];

  let validData: z.infer<typeof validationSchema>[] = [];

  while (!!cursor) {
    Object.assign(queryParams, {
      ...queryParams,
      cursor,
      per_page,
    });
    const { data, meta } = await fetchData(endpoint, queryParams);
    await data.forEach((record) => {
      const validationResult = validationSchema.safeParse(record);
      validationResult.success
        ? validData.push(validationResult.data)
        : corruptedData.push({ record, errors: validationResult.error.errors });
    });
    cursor = meta.next_cursor;
  }

  return { data: validData, corruptedData };
};
