import { z } from "zod";
// #region COMMON SCHEMAS
export const errorResponseSchema = z.object({
  message: z.string(),
});
// #endregion COMMON SCHEMAS
// #region SCHEMA TYPES
export type ErrorResponseSchema = z.infer<typeof errorResponseSchema>;
