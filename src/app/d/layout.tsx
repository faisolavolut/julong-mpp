"use client";
import "@/app/globals.css";
import NavFlow from "@/app/components/partials/NavbarFlow";
import Footer from "@/app/components/partials/Footer";

import { SidebarProvider } from "@/context/SidebarContext";
import SidebarTree from "@/app/components/partials/Sidebar";
import { HiChartPie, HiCubeTransparent } from "react-icons/hi";
import { LuUsers } from "react-icons/lu";
import { configMenu } from "./config-menu";

interface RootLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<RootLayoutProps> = ({ children }) => {
  
  return (
    <div className="flex h-screen flex-col">
      <NavFlow />
      <div className="flex  bg-white flex-grow flex-row">
        <SidebarProvider>
          <SidebarTree
            data={configMenu}
          />
        </SidebarProvider>
        <div className="flex flex-row flex-grow bg-gray-500 flex-grow">
          <div
            id="main-content"
            className="flex-grow bg-gray-50 relative overflow-y-auto bg-white flex flex-row"
          >
            <main className="absolute top-0 left-0 w-full bg-white h-full flex flex-row">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
