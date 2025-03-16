import { z } from "zod";
import { numberValidation } from "ziv-nba-app-utils";
import { InvalidRequestParametersError } from "../errors";

const DEFAULT_CURSOR = 1;
const DEFAULT_AMOUNT = 100;

export const queryParamsValidationSchema = z.object({
  cursor: numberValidation(true, DEFAULT_CURSOR).optional(),
  amount: z.coerce
    .number()
    .int()
    .positive()
    .lte(300)
    .default(DEFAULT_AMOUNT)
    .optional(),
});

export const getPlayersValidationSchema = queryParamsValidationSchema.merge(
  z.object({
    search: z
      .string()
      .min(1)
      .regex(/^[a-zA-Z\s]*$/, {
        message: "must be a valid name or part of it.",
      })
      .optional(),
  })
);

export type QueryParams = z.infer<typeof queryParamsValidationSchema>;

export type GetPlayersQueryParams = z.infer<typeof getPlayersValidationSchema>;
