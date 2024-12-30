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
import { Sticker } from "lucide-react";
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
    ready: false,
    data: null as any,
    can_approval: false,
  });
  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      try {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/need-approval`
        );
        if (res?.data?.data) {
          local.data = res?.data?.data;
          local.can_add = true;
        }
      } catch (ex) {}
      local.can_approval = getAccess("approval-batch-ceo", roles);
      local.ready = true;
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
        {local.ready && (
          <div className="flex flex-grow flex-col">
            {!local.data ? (
              <div
                className={cx(
                  "flex-1 w-full inset-0 flex flex-col items-center justify-center"
                )}
              >
                <div className="max-w-[15%] flex flex-col items-center">
                  <Sticker size={35} strokeWidth={1} />
                  <div className="pt-1 text-center">No&nbsp;Approval</div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-grow bg-[#525659] overflow-y-scroll flex-col items-center relative">
                  <PDFViewer className="flex-grow w-full">
                    <MyDocument data={local.data} />
                  </PDFViewer>
                </div>
                {local.can_approval && (
                  <div className="flex flex-row items-center justify-center">
                    <div className="flex flex-row gap-x-1 py-2">
                      <AlertCeoReject lc={local} />
                      <AlertCeoApprove fm={local} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
