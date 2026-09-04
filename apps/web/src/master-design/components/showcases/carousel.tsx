import { useTranslations } from "next-intl";

import {
  Carousel,
  CarouselButton,
  CarouselContent,
  CarouselHandler,
  CarouselItem,
} from "@/core/components/ui/carousel";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const CarouselShowcase = () => {
  const t = useTranslations();
  const slides = [
    t("catalogShowcaseOne"),
    t("catalogShowcaseTwo"),
    t("catalogShowcaseThree"),
  ];

  return (
    <VariantGrid>
      <Variant className="w-72" label="slides">
        <Carousel className="w-72">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide}>
                <div className="flex h-28 items-center justify-center rounded-lg border text-sm">
                  {t("catalogShowcaseSlide", { slide })}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselHandler>
            <CarouselButton segment="previous" />
            <CarouselButton segment="next" />
          </CarouselHandler>
        </Carousel>
      </Variant>
    </VariantGrid>
  );
};
