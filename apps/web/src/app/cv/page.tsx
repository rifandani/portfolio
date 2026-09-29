import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { SiteContainer } from "@/core/components/site-container";
import { SiteShell } from "@/core/components/site-shell";
import { createMetadata } from "@/core/utils/seo";
import { CvPrintButton } from "@/portfolio/components/cv-print-button.client";
import {
  aboutContent,
  experienceEntries,
  portfolioIdentity,
} from "@/portfolio/constants/portfolio";

import styles from "./cv.module.css";

const formatMonth = (yearMonth: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(yearMonth));

const currentRole =
  experienceEntries.find((entry) => entry.isCurrent)?.role ??
  portfolioIdentity.role;

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return createMetadata({
    title: t("cvTitle"),
    description: `${portfolioIdentity.fullName} · ${currentRole}`,
    path: "/cv",
  });
};

export default async function CvPage() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);

  return (
    <SiteShell>
      <SiteContainer className={styles.pageContainer}>
        <div className={styles.toolbar}>
          <CvPrintButton />
        </div>

        <article className={styles.document} data-cv-document>
          <header className={styles.masthead}>
            <div>
              <h1 className={styles.name}>{portfolioIdentity.fullName}</h1>
              <p className={styles.role}>{currentRole}</p>
            </div>
            <address className={styles.contact}>
              <span className={styles.contactLabel}>{t("cvContact")}</span>
              <a href={`mailto:${aboutContent.email}`}>{aboutContent.email}</a>
            </address>
          </header>

          <section aria-labelledby="cv-experience-heading">
            <h2 className={styles.sectionHeading} id="cv-experience-heading">
              {t("cvWorkExperience")}
            </h2>

            <div className={styles.entries}>
              {experienceEntries.map((entry) => (
                <article className={styles.entry} key={entry.id}>
                  <header className={styles.entryHeading}>
                    <div>
                      <h3 className={styles.entryRole}>{entry.role}</h3>
                      <p className={styles.company}>{entry.company}</p>
                    </div>
                    <p className={styles.dates}>
                      <time dateTime={entry.start}>
                        {formatMonth(entry.start, locale)}
                      </time>
                      <span aria-hidden="true"> – </span>
                      {entry.end ? (
                        <time dateTime={entry.end}>
                          {formatMonth(entry.end, locale)}
                        </time>
                      ) : (
                        <span>{t("experiencePresent")}</span>
                      )}
                    </p>
                  </header>

                  <div className={styles.projects}>
                    {entry.projects.map((project) => (
                      <section
                        aria-labelledby={`${project.id}-heading`}
                        className={styles.project}
                        key={project.id}
                      >
                        <h4
                          className={styles.projectHeading}
                          id={`${project.id}-heading`}
                        >
                          {t(project.nameKey)}
                        </h4>
                        <ul className={styles.highlights}>
                          {project.highlightKeys.map((highlightKey) => (
                            <li key={highlightKey}>
                              <span aria-hidden="true">-</span>
                              <span>{t(highlightKey)}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </article>
      </SiteContainer>
    </SiteShell>
  );
}
