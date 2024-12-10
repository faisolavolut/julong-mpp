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
interface RootLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [mini, setMini] = useState(false);
  useEffect(() => {
    const localMini = localStorage.getItem("mini");
    if (!localMini) {
      localStorage.setItem("mini", mini ? "true" : "false");
    } else {
      setMini(localMini === "true" ? true : false);
    }
    const run = async () => {
      const user = await api.get("https://julong-portal.avolut.com/api/users/me")
    }
    run() 
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
            <main className="flex-grow p-10 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
