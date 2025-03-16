import { ZodSchema } from "zod";
import { InvalidRequestParametersError } from "../errors";

export const validateQueryParams = (
  params: any,
  validationSchema: ZodSchema
) => {
  const validationResult = validationSchema.safeParse(params);
  if (!!validationResult.success) {
    return validationResult.data;
  }

  throw new InvalidRequestParametersError(validationResult.error.errors);
};
