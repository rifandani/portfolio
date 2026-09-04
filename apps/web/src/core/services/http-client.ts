import { ENV } from "@/core/constants/env";
import { Http } from "@/core/services/http";

/** App-scoped Http client with API base URL. */
export const http = new Http({
  prefix: ENV.NEXT_PUBLIC_API_BASE_URL,
});
