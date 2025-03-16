import { z } from "zod";

const meta = z.object({
  prev_cursor: z.number().optional(),
  next_cursor: z.number().optional(),
  per_page: z.number(),
});

export const externalAPIResponseSchema = z.object({
  data: z.array(z.any(), { message: "data is missing" }),
  meta: z.any({ message: "meta is missing" }),
});
