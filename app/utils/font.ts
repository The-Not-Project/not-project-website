import localFont from "next/font/local";

export const georgia = localFont({
  src: [
    {
      path: "../../public/fonts/georgia/georgia.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/georgia/georgiai.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/georgia/georgiab.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/georgia/georgiaz.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-georgia",
  display: "swap",
});