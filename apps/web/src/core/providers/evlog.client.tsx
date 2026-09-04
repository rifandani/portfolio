import { EvlogProvider } from "evlog/next/client";

import { SERVICE_NAME } from "@/core/constants/global";

export const AppEvlogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  // Send to our server first, then to OTLP collector to keep credentials secure (not bundled with client) and events captured reliably
  <EvlogProvider
    service={SERVICE_NAME}
    transport={{ enabled: true, endpoint: "/api/evlog/ingest" }}
  >
    {children}
  </EvlogProvider>
);
