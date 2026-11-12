import { talks } from "@/features/talk/data/talks";
import { collectTalks } from "@/features/talk/utils/talk-collection";

export const getTalks = (limit?: number) => collectTalks(talks, limit);
