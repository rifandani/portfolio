import { describe, expect, it } from "vitest";

import { rulerOf, stampOf } from "./postmark";

describe("stampOf", () => {
  it("splits an ISO date into month, day, year, and a long full date in UTC", () => {
    expect(stampOf("2024-03-15T12:00:00.000Z", "en-US")).toEqual({
      month: "Mar",
      day: "15",
      year: "2024",
      full: "March 15, 2024",
    });
  });

  it("formats the month in the reader locale", () => {
    expect(stampOf("2024-03-15T12:00:00.000Z", "id-ID").month).toBe("Mar");
  });

  it("keeps day and year from the ISO string so UTC midnight cannot shift the stamp", () => {
    expect(stampOf("2024-01-01T23:59:59.999Z", "en-US")).toMatchObject({
      day: "01",
      year: "2024",
    });
  });
});

describe("rulerOf", () => {
  it("uses the minimum scale when a Post is shorter than ten minutes", () => {
    expect(rulerOf(3)).toEqual({ minutes: 3, scale: 10 });
  });

  it("matches scale to minutes between ten and forty", () => {
    expect(rulerOf(25)).toEqual({ minutes: 25, scale: 25 });
  });

  it("caps minutes and scale at forty for a long Post", () => {
    expect(rulerOf(90)).toEqual({ minutes: 40, scale: 40 });
  });
});
