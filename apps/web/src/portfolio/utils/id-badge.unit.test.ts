import { describe, expect, it } from "vitest";

import { MRZ_WIDTH, buildBarcode, buildMrzLines } from "./id-badge";

describe("buildMrzLines", () => {
  const lines = buildMrzLines({
    fullName: "Tri Rizeki Rifandani",
    role: "Software Engineer",
    countryCode: "IDN",
  });

  it("prints the surname first, then the given names", () => {
    expect(lines[0]).toBe("I<IDNRIFANDANI<<TRI<RIZEKI<<<<");
  });

  it("carries the role on the second line", () => {
    expect(lines[1]).toBe("SOFTWARE<ENGINEER<<<<<<<<<<<<<");
  });

  it("keeps both lines at the TD1 width", () => {
    expect(lines.map((line) => line.length)).toEqual([MRZ_WIDTH, MRZ_WIDTH]);
  });

  it("strips diacritics and cuts a long name at the width", () => {
    const [first] = buildMrzLines({
      fullName: "Émile Zoë Ångström-Bartholomew-Featherstonehaugh",
      role: "",
      countryCode: "IDN",
    });
    expect(first).toHaveLength(MRZ_WIDTH);
    expect(first).toMatch(/^I<IDNANGSTROM<BARTHOLOMEW<FEAT/u);
  });
});

describe("buildBarcode", () => {
  it("prints the same bars for the same value", () => {
    expect(buildBarcode("Rizki")).toEqual(buildBarcode("Rizki"));
  });

  it("prints different bars for a different value", () => {
    expect(buildBarcode("Rizki")).not.toEqual(buildBarcode("Rizka"));
  });

  it("keeps every bar inside the module count", () => {
    const { bars, modules } = buildBarcode("Tri Rizeki Rifandani");
    for (const bar of bars) {
      expect(bar.x + bar.width).toBeLessThanOrEqual(modules);
    }
  });
});
