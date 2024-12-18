"use client";
import { AlertCeoApprove } from "@/app/components/comp/AlertCeoApprove";
import { AlertCeoReject } from "@/app/components/comp/AlertCeoReject";
import { TableList } from "@/app/components/tablelist/TableList";
import { ButtonBetter } from "@/app/components/ui/button";
import { ButtonLink } from "@/app/components/ui/button-link";
import MyDocument from "@/app/components/ui/Document";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
import { events } from "@/lib/event";
import { accessMe, getAccess, userRoleMe } from "@/lib/getAccess";
import { getValue } from "@/lib/getValue";
import { useLocal } from "@/lib/use-local";
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);
import { Button } from "flowbite-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { IoEye } from "react-icons/io5";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
    client: false,
  });
  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      const access = getAccess("create-mpp", roles);
      if (access) {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods/current?status=open`
        );
        if (res?.data?.data) {
          local.can_add = true;
        }
      }
      const edit = getAccess("edit-mpp", roles);
      local.can_edit = edit;
      local.render();
    };
    run();
  }, []);
  if (typeof window === "undefined") notFound();
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4 pt-0">
        <h2 className="text-xl font-semibold text-gray-900 ">
          <span className="">Manpower Planning Overview</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
        <div className="flex flex-grow flex-col">
          <div className="flex flex-grow bg-[#525659] overflow-y-scroll flex-col items-center relative">
            <PDFViewer className="flex-grow w-full">
              <MyDocument />
            </PDFViewer>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row gap-x-1 py-2">
              <AlertCeoReject/>
              <AlertCeoApprove/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
