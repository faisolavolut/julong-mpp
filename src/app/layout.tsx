"use client";
import "@/app/globals.css";
import Header from "@/lib/components/partials/Header";
import Script from "@/lib/components/partials/Script";
import { v4 as uuidv4 } from "uuid";
import { navigate } from "@/lib/utils/navigate";
import classnames from "classnames";
import { css } from "@emotion/css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import dotenv from "dotenv";
import { userRoleMe } from "@/lib/utils/getAccess";
import { useLocal } from "@/lib/utils/use-local";
import { userToken } from "@/lib/helpers/user";
dotenv.config();

interface RootLayoutProps {
  children: React.ReactNode;
}
globalThis.cx = classnames;
globalThis.css = css;
globalThis.uuid = uuidv4;
globalThis.navigate = navigate;
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const local = useLocal({
    ready: false,
  });
  const routerInstance = useRouter();
  useEffect(() => {
    setIsClient(true);
    const run = async () => {
      let isUser = false;
      try {
        isUser = await userToken();
      } catch (ex) {}
      if (!isUser) {
        local.ready = true;
        local.render();
      } else {
        try {
          const roles = await userRoleMe();
          globalThis.userRole = roles;
        } catch (ex) {}
        globalThis.router = routerInstance;
        const user = localStorage.getItem("user");
        if (user) {
          const w = window as any;
          w.user = JSON.parse(user);
        }
        local.ready = true;
        local.render();
      }
    };
    run();
  }, []);

  return (
    <html lang="en">
      <head>
        <Header title="Manpower Management" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        />
      </head>
      <body className={`antialiased bg-gray-50 relative`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-THQTXJ7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          ></iframe>
        </noscript>
        <Toaster position="top-right" />
        {isClient ? (
          <>
            {local.ready ? (
              children
            ) : (
              <div className="h-screen w-screen flex flex-row items-center justify-center">
                <div className="spinner-better"></div>
              </div>
            )}
          </>
        ) : (
          <></>
        )}

        <Script />
      </body>
    </html>
  );
};

export default RootLayout;
