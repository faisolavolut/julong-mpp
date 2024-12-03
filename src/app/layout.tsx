"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/partials/Header";
import Script from "@/app/components/partials/Script";
import { v4 as uuidv4 } from "uuid";
import { navigate } from "@/lib/navigate";
import classnames from "classnames";
import { css } from "@emotion/css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from 'sonner';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface RootLayoutProps {
  children: React.ReactNode;
}
globalThis.cx = classnames;
globalThis.css = css;
globalThis.uuid = uuidv4;
globalThis.navigate = navigate;
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const routerInstance = useRouter();
  useEffect(() => {

    globalThis.router = routerInstance;
  }, [])
  return (
    <html lang="en">
      <head>
        <Header title="Julong Phase 2" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-THQTXJ7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          ></iframe>
        </noscript>
        <Toaster />
        {children}
        <Script />
      </body>
    </html>
  );
};

export default RootLayout;