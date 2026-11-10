import { IBM_Plex_Mono, Quicksand, Roboto } from "next/font/google";

const fontSans = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const fontDisplay = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

/**
 * The three faces as CSS variables, for `<body>`. One module for the root
 * layout and `global-error`, which replaces the layout and so brings its own
 * `<body>`: a second set of loader calls would ship the files twice.
 */
export const fontVariables = `${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`;
