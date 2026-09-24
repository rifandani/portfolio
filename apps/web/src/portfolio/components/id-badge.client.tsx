"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

import { IdBadgeSignature } from "@/portfolio/components/id-badge-signature";
import { buildBarcode, buildMrzLines } from "@/portfolio/utils/id-badge";
import { mountBadgeMotion } from "@/portfolio/utils/id-badge-motion";
import type { BadgeMotion } from "@/portfolio/utils/id-badge-motion";

interface IdBadgeProps {
  portraitSrc: string;
  fullName: string;
  /** The topbar wordmark, woven into the lanyard strap. */
  shortName: string;
  role: string;
  email: string;
  /** Year and month of birth, as `YYYY-MM`. */
  birthMonth: string;
  /** ISO 3166-1 alpha-3, for the machine-readable zone. */
  countryCode: string;
  className?: string;
}

/**
 * The birth month follows the reader's Locale. `YYYY-MM` parses as UTC midnight,
 * so the format reads it in UTC too, or a zone west of UTC shows the month before.
 */
const formatBirthMonth = (yearMonth: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(yearMonth));

/**
 * The About page portrait, printed on an ID badge that hangs from a lanyard.
 *
 * The front carries the portrait, the name, and the role; the back carries
 * the birth month, where he is based, and his email, his signature in pen ink
 * over a microprint line, then a barcode and a machine-readable zone made from
 * the same facts. A
 * visitor drags the card to spin it, or taps it to flip it; the one control is
 * a native button laid over the card, so keyboard and screen reader users flip
 * it the same way (Enter, Space, or the arrow keys for a direction). The face
 * turned away is `inert`, so assistive technology reads only the face in view.
 *
 * Motion lives in `id-badge-motion.ts`. Without script the front shows, still.
 */
export const IdBadge = ({
  portraitSrc,
  fullName,
  shortName,
  role,
  email,
  birthMonth,
  countryCode,
  className,
}: IdBadgeProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const stageRef = useRef<HTMLDivElement>(null);
  const swingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<BadgeMotion | null>(null);
  const [showingBack, setShowingBack] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const swing = swingRef.current;
    const card = cardRef.current;
    if (!stage || !swing || !card) {
      return;
    }
    const motion = mountBadgeMotion({ stage, swing, card }, setShowingBack);
    motionRef.current = motion;
    return () => {
      motion.dispose();
      motionRef.current = null;
    };
  }, []);

  const [mrzName, mrzRole] = buildMrzLines({ fullName, role, countryCode });
  const barcode = buildBarcode(fullName);

  return (
    <div className={twMerge("id-badge select-none", className)}>
      <div ref={swingRef} className="id-badge-swing relative">
        <div aria-hidden="true" className="id-badge-strap">
          <span className="id-badge-strap-weave">
            {`${shortName} · `.repeat(6)}
          </span>
        </div>

        <div ref={stageRef} className="id-badge-stage">
          <div ref={cardRef} className="id-badge-card">
            <div
              data-face="front"
              inert={showingBack}
              className="id-badge-face flex flex-col px-[7cqw] pt-[11cqw]"
            >
              <span aria-hidden="true" className="id-badge-slot" />
              <div className="border-border bg-muted relative min-h-0 flex-1 overflow-hidden rounded-[2.5cqw] border">
                <Image
                  src={portraitSrc}
                  alt={t("aboutPortraitAlt")}
                  fill
                  className="object-cover object-top"
                  draggable={false}
                  loading="eager"
                  unoptimized
                />
              </div>
              <p className="font-display text-fg mt-[5cqw] text-[max(0.8125rem,7.5cqw)]/[1.15] font-semibold tracking-tight text-balance">
                {fullName}
              </p>
              <p className="text-muted-fg mt-[1.5cqw] mb-[7cqw] text-[max(0.6875rem,5cqw)]/[1.3]">
                {role}
              </p>
              <span aria-hidden="true" className="id-badge-stripe" />
            </div>

            <div
              data-face="back"
              inert={!showingBack}
              className="id-badge-face flex flex-col px-[7cqw] pt-[11cqw]"
            >
              <span aria-hidden="true" className="id-badge-slot" />
              <dl className="mt-[4cqw] space-y-[3.5cqw]">
                {[
                  {
                    label: t("aboutIdCardBorn"),
                    value: formatBirthMonth(birthMonth, locale),
                  },
                  {
                    label: t("aboutIdCardBasedIn"),
                    value: t("aboutIdCardCountry"),
                  },
                  { label: t("aboutIdCardEmail"), value: email },
                ].map((field) => (
                  <div key={field.label}>
                    <dt className="text-muted-fg font-mono text-[max(0.5625rem,3.4cqw)]/[1.4] tracking-[0.08em] uppercase">
                      {field.label}
                    </dt>
                    <dd className="text-fg text-[max(0.6875rem,4.8cqw)]/[1.3] font-medium [overflow-wrap:anywhere]">
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto pt-[4cqw]">
                <IdBadgeSignature
                  label={t("aboutIdCardSignatureAlt", { name: fullName })}
                  className="id-badge-ink relative -ml-[1.5cqw] block w-[64%]"
                />
                <div aria-hidden="true" className="id-badge-microline">
                  {`${fullName} · `.repeat(4)}
                </div>
                <p
                  aria-hidden="true"
                  className="text-muted-fg mt-[1.5cqw] text-end font-mono text-[max(0.5625rem,3.4cqw)]/[1.4] tracking-[0.08em] uppercase"
                >
                  {t("aboutIdCardSignature")}
                </p>
              </div>
              <div aria-hidden="true" className="mt-[6cqw] mb-[6cqw]">
                <svg
                  viewBox={`0 0 ${barcode.modules} 1`}
                  preserveAspectRatio="none"
                  className="text-fg block h-[9cqw] w-full"
                >
                  {barcode.bars.map((bar) => (
                    <rect
                      key={bar.x}
                      x={bar.x}
                      width={bar.width}
                      height={1}
                      fill="currentColor"
                    />
                  ))}
                </svg>
                <p className="text-muted-fg mt-[3cqw] overflow-hidden font-mono text-[3.5cqw]/[1.35] tracking-[0.06em] whitespace-pre">
                  {mrzName}
                  {"\n"}
                  {mrzRole}
                </p>
              </div>
              <span aria-hidden="true" className="id-badge-stripe" />
            </div>

            <span
              aria-hidden="true"
              className="id-badge-edge"
              data-edge="left"
            />
            <span
              aria-hidden="true"
              className="id-badge-edge"
              data-edge="right"
            />
          </div>

          <button
            type="button"
            aria-label={t("aboutIdCardFlip")}
            aria-pressed={showingBack}
            className="id-badge-hit"
            onClick={() => {
              if (motionRef.current?.consumeDragClick()) {
                return;
              }
              motionRef.current?.flip(1);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                motionRef.current?.flip(event.key === "ArrowRight" ? 1 : -1);
              }
            }}
          />
        </div>

        <span aria-hidden="true" className="id-badge-clip" />
      </div>

      <p
        aria-hidden="true"
        className="text-muted-fg mt-5 flex items-center justify-center gap-1.5 font-mono text-xs/5"
      >
        <HiOutlineArrowsRightLeft
          aria-hidden="true"
          data-slot="icon"
          className="size-3.5 shrink-0"
        />
        {t("aboutIdCardHint")}
      </p>
    </div>
  );
};
