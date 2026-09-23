"use client";

import { ChevronDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

import { ASSISTANT_ICON_IDS, SpriteIcon } from "@/core/components/icon-sprite";
import { Button } from "@/core/components/ui/button";
import { ButtonGroup } from "@/core/components/ui/button-group";
import {
  Menu,
  MenuContent,
  MenuDescription,
  MenuItem,
  MenuLabel,
} from "@/core/components/ui/menu";
import { CopyPageButton } from "@/post/components/copy-page-button.client";
import {
  assistantHandoffUrl,
  assistantName,
  assistants,
} from "@/post/utils/assistant-handoff";

/** Each item leaves the Post Detail, so it opens in a new tab. */
const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * The Page Actions of a Post Detail: "Copy page", and a menu that opens the
 * Post Markdown or hands it to an Assistant. `markdownUrl` is absolute, because
 * an Assistant fetches it from outside the site.
 */
export const PageActions = ({
  markdown,
  markdownUrl,
}: {
  markdown: string;
  markdownUrl: string;
}) => {
  const t = useTranslations();
  const prompt = t("postAssistantPrompt", { url: markdownUrl });

  return (
    <ButtonGroup>
      <CopyPageButton markdown={markdown} />
      <Menu>
        <Button
          intent="outline"
          size="sq-sm"
          className="size-9 sm:size-8"
          aria-label={t("postMoreActions")}
        >
          <ChevronDownIcon className="text-muted-fg" />
        </Button>
        <MenuContent placement="bottom end" className="min-w-64">
          <MenuItem
            href={markdownUrl}
            textValue={t("postViewMarkdown")}
            {...EXTERNAL}
          >
            <DocumentTextIcon />
            <MenuLabel className="font-medium">
              {t("postViewMarkdown")}
            </MenuLabel>
            <MenuDescription>
              {t("postViewMarkdownDescription")}
            </MenuDescription>
          </MenuItem>
          {assistants.map((assistant) => {
            const label = t("postOpenIn", {
              assistant: assistantName(assistant),
            });
            return (
              <MenuItem
                key={assistant}
                href={assistantHandoffUrl(assistant, prompt)}
                textValue={label}
                {...EXTERNAL}
              >
                <SpriteIcon id={ASSISTANT_ICON_IDS[assistant]} />
                <MenuLabel className="font-medium">{label}</MenuLabel>
                <MenuDescription>{t("postAskDescription")}</MenuDescription>
              </MenuItem>
            );
          })}
        </MenuContent>
      </Menu>
    </ButtonGroup>
  );
};
