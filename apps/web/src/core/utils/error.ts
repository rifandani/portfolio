/* oxlint-disable promise/prefer-await-to-callbacks */
import { HTTPError, TimeoutError } from "ky";
import { match, P } from "ts-pattern";
import { z } from "zod";

import type { ErrorResponseSchema } from "@/core/apis/core";
import { errorResponseSchema } from "@/core/apis/core";
import { simplifyErrorObject } from "@/core/utils/error-helper";
import { log } from "@/core/utils/evlog";
import "server-only";

/**
 * Logs the error with evlog.
 */
const report = (
  kind: string,
  err: Error,
  response?: ErrorResponseSchema | string
) => {
  const errorObject = simplifyErrorObject(err);
  const entry = { area: "serverErrorMapper", kind, ...errorObject };
  log.error(response === undefined ? entry : { ...entry, response });
};

/**
 * Maps a caught server error to a client-safe message string and logs it.
 */
export const serverErrorMapper = (error: Error): string =>
  match(error)
    .with(P.instanceOf(HTTPError), (err) => {
      const parsed = errorResponseSchema.safeParse(err.data);
      const json: ErrorResponseSchema = parsed.success
        ? parsed.data
        : { message: err.message };
      report("HTTPError", err, json);
      return json.message;
    })
    .with(P.instanceOf(TimeoutError), (err) => {
      report("TimeoutError", err);
      return err.message;
    })
    .with(P.instanceOf(z.ZodError), (err) => {
      const prettified = z.prettifyError(err);
      report("ZodError", err, prettified);
      return prettified;
    })
    .otherwise((err) => {
      report("UnknownError", err);
      return err.message;
    });
