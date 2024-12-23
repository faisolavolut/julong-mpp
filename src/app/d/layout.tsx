"use client";
import "@/app/globals.css";
import NavFlow from "@/app/components/partials/NavbarFlow";
import Footer from "@/app/components/partials/Footer";

import { SidebarProvider } from "@/context/SidebarContext";
import SidebarTree from "@/app/components/partials/Sidebar";
import { HiChartPie, HiCubeTransparent } from "react-icons/hi";
import { LuUsers } from "react-icons/lu";
import { configMenu } from "./config-menu";
import { useLocal } from "@/lib/use-local";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import get from "lodash.get";
interface RootLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [mini, setMini] = useState(false);
  const local = useLocal({
    user: null as any,
  });
  useEffect(() => {
    const localMini = localStorage.getItem("mini");
    if (!localMini) {
      localStorage.setItem("mini", mini ? "true" : "false");
    } else {
      setMini(localMini === "true" ? true : false);
    }
    const run = async () => {
      try {
        const user = await api.get(
          `${process.env.NEXT_PUBLIC_API_PORTAL}/api/users/me`
        );
        local.user = user?.data?.data;
        local.render();
        if (!user?.data.data) {
          navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
        }
      } catch (e) {
        navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
      }
    };
    run();
  }, []);
  return (
    <div className="flex h-screen flex-col">
      <NavFlow
        minimaze={() => {
          setMini(!mini);
          localStorage.setItem("mini", !mini ? "true" : "false");
        }}
      />
      <div className="flex  bg-white flex-grow flex-row">
        <SidebarProvider>
          <SidebarTree
            data={configMenu}
            minimaze={() => {
              setMini(!mini);
            }}
            mini={mini}
          />
        </SidebarProvider>
        <div className="flex flex-row flex-grow  bg-[#F1F1F1] flex-grow">
          <div
            id="main-content"
            className="flex-grow  relative overflow-y-auto flex flex-row"
          >
            <div className="w-full h-full absolute top-0 lef-0 flex flex-row  p-10">
              {typeof window === "object" ? (
                get(window, "user") ? (
                  <main className="flex-grow flex flex-col">{children}</main>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
