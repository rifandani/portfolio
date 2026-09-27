"use client";

import { useMount } from "@reactuses/core";
import { useTranslations } from "next-intl";
import Image, { getImageProps } from "next/image";
import type { StaticImageData } from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiPlay,
  HiXMark,
} from "react-icons/hi2";

import { SiteContainer } from "@/core/components/site-container";
import { Button } from "@/core/components/ui/button";
import {
  Carousel,
  CarouselButton,
  CarouselContent,
  CarouselItem,
} from "@/core/components/ui/carousel";
import type { CarouselApi } from "@/core/components/ui/carousel";
import { Heading } from "@/core/components/ui/heading";
import { Loader } from "@/core/components/ui/loader";
import {
  ModalBody,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/core/components/ui/modal";
import { useScrollSpy } from "@/master-design/hooks/use-scroll-spy";

// Static imports give each photo its size and a blur placeholder at build time.
import discussionOne from "../../../public/gallery/hackathon-2023/discussion-1.webp";
import discussionTwo from "../../../public/gallery/hackathon-2023/discussion-2.webp";
import donquixote from "../../../public/gallery/hackathon-2023/donquixote.webp";
import ending from "../../../public/gallery/hackathon-2023/ending.webp";
import onsenOne from "../../../public/gallery/hackathon-2023/onsen-1.webp";
import onsenTwo from "../../../public/gallery/hackathon-2023/onsen-2.webp";
import onsitePoster from "../../../public/gallery/hackathon-2023/onsite-poster.webp";
import pitchOne from "../../../public/gallery/hackathon-2023/pitch-1.webp";
import pitchTwo from "../../../public/gallery/hackathon-2023/pitch-2.webp";
import presentation from "../../../public/gallery/hackathon-2023/presentation.webp";
import streetEvent from "../../../public/gallery/hackathon-2023/street-event.webp";
import sunriseKamata from "../../../public/gallery/hackathon-2023/sunrise-kamata.webp";
import workOne from "../../../public/gallery/hackathon-2023/work-1.webp";
import workTwo from "../../../public/gallery/hackathon-2023/work-2.webp";
import {
  shouldScrollToSection,
  viewerFocusTarget,
  viewerKeyboardAction,
  warmUniqueViewerMedia,
} from "../utils/gallery-logic";

const hackathonMedia = [
  {
    type: "image",
    src: discussionOne,
    titleKey: "galleryDiscussionOne",
    span: "feature",
    priority: true,
  },
  {
    type: "image",
    src: discussionTwo,
    titleKey: "galleryDiscussionTwo",
    span: "tile",
  },
  {
    type: "image",
    src: workOne,
    titleKey: "galleryWorkOne",
    span: "portrait",
  },
  {
    type: "image",
    src: workTwo,
    titleKey: "galleryWorkTwo",
    span: "tile",
  },
  {
    type: "image",
    src: pitchOne,
    titleKey: "galleryPitchOne",
    span: "tile",
  },
  {
    type: "image",
    src: pitchTwo,
    titleKey: "galleryPitchTwo",
    span: "tile",
  },
  {
    type: "image",
    src: presentation,
    titleKey: "galleryPresentation",
    span: "wide",
  },
  {
    type: "video",
    src: "/gallery/hackathon-2023/onsite.mp4",
    // The first frame of the video, so the poster does not jump on play.
    poster: onsitePoster,
    titleKey: "galleryOnsiteVideo",
    span: "wide",
  },
  {
    type: "image",
    src: ending,
    titleKey: "galleryEnding",
    span: "tile",
  },
  {
    type: "image",
    src: donquixote,
    titleKey: "galleryDonquixote",
    span: "tile",
  },
  {
    type: "image",
    src: onsenOne,
    titleKey: "galleryOnsenOne",
    span: "portrait",
  },
  {
    type: "image",
    src: onsenTwo,
    titleKey: "galleryOnsenTwo",
    span: "portrait",
  },
  {
    type: "image",
    src: streetEvent,
    titleKey: "galleryStreetEvent",
    span: "wide",
  },
  {
    type: "image",
    src: sunriseKamata,
    titleKey: "galleryKamataNight",
    span: "portrait",
  },
] as const;

const gallerySections = [
  {
    id: "hackathon-2023",
    titleKey: "galleryHackathonTitle",
    introKey: "galleryHackathonIntro",
    media: hackathonMedia,
  },
] as const;

const gallerySectionIds: string[] = gallerySections.map(
  (section) => section.id
);

const spanClass = {
  feature: "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2",
  portrait: "row-span-2",
  wide: "col-span-2",
  tile: "",
} as const;

// Widths match the grid: 2 columns below 64rem, 4 columns in the 64rem
// container at and above it. A portrait cell is 2 rows tall, and the photo
// covers it, so it needs more width than its column.
const spanSizes = {
  feature: "(min-width: 64rem) 32rem, 100vw",
  portrait: "(min-width: 64rem) 24rem, 50vw",
  wide: "(min-width: 64rem) 32rem, 100vw",
  tile: "(min-width: 64rem) 16rem, 50vw",
} as const;

// The viewer is at most 72rem wide, less the two arrow buttons.
const viewerSizes = "(min-width: 72rem) 58rem, 100vw";

type GalleryMediaItem = (typeof hackathonMedia)[number];

const previewOf = (item: GalleryMediaItem): StaticImageData =>
  item.type === "video" ? item.poster : item.src;

const posterUrlOf = (poster: StaticImageData) =>
  getImageProps({ alt: "", src: poster, width: 960 }).props.src;

const warmedUrls = new Set<string>();

/**
 * Starts the download of the viewer-size file, so the viewer shows it without
 * a wait. The browser picks the same `srcset` candidate as the viewer image,
 * and keeps it in its cache.
 */
const warmViewerMedia = (item: GalleryMediaItem) => {
  warmUniqueViewerMedia(
    item,
    warmedUrls,
    (media) => {
      if (media.type === "video") {
        return { url: posterUrlOf(media.poster) };
      }
      const { props } = getImageProps({
        alt: "",
        fill: true,
        sizes: viewerSizes,
        src: media.src,
      });
      return {
        lowPriority: true,
        sizes: props.sizes ?? viewerSizes,
        srcSet: props.srcSet ?? "",
        url: props.src,
      };
    },
    (request) => {
      const image = new window.Image();
      if (request.lowPriority) {
        image.fetchPriority = "low";
      }
      // Set `sizes` and `srcset` before `src`, or the browser fetches `src` first.
      if (request.sizes) {
        image.sizes = request.sizes;
      }
      if (request.srcSet) {
        image.srcset = request.srcSet;
      }
      image.src = request.url;
    }
  );
};

const ViewerImage = ({
  item,
}: {
  item: GalleryMediaItem & { type: "image" };
}) => {
  const t = useTranslations();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* The grid photo is in the cache already: same file, same `sizes`. It
          shows at once, and the sharp photo fades in on top of it. */}
      <Image
        alt=""
        aria-hidden="true"
        fill
        loading="eager"
        placeholder="blur"
        sizes={spanSizes[item.span]}
        src={item.src}
        style={{ objectFit: "contain" }}
      />
      <Image
        alt={t(item.titleKey)}
        className={`transition-opacity duration-300 motion-reduce:transition-none ${isLoaded ? "opacity-100" : "opacity-0"}`}
        fetchPriority="high"
        fill
        loading="eager"
        onLoad={() => setIsLoaded(true)}
        sizes={viewerSizes}
        src={item.src}
        style={{ objectFit: "contain" }}
      />
      {!isLoaded && (
        // Show the loader only when the load is slow, so a cached photo does
        // not flash it.
        <span className="absolute bottom-3 left-1/2 grid size-10 -translate-x-1/2 place-items-center rounded-full bg-black/60 text-white transition-opacity delay-300 duration-200 motion-reduce:transition-none starting:opacity-0">
          <Loader aria-label={t("galleryLoadingMedia")} className="size-5" />
        </span>
      )}
    </>
  );
};

const ViewerVideo = ({
  item,
  isActive,
}: {
  item: GalleryMediaItem & { type: "video" };
  isActive: boolean;
}) => {
  const t = useTranslations();
  const videoRef = useRef<HTMLVideoElement>(null);

  // A slide next to the active slide stays mounted. Stop the video when the
  // viewer moves away from it.
  useEffect(() => {
    if (!isActive) {
      videoRef.current?.pause();
    }
  }, [isActive]);

  return (
    <video
      aria-label={t(item.titleKey)}
      className="mx-auto h-full max-h-full w-full rounded-md bg-black object-contain"
      controls
      playsInline
      poster={posterUrlOf(item.poster)}
      preload="metadata"
      ref={videoRef}
      src={item.src}
    >
      <track
        default
        kind="captions"
        label="English"
        src="/gallery/hackathon-2023/onsite.en.vtt"
        srcLang="en"
      />
    </video>
  );
};

const viewerOptions = {
  // A drag on the video controls seeks the video. It does not move the slide.
  watchDrag: (_api: CarouselApi, event: MouseEvent | TouchEvent) =>
    !(event.target instanceof HTMLMediaElement),
  breakpoints: {
    "(prefers-reduced-motion: reduce)": { duration: 0 },
  },
} as const;

const navigationButtonClass =
  "group/gallery-navigation z-10 size-16 shrink-0 rounded-none border-0 bg-transparent p-0 text-white hover:bg-transparent disabled:opacity-30 sm:size-20";

const navigationIconClass =
  "grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 group-hover/gallery-navigation:bg-white/20 sm:size-10";

const GalleryMedia = ({
  item,
  index,
  onOpen,
}: {
  item: GalleryMediaItem;
  index: number;
  onOpen: (index: number) => void;
}) => {
  const t = useTranslations();
  const title = t(item.titleKey);
  const isVideo = item.type === "video";

  return (
    <li className={`min-h-0 min-w-0 ${spanClass[item.span]}`} value={index + 1}>
      <Button
        aria-label={
          isVideo
            ? t("galleryPlayMedia", { title })
            : t("galleryViewMedia", { title })
        }
        className="group/gallery-media bg-card focus-visible:outline-ring relative block h-full min-h-36 w-full overflow-hidden rounded-lg text-start outline-0 focus-visible:outline-2 focus-visible:outline-offset-4 forced-colors:outline-[Highlight]"
        intent="plain"
        // Start the large file on hover, focus, or touch, before the press.
        onFocus={() => warmViewerMedia(item)}
        onHoverStart={() => warmViewerMedia(item)}
        onPress={() => onOpen(index)}
        onPressStart={() => warmViewerMedia(item)}
      >
        <span className="absolute inset-0">
          <Image
            alt=""
            className="object-cover transition-[filter] duration-300 group-hover/gallery-media:brightness-90 motion-reduce:transition-none"
            fill
            placeholder="blur"
            preload={item.type === "image" && "priority" in item}
            sizes={spanSizes[item.span]}
            src={previewOf(item)}
          />
        </span>
        {isVideo && (
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center text-white"
          >
            <span className="grid size-12 place-items-center rounded-full border border-white/70 bg-black/55 shadow-sm backdrop-blur-sm">
              <HiPlay className="size-5 translate-x-px" />
            </span>
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/20 to-transparent px-3 pt-12 pb-3 text-sm/5 font-medium text-white sm:px-4 sm:pb-4">
          {title}
        </span>
      </Button>
    </li>
  );
};

const MediaViewer = ({
  startIndex,
  onClose,
}: {
  startIndex: number;
  onClose: () => void;
}) => {
  const t = useTranslations();
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [viewerApi, setViewerApi] = useState<CarouselApi>();
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const activeMedia = hackathonMedia[activeIndex];

  const onViewerKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const action = viewerKeyboardAction(
      event.key,
      event.defaultPrevented,
      event.target instanceof HTMLMediaElement
    );
    if (action === "close") {
      event.preventDefault();
      onClose();
      return;
    }
    if (action === "previous") {
      event.preventDefault();
      viewerApi?.scrollPrev();
    } else if (action === "next") {
      event.preventDefault();
      viewerApi?.scrollNext();
    }
  });

  // Listen on the document, not in the viewer. When the viewer opens, focus
  // is on the dialog element itself, and its children do not get those keys.
  useEffect(() => {
    document.addEventListener("keydown", onViewerKeyDown);
    return () => document.removeEventListener("keydown", onViewerKeyDown);
  }, []);

  useEffect(() => {
    if (!viewerApi) {
      return;
    }
    const onSelect = (api: NonNullable<CarouselApi>) => {
      const index = api.selectedScrollSnap();
      // The arrow toward the edge becomes disabled at the first or last
      // media. A disabled button drops focus to the body, outside the dialog.
      // Move focus to the opposite arrow first.
      const focusTarget = viewerFocusTarget(
        index,
        hackathonMedia.length - 1,
        document.activeElement === previousButtonRef.current,
        document.activeElement === nextButtonRef.current
      );
      if (focusTarget === "next") {
        nextButtonRef.current?.focus();
      }
      if (focusTarget === "previous") {
        previousButtonRef.current?.focus();
      }
      setActiveIndex(index);
    };
    viewerApi.on("select", onSelect);
    return () => {
      viewerApi.off("select", onSelect);
    };
  }, [viewerApi]);

  // Warm the photos on each side, so an arrow press shows them without a wait.
  useEffect(() => {
    for (const index of [activeIndex + 1, activeIndex - 1]) {
      const item = hackathonMedia[index];
      if (item) {
        warmViewerMedia(item);
      }
    }
  }, [activeIndex]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ModalHeader className="flex flex-row items-center justify-between gap-4 p-4 sm:p-6">
        <div className="min-w-0">
          <ModalTitle className="text-white">
            {activeMedia && t(activeMedia.titleKey)}
          </ModalTitle>
          <p
            aria-atomic="true"
            aria-live="polite"
            className="mt-1 text-sm/5 text-white/70"
          >
            {t("galleryMediaPosition", {
              current: activeIndex + 1,
              total: hackathonMedia.length,
            })}
          </p>
        </div>
        <ModalClose
          aria-label={t("galleryCloseViewer")}
          className="shrink-0 text-white hover:bg-white/15 focus-visible:ring-white"
        >
          <HiXMark aria-hidden="true" className="size-5" />
        </ModalClose>
      </ModalHeader>
      <ModalBody className="min-h-0 flex-1 overflow-hidden px-2 pt-0 pb-4 sm:px-6 sm:pb-6">
        <Carousel
          aria-label={t("galleryTitle")}
          className="flex h-full min-h-0 items-center gap-2 sm:gap-4"
          opts={{ ...viewerOptions, startIndex }}
          setApi={setViewerApi}
        >
          <CarouselButton
            aria-label={t("galleryPreviousMedia")}
            className={navigationButtonClass}
            intent="plain"
            isCircle={false}
            ref={previousButtonRef}
            segment="previous"
            size="sq-lg"
          >
            <span aria-hidden="true" className={navigationIconClass}>
              <HiChevronLeft />
            </span>
          </CarouselButton>
          {/* The carousel viewport is the first child. It must fill
              the height, so the media can scale to fit. */}
          <div className="h-full min-w-0 flex-1 *:h-full">
            <CarouselContent className="h-full">
              {hackathonMedia.map((item, index) => {
                const isActive = index === activeIndex;
                // Mount only the active media and the media on each
                // side, so the viewer does not load all large files.
                const isNear = Math.abs(index - activeIndex) <= 1;
                return (
                  <CarouselItem
                    className="h-full"
                    inert={!isActive}
                    key={item.titleKey}
                  >
                    <div className="relative flex h-full min-h-0 items-center justify-center">
                      {isNear &&
                        (item.type === "video" ? (
                          <ViewerVideo isActive={isActive} item={item} />
                        ) : (
                          <ViewerImage item={item} />
                        ))}
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </div>
          <CarouselButton
            aria-label={t("galleryNextMedia")}
            className={navigationButtonClass}
            intent="plain"
            isCircle={false}
            ref={nextButtonRef}
            segment="next"
            size="sq-lg"
          >
            <span aria-hidden="true" className={navigationIconClass}>
              <HiChevronRight />
            </span>
          </CarouselButton>
        </Carousel>
      </ModalBody>
    </div>
  );
};

export const GalleryExperience = () => {
  const t = useTranslations();
  const [openMediaIndex, setOpenMediaIndex] = useState<number | null>(null);
  const initialHashRef = useRef(
    globalThis.window?.location.hash.slice(1) ?? ""
  );
  const { activeId, scrollTo } = useScrollSpy(gallerySectionIds);

  const closeMedia = () => setOpenMediaIndex(null);

  useMount(() => {
    const hash = initialHashRef.current;
    if (hash && gallerySectionIds.includes(hash)) {
      requestAnimationFrame(() => scrollTo(hash));
    }
  });

  return (
    <SiteContainer className="py-12 sm:py-16">
      <header>
        <Heading className="text-3xl/10 sm:text-4xl/12" level={1}>
          {t("galleryTitle")}
        </Heading>
        <p className="text-muted-fg mt-3 text-base/7 text-pretty">
          {t("galleryIntro")}
        </p>
      </header>

      <nav
        aria-label={t("gallerySections")}
        className="border-border paper-surface sticky top-14 z-10 mt-9 border-y"
      >
        <ul className="flex min-h-12 items-center gap-6 overflow-x-auto">
          {gallerySections.map((section) => (
            <li key={section.id}>
              <a
                aria-current={activeId === section.id ? "location" : undefined}
                className="text-muted-fg hover:text-fg aria-[current=location]:text-fg aria-[current=location]:border-primary focus-visible:outline-ring inline-flex min-h-12 items-center border-b-2 border-transparent text-sm/6 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
                href={`#${section.id}`}
                onClick={(event) => {
                  if (shouldScrollToSection(event)) {
                    event.preventDefault();
                    scrollTo(section.id);
                  }
                }}
              >
                {t(section.titleKey)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {gallerySections.map((section) => (
        <section
          aria-labelledby={`${section.id}-title`}
          className="scroll-mt-28 pt-10 sm:pt-14"
          id={section.id}
          key={section.id}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <Heading
              className="text-2xl/8 sm:text-3xl/10"
              id={`${section.id}-title`}
              level={2}
            >
              {t(section.titleKey)}
            </Heading>
            <span className="text-muted-fg font-mono text-xs/5 tabular-nums">
              {t("galleryItemCount", { count: section.media.length })}
            </span>
          </div>
          <p className="text-muted-fg mt-2 text-sm/6 text-pretty">
            {t(section.introKey)}
          </p>

          <ol className="mt-7 grid auto-rows-[clamp(8rem,18vw,14rem)] grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
            {section.media.map((item, index) => (
              <GalleryMedia
                index={index}
                item={item}
                key={item.titleKey}
                onOpen={setOpenMediaIndex}
              />
            ))}
          </ol>
        </section>
      ))}

      <ModalContent
        closeButton={false}
        dialogClassName="h-full"
        isDismissable={false}
        isOpen={openMediaIndex !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeMedia();
          }
        }}
        overlay={{ className: "bg-black/90 backdrop-blur-none" }}
        size="fullscreen"
        className="mx-auto h-[calc(var(--visual-viewport-height,100vh)-2rem)] w-full max-w-6xl bg-transparent text-white shadow-none ring-0 sm:rounded-none"
      >
        {openMediaIndex === null ? null : (
          <MediaViewer onClose={closeMedia} startIndex={openMediaIndex} />
        )}
      </ModalContent>
    </SiteContainer>
  );
};
