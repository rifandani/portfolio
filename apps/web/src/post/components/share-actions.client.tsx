"use client";

import { useTranslations } from "next-intl";
import { HiOutlineChevronDown, HiOutlineLink } from "react-icons/hi2";

import { NETWORK_ICON_IDS, SpriteIcon } from "@/core/components/icon-sprite";
import { Button } from "@/core/components/ui/button";
import { ButtonGroup } from "@/core/components/ui/button-group";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
} from "@/core/components/ui/menu";
import { CopyButton } from "@/post/components/copy-button.client";
import {
  networkName,
  networks,
  shareIntentUrl,
} from "@/post/utils/share-intent";

/** Each item leaves the Post Detail, so it opens in a new tab. */
const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * The Share Actions of a Post Detail: "Share", which copies the Post Detail
 * address, and a menu that opens a Share Intent on each Social Network. `url`
 * is absolute, because a Social Network opens it from outside the site.
 */
export const ShareActions = ({
  url,
  title,
}: {
  url: string;
  title: string;
}) => {
  const t = useTranslations();

  return (
    <ButtonGroup>
      <CopyButton
        value={url}
        icon={HiOutlineLink}
        label={t("postShare")}
        copiedLabel={t("postCopied")}
        status={t("postLinkCopied")}
      />
      <Menu>
        <Button
          intent="outline"
          size="sq-sm"
          className="size-9 sm:size-8"
          aria-label={t("postMoreShareOptions")}
        >
          <HiOutlineChevronDown
            aria-hidden="true"
            data-slot="icon"
            className="text-muted-fg"
          />
        </Button>
        <MenuContent placement="bottom end" className="min-w-48">
          {networks.map((network) => {
            const label = t("postShareOn", { network: networkName(network) });
            return (
              <MenuItem
                key={network}
                href={shareIntentUrl(network, { url, title })}
                textValue={label}
                {...EXTERNAL}
              >
                <SpriteIcon id={NETWORK_ICON_IDS[network]} />
                <MenuLabel>{label}</MenuLabel>
              </MenuItem>
            );
          })}
        </MenuContent>
      </Menu>
    </ButtonGroup>
  );
};
