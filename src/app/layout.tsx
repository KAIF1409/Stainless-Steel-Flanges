import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";

/* Self-hosted via next/font: preloaded in <head>, metric-adjusted fallback
   (no layout shift on swap), latin subsets only. */
const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-latin-600-normal.woff2",
  weight: "600",
  display: "swap",
  variable: "--font-space-grotesk",
});

const inter = localFont({
  src: [
    { path: "../fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://bhansalistainless.vercel.app";
// GTM loads only when a real container ID is provided via NEXT_PUBLIC_GTM_ID
// (see .env.example). The placeholder must never fire a gtm.js request; the
// generate_lead dataLayer event in EnquiryForm works with or without GTM.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Stainless Steel Flanges Exporter | ASTM A182 / ASME B16.5 | Bhansali Stainless",
  description:
    "Stainless steel flanges in grades 304, 316 and 316L, manufactured to ASTM A182 / ASME B16.5 and exported to Saudi Arabia, the UAE and the GCC. EN 10204 3.1 documentation, 15-20 day dispatch.",
  keywords: [
    "stainless steel flanges exporter",
    "ASTM A182 flanges",
    "ASME B16.5 flanges",
    "SS 316 flanges Saudi Arabia",
    "stainless steel flanges UAE",
    "weld neck flange manufacturer India",
  ],
  openGraph: {
    title: "Stainless Steel Flanges Exporter | Bhansali Stainless",
    description:
      "ASTM A182 / ASME B16.5 stainless steel flanges in 304, 316 and 316L, exported to the GCC with EN 10204 3.1 documentation.",
    url: SITE_URL,
    siteName: "Bhansali Stainless",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stainless Steel Flanges Exporter | Bhansali Stainless",
    description:
      "ASTM A182 / ASME B16.5 stainless steel flanges in 304, 316 and 316L, exported to the GCC with EN 10204 3.1 documentation.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {GTM_ID ? (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        ) : null}
      </head>
      <body className="min-h-full bg-paper text-ink">
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        {children}
      </body>
    </html>
  );
}
