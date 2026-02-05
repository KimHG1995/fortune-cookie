import type { ReactElement } from "react";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import ErrorBoundary from "@/app/(core)/error-boundary";
import SiteFooter from "@/app/components/site-footer";
import SiteHeader from "@/app/components/site-header";
import type { RootLayoutProps } from "@/models/types/app/root-layout-props";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const buildClarityScript = (clarityId: string): string => {
  return `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`;
};

export default function RootLayout({ children }: RootLayoutProps): ReactElement {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const clarityScript = clarityId ? (
    <script
      dangerouslySetInnerHTML={{ __html: buildClarityScript(clarityId) }}
    />
  ) : null;

  return (
    <html lang="en">
      <head>{clarityScript}</head>
      <body className={`${spaceGrotesk.variable} ${cormorantGaramond.variable}`}>
        <ErrorBoundary>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ErrorBoundary>
      </body>
    </html>
  );
}
