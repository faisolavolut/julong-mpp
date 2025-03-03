"use client";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import MyDocument from "@/lib/components/ui/Document";
import { apix } from "@/lib/utils/apix";
import { getParams } from "@/lib/utils/get-params";
import { useLocal } from "@/lib/utils/use-local";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { useEffect } from "react";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

function Page() {
  const id = getParams("id");
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
      try {
        const result = await apix({
          port: "mpp",
          path: "/api/batch/find-document/" + id,
          value: "data.data",
          validate: "object",
        });
        console.log(result);
        local.data = result;
      } catch (ex) {}
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
          <span className="">Batch</span>
        </h2>
        <BreadcrumbBetterLink
          data={[
            {
              title: "List Batch",
              url: "/d/batch",
            },
            {
              title: "Document",
            },
          ]}
        />
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden border border-gray-300">
        {local.ready && (
          <div className="flex flex-grow flex-col">
            {local.data ? (
              <div className="flex flex-grow bg-[#525659] overflow-y-scroll flex-col items-center relative">
                <PDFViewer className="flex-grow w-full">
                  <MyDocument data={local.data} />
                </PDFViewer>
              </div>
            ) : (
              <div className="flex flex-grow items-center justify-center flex-row">
                No Data
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
