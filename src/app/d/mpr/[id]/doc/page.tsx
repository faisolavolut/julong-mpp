"use client";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import DocumentMPR from "@/lib/components/ui/DocumentMPR";
import api from "@/lib/utils/axios";
import { getParams } from "@/lib/utils/get-params";
import { userRoleMe } from "@/lib/utils/getAccess";
import { getNumber } from "@/lib/utils/getNumber";
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
    data: null as any,
    can_approval: false,
    ready_document: false,
  });
  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      const res: any = await api.get(
        `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-requests/` + id
      );
      const data = res.data.data;

      let categories = [] as any[];
      const ctg: any = await api.get(
        `${process.env.NEXT_PUBLIC_API_MPP}/api/request-categories`
      );
      const category: any[] = ctg.data?.data;
      if (!Array.isArray(category)) categories = [];
      categories = category.map((e) => {
        return {
          value: e.id,
          label: e.name,
          data: e,
        };
      });
      const lines = data?.mp_planning_header?.mp_planning_lines || [];
      const jobs = lines.find((e: any) => e.job_id === data.job_id);
      local.data = {
        id,
        ...data,
        categories: categories,
        divisi: data.for_organization_structure,
        job_level: data.job_level_name,
        location: data.for_organization_location_id,
        is_replacement: data.is_replacement ? "penggantian" : "penambahan",
        total_needs: data.male_needs + data.female_needs,
        remaining_balance:
          data.recruitment_type === "MT_Management Trainee"
            ? getNumber(jobs?.remaining_balance_mt)
            : data.recruitment_type === "PH_Professional Hire"
            ? getNumber(jobs?.remaining_balance_ph)
            : 0,
        mpp_name: data.mpp_period.title,
        major_ids: data.request_majors.map((e: any) => e?.["Major"]?.["ID"]),
        is_approve:
          data.status === "NEED APPROVAL" &&
          data.organization_category === "Non Field" &&
          data.mp_request_type === "OFF_BUDGET" &&
          !data.ceo &&
          data.vp_gm_director
            ? true
            : false,
      };
      local.render();
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
              title: "List Manpower Request",
              url: "/d/mpr",
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
                <DocumentMPR
                  data={local.data}
                  onRender={() => {
                    setIsReady(true);
                  }}
                />
              </PDFViewer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
