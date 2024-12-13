import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Bicing Wrapped",
  description: "El teu resum de Bicing a 2024",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Bicing Wrapped",
    description: "El teu resum de Bicing a 2024",
    url: "https://wrapped.bcn.bike",
    siteName: "wrapped.bcn.bike",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@crodriguezanton",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ca" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          {children}
          <Toaster richColors />
          <Analytics />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
