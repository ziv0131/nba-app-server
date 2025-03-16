import { z } from "zod";

export const userRegistrationAndLoginValidationSchema = z.object({
  username: z.string().nonempty(), //add non existant check
  password: z.string().nonempty(),
});
