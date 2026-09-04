import { useTranslations } from "next-intl";

import { Button } from "@/core/components/ui/button";
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

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ModalShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="sm">
        <Modal>
          <Button intent="outline">{t("catalogShowcaseOpenSm")}</Button>
          <ModalContent size="sm">
            <ModalHeader>
              <ModalTitle>{t("catalogShowcaseSmallModal")}</ModalTitle>
              <ModalDescription>
                {t("catalogShowcaseCompactDialog")}
              </ModalDescription>
            </ModalHeader>
            <ModalBody>{t("catalogShowcaseKeepBrief")}</ModalBody>
            <ModalFooter>
              <ModalClose>{t("catalogShowcaseClose")}</ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Variant>

      <Variant label="default">
        <Modal>
          <Button intent="outline">{t("catalogShowcaseOpenDefault")}</Button>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{t("catalogShowcaseDefaultModal")}</ModalTitle>
              <ModalDescription>
                {t("catalogShowcaseDefaultSizeMd")}
              </ModalDescription>
            </ModalHeader>
            <ModalBody>{t("catalogShowcaseTypicalForms")}</ModalBody>
            <ModalFooter>
              <ModalClose>{t("catalogShowcaseClose")}</ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Variant>
    </VariantGrid>
  );
};
