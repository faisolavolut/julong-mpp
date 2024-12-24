"use client";
import { AlertCeoApprove } from "@/app/components/comp/AlertCeoApprove";
import { AlertCeoApproveMPR } from "@/app/components/comp/AlertCeoApproveMPR";
import { AlertCeoReject } from "@/app/components/comp/AlertCeoReject";
import { AlertCeoRejectMPR } from "@/app/components/comp/AlertCeoRejectMPR";
import { TableList } from "@/app/components/tablelist/TableList";
import { BreadcrumbBetterLink } from "@/app/components/ui/breadcrumb-link";
import { ButtonBetter } from "@/app/components/ui/button";
import { ButtonLink } from "@/app/components/ui/button-link";
import MyDocument from "@/app/components/ui/Document";
import DocumentMPR from "@/app/components/ui/DocumentMPR";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
import { events } from "@/lib/event";
import { getParams } from "@/lib/get-params";
import { accessMe, getAccess, userRoleMe } from "@/lib/getAccess";
import { getNumber } from "@/lib/getNumber";
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
  const id = getParams("id");
  const local = useLocal({
    can_add: false,
    can_edit: false,
    client: false,
    data: null as any,
  });
  useEffect(() => {
    const run = async () => {
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
      const lines = data.mp_planning_header.mp_planning_lines || [];
      const jobs = lines.find((e: any) => e.job_id === data.job_id);
      console.log({data})
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
              url: "/d/mpr-ceo",
            },
            {
              title: "Detail",
            },
          ]}
        />
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
        <div className="flex flex-grow flex-col">
          <div className="flex flex-grow bg-[#525659] overflow-y-scroll flex-col items-center relative">
            {local.data && (
              <PDFViewer className="flex-grow w-full">
                <DocumentMPR  data={local.data}/>
              </PDFViewer>
            )}
          </div>
          {local.data?.is_approve && (
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-row gap-x-1 py-2">
                <AlertCeoRejectMPR lc={local}/>
                <AlertCeoApproveMPR  fm={local}/>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
