"use client";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import MyDocument from "@/lib/components/ui/Document";
import { apix } from "@/lib/utils/apix";
import { getParams } from "@/lib/utils/get-params";
import { useLocal } from "@/lib/utils/use-local";
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
                <PDFViewer className="flex-grow w-full">
                  <MyDocument
                    data={local.data}
                    onRender={() => {
                      setIsReady(true);
                    }}
                  />
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
