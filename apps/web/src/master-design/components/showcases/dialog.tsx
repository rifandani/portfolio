import { useTranslations } from "next-intl";

import { Button } from "@/core/components/ui/button";
import { Description, Label } from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/core/components/ui/modal";
import { TextField } from "@/core/components/ui/text-field";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const DialogShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="dialog">
        <Modal>
          <Button intent="outline">{t("catalogShowcaseEditProfile")}</Button>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{t("catalogShowcaseEditProfile")}</ModalTitle>
              <ModalDescription>
                {t("catalogShowcaseUpdateDetails")}
              </ModalDescription>
            </ModalHeader>
            <ModalBody className="space-y-4">
              <TextField defaultValue={t("catalogShowcaseSampleName")}>
                <Label>{t("name")}</Label>
                <Input />
                <Description>
                  {t("catalogShowcaseShownPublicProfile")}
                </Description>
              </TextField>
            </ModalBody>
            <ModalFooter>
              <ModalClose>{t("cancel")}</ModalClose>
              <ModalClose intent="primary">
                {t("catalogShowcaseSave")}
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Variant>

      <Variant label="alertdialog">
        <Modal>
          <Button intent="danger">{t("catalogShowcaseDeleteAccount")}</Button>
          <ModalContent role="alertdialog" size="sm">
            <ModalHeader>
              <ModalTitle>{t("catalogShowcaseDeleteAccountQ")}</ModalTitle>
              <ModalDescription>
                {t("catalogShowcaseDeleteAccountDesc")}
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <ModalClose>{t("cancel")}</ModalClose>
              <ModalClose intent="danger">
                {t("catalogShowcaseDelete")}
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Variant>
    </VariantGrid>
  );
};
