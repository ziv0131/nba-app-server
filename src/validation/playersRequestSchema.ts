import { z } from "zod";
import { numberValidation } from "ziv-nba-app-utils";

const DEFAULT_CURSOR = 1;
const DEFAULT_PER_PAGE = 25;

export const queryParamsValidationSchema = z.object({
  cursor: numberValidation(true, DEFAULT_CURSOR),
  per_page: numberValidation(true, DEFAULT_PER_PAGE),
});

export const getPlayersValidationSchema = queryParamsValidationSchema.merge(
  z.object({
    search: z
      .string()
      .min(1)
      .regex(/^[a-zA-Z\s]*$/, {
        message: "must be a valid name or part of it.",
      }),
  })
);

export type QueryParams = z.infer<typeof queryParamsValidationSchema>;

export type GetPlayersQueryParams = z.infer<typeof getPlayersValidationSchema>;
