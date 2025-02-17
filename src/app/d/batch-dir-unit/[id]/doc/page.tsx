"use client";
import { AlertDirekturApproveMPP } from "@/app/components/comp/AlertDirekturApproveMPP";
import { AlertDirekturRejectMPP } from "@/app/components/comp/AlertDirekturRejectMPP";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import MyDocument from "@/lib/components/ui/Document";
import api from "@/lib/utils/axios";
import { getParams } from "@/lib/utils/get-params";
import { getAccess, userRoleMe } from "@/lib/utils/getAccess";
import { useLocal } from "@/lib/utils/use-local";
import get from "lodash.get";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

function Page() {
  const id = getParams("id");
  const [isReady, setIsReady] = useState(false);
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
        const needApproval = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/status?status=NEED APPROVAL&approver_type=DIRECTOR`
        );
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/find-document/${id}`
        );
        if (res?.data?.data) {
          local.data = res?.data?.data;
          local.can_add = true;

          local.can_approval =
            get(needApproval, "data.data[0].id") === id
              ? getAccess("approval-batch-direktur", roles)
              : false;
        }
      } catch (ex) {}
      local.ready = true;
      local.render();
      console.log(local.can_approval);
    };
    run();
  }, []);
  if (typeof window === "undefined") notFound();
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4 pt-0">
        <h2 className="text-xl font-semibold text-gray-900 ">
          <span className="">Manpower Planning Request</span>
        </h2>
        <BreadcrumbBetterLink
          data={[
            {
              title: "List Manpower Planning Overview",
              url: "/d/batch-dir-unit",
            },
            {
              title: "Detail",
            },
          ]}
        />
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden border border-gray-300">
        <div className="flex flex-grow flex-col">
          <div
            className={cx(
              isReady ? "bg-[#525659]" : "bg-[#b8b8b8]",
              "flex relative flex-grow  overflow-y-scroll flex-col items-center relative"
            )}
          >
            {!isReady && (
              <div
                className={cx(
                  "absolute flex flex-col items-center justify-center",
                  css`
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  `
                )}
              >
                <div className="flex flex-col items-center justify-center bg-white p-4 w-48 rounded-md shadow-md">
                  <p className="text-center text-sm mb-2">
                    Please wait while the document is loading.
                  </p>
                  <Loader2 className={cx("h-8 w-8 animate-spin")} />
                </div>
              </div>
            )}

            {local.data && (
              <PDFViewer className="flex-grow w-full">
                <MyDocument
                  data={local.data}
                  onRender={() => {
                    setIsReady(true);
                  }}
                />
              </PDFViewer>
            )}
          </div>
          {local.can_approval && isReady && (
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-row gap-x-1 py-2">
                <AlertDirekturRejectMPP lc={local} />
                <AlertDirekturApproveMPP fm={local} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
