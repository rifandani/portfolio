import { useLogger, withEvlog } from "@/server/utils/evlog";

export const GET = withEvlog(() => {
  const log = useLogger();
  log.set({ check: "health" });
  return Response.json({ status: "ok" });
});
