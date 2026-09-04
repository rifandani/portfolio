import { useTranslations } from "next-intl";

import { Badge } from "@/core/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";

import { demoUsers } from "@/master-design/constants/fixtures";

const statusIntent = {
  Active: "success",
  Invited: "info",
  Suspended: "danger",
} as const;

const statusKey = {
  Active: "catalogShowcaseActive",
  Invited: "catalogShowcaseInvited",
  Suspended: "catalogShowcaseSuspended",
} as const;

const roleKey = {
  Admin: "catalogShowcaseAdmin",
  Editor: "catalogShowcaseEditor",
  Viewer: "catalogShowcaseViewer",
} as const;

export const TableShowcase = () => {
  const t = useTranslations();

  return (
    <Table aria-label={t("catalogShowcaseTeamMembers")}>
      <TableHeader>
        <TableColumn isRowHeader>{t("name")}</TableColumn>
        <TableColumn>{t("email")}</TableColumn>
        <TableColumn>{t("catalogShowcaseRole")}</TableColumn>
        <TableColumn>{t("catalogShowcaseStatus")}</TableColumn>
      </TableHeader>
      <TableBody items={demoUsers}>
        {(user) => (
          <TableRow id={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="text-muted-fg">{user.email}</TableCell>
            <TableCell>{t(roleKey[user.role])}</TableCell>
            <TableCell>
              <Badge intent={statusIntent[user.status]}>
                {t(statusKey[user.status])}
              </Badge>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
