import { useEffect } from "react";

import { createUpdateEffect } from "@/core/hooks/create-update-effect";
/**
 * A hook alike `useEffect` but skips running the effect for the first time.
 */
const useUpdateEffect = createUpdateEffect(useEffect);
