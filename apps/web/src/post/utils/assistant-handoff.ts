interface AssistantTarget {
  name: string;
  url: string;
  promptParam: string;
  params?: Record<string, string>;
}

/**
 * The Assistants a reader can hand a Post to, in menu order. Each one opens a
 * new chat with the prompt filled in; none sends it without the reader.
 */
const ASSISTANTS = {
  claude: {
    name: "Claude",
    url: "https://claude.ai/new",
    promptParam: "q",
  },
  chatgpt: {
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    promptParam: "prompt",
    // Makes ChatGPT search the web, so it fetches the Post Markdown URL.
    params: { hints: "search" },
  },
  t3: {
    name: "T3 Chat",
    url: "https://t3.chat/new",
    promptParam: "q",
  },
  cursor: {
    name: "Cursor",
    url: "https://cursor.com/link/prompt",
    promptParam: "text",
  },
} satisfies Record<string, AssistantTarget>;

export type Assistant = keyof typeof ASSISTANTS;

export const assistants =
  // SAFETY: `ASSISTANTS` is a literal with no prototype keys, so `Object.keys` returns exactly the `Assistant` names.
  Object.keys(ASSISTANTS) as Assistant[];

export const assistantName = (assistant: Assistant) =>
  ASSISTANTS[assistant].name;

/**
 * The URL of an Assistant Handoff. The prompt carries the Post Markdown URL, not its text (ADR-0004), so a long Post cannot go over a URL limit.
 */
export const assistantHandoffUrl = (assistant: Assistant, prompt: string) => {
  const target: AssistantTarget = ASSISTANTS[assistant];
  const url = new URL(target.url);
  for (const [key, value] of Object.entries(target.params ?? {})) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set(target.promptParam, prompt);
  return url.href;
};
