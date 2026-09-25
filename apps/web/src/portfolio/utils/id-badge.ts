/**
 * Print data for the About page's ID badge: the machine-readable zone and the
 * barcode on its back. Both are made from real facts (the name, the role, the
 * country), so the card never prints a number that means nothing. They are
 * decoration, so the badge hides them from assistive technology — the same
 * facts are printed in plain words beside them.
 */

/** A TD1 identity card prints its machine-readable zone 30 characters wide. */
export const MRZ_WIDTH = 30;

/** Upper-case, strip diacritics, and turn every other character into a filler. */
const toMrzField = (value: string) =>
  value
    .normalize("NFD")
    .replaceAll(/\p{Diacritic}/gu, "")
    .toUpperCase()
    .replaceAll(/[^A-Z0-9]+/gu, "<")
    .replaceAll(/^<+|<+$/gu, "");

const fitMrzLine = (line: string) =>
  line.slice(0, MRZ_WIDTH).padEnd(MRZ_WIDTH, "<");

/**
 * Two lines in the ICAO 9303 style: document code, the ISO country code, then
 * `SURNAME<<GIVEN<NAMES`; the second line carries the role. The surname is the
 * last word of the full name.
 */
export const buildMrzLines = ({
  fullName,
  role,
  countryCode,
}: {
  fullName: string;
  role: string;
  countryCode: string;
}): [string, string] => {
  const words = fullName.trim().split(/\s+/u);
  /* v8 ignore next -- @preserve split always yields at least one word, so `at(-1)` is never undefined */
  const surname = words.at(-1) ?? "";
  const givenNames = words.slice(0, -1).join(" ");
  const name = [toMrzField(surname), toMrzField(givenNames)]
    .filter(Boolean)
    .join("<<");
  return [
    fitMrzLine(`I<${toMrzField(countryCode)}${name}`),
    fitMrzLine(toMrzField(role)),
  ];
};

/** One bar of the badge barcode, in module units. */
export interface BarcodeBar {
  x: number;
  width: number;
}

/** A barcode: its bars, and its full width in modules. */
export interface Barcode {
  bars: BarcodeBar[];
  modules: number;
}

/** Bit `index` of `value`, counted from the least significant. */
const bitAt = (value: number, index: number) =>
  Math.floor(value / 2 ** index) % 2;

/**
 * A stable bar pattern for a string: a guard, then one bar per set bit of each
 * character code, with a bar's width taken from the bit's neighbour. It is not a
 * real symbology — no scanner reads it — but the same name always prints the
 * same code, so it reads as data rather than as a random texture.
 */
export const buildBarcode = (value: string): Barcode => {
  const bars: BarcodeBar[] = [
    { x: 0, width: 1 },
    { x: 2, width: 1 },
  ];
  let x = 4;
  for (const char of value) {
    /* v8 ignore next -- @preserve a string iterator yields non-empty characters, so `codePointAt(0)` is never undefined */
    const code = char.codePointAt(0) ?? 0;
    for (let bit = 6; bit >= 0; bit -= 1) {
      const width = bitAt(code, (bit + 3) % 7) === 1 ? 2 : 1;
      if (bitAt(code, bit) === 1) {
        bars.push({ x, width });
      }
      x += width + 1;
    }
  }
  bars.push({ x, width: 1 }, { x: x + 2, width: 1 });
  return { bars, modules: x + 3 };
};
