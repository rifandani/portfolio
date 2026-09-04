import { useTranslations } from "next-intl";

import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";

export const CardShowcase = () => {
  const t = useTranslations();

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card>
        <CardHeader
          description={t("catalogShowcaseTeamMembersDesc")}
          title={t("catalogShowcaseTeamMembers")}
        />
        <CardContent className="text-muted-fg text-sm/6">
          {t("catalogShowcaseInviteCollab")}
        </CardContent>
        <CardFooter className="gap-2">
          <Button intent="outline" size="sm">
            {t("cancel")}
          </Button>
          <Button size="sm">{t("catalogShowcaseInvite")}</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("catalogShowcaseCurrentPlan")}</CardTitle>
          <CardDescription>{t("catalogShowcaseRenewsOn")}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Badge intent="success">{t("catalogShowcaseActive")}</Badge>
          <span className="text-muted-fg text-sm/6">
            {t("catalogShowcaseProPlan")}
          </span>
        </CardContent>
      </Card>
    </div>
  );
};
