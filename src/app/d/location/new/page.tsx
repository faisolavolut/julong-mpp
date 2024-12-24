"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
import { FormBetter } from "@/app/components/form/FormBetter";
import { TableList } from "@/app/components/tablelist/TableList";
import { Tablist } from "@/app/components/tablist/Tablist";
import { Alert } from "@/app/components/ui/alert";
import { BreadcrumbBetterLink } from "@/app/components/ui/breadcrumb-link";
import { ButtonBetter, ButtonContainer } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import api from "@/lib/axios";
import { cloneFM } from "@/lib/cloneFm";
import { normalDate, shortDate } from "@/lib/date";
import { getParams } from "@/lib/get-params";
import { get_user } from "@/lib/get_user";
import { useLocal } from "@/lib/use-local";
import { Breadcrumb, Button } from "flowbite-react";
import { GoInfo } from "react-icons/go";
import { IoMdSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function Page() {
  const id = getParams("id");
  return (
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col py-4 pt-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900">
                <span className="">Manpower Planning</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: "List Manpower Planning",
                    url: "/d/location",
                  },
                  {
                    title: "New",
                  },
                ]}
              />
            </div>
            <div className="flex flex-row space-x-2">
              <Alert
                type={"delete"}
                onClick={() => {
                  fm.submit();
                }}
              >
                <ButtonContainer className={"bg-primary"}>
                  <IoMdSave className="text-xl" />
                  Save
                </ButtonContainer>
              </Alert>
            </div>
          </div>
        );
      }}
      onSubmit={async (fm: any) => {
        const data = fm.data;
        const param: any = {
          mpp_period_id: data.mpp_period_id,
          organization_id: data.organization_id,
          emp_organization_id: data.organization_id,
          job_id: data.job_id,
          document_number: data.document_number,
          document_date: normalDate(data.document_date),
          notes: data.notes,
          total_recruit: 0,
          total_promote: 0,
          status: "DRAFTED",
          recommended_by: null,
          approved_by: null,
          requestor_id: data.requestor_id,
          organization_location_id: data.organization_location_id,
        };
        const formData = new FormData();

        // Menambahkan data param ke FormData
        formData.append(
          "payload",
          JSON.stringify(param)
        );
        const res: any = await api.post(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        navigate("/d/location/"+res.data?.data?.id+"/edit")
      }}
      onLoad={async () => {
        const document_number = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/document-number`
        );
        const id_org = get_user("employee.organization_id");
        const location = await api.get(
          `${process.env.NEXT_PUBLIC_API_PORTAL}/api/organization-locations/` +
            get_user("employee.employee_job.organization_location_id")
        );
        const org = await api.get(
          `${process.env.NEXT_PUBLIC_API_PORTAL}/api/organizations/` + id_org
        );
        const current_open = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods/status?status=open`
          );
        return {
          id,
          document_number: document_number.data.data,
          document_date: new Date(),
          organization: org?.data?.data?.name,
          location: location?.data?.data?.name,
          mpp_name: current_open?.data?.data?.title,
          budget_year_from: current_open?.data?.data?.budget_start_date,
          budget_year_to: current_open?.data?.data?.budget_end_date,
          requestor: get_user("employee.name"),
          job: get_user("employee.employee_job.name"),
          total_recruit: 0,
          total_promote: 0,
          mpp_period_id: current_open?.data?.data?.id,
          organization_id: id_org,
          job_id: get_user("employee.employee_job.job_id"),
          requestor_id: get_user("employee.id"),
          status: "DRAFTED",
          organization_location_id: get_user(
            "employee.employee_job.organization_location_id"
          ),
        };
      }}
      showResize={false}
      header={(fm: any) => {
        return <></>;
      }}
      children={(fm: any) => {
        return (
          <>
            <div className={cx("flex flex-col flex-wrap px-4 py-2")}>
              <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
                <div>
                  <Field
                    fm={fm}
                    name={"organization"}
                    label={"Organization"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"location"}
                    label={"Location"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"document_number"}
                    label={"Document Number"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"document_date"}
                    label={"Document Date"}
                    type={"date"}
                    disabled={false}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"mpp_name"}
                    label={"Periode Name"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div></div>
                <div>
                  <Field
                    fm={fm}
                    name={"budget_year_from"}
                    label={"Budget year From"}
                    type={"date"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"budget_year_to"}
                    label={"Budget year To"}
                    type={"date"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"requestor"}
                    label={"Requestor"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"job"}
                    label={"Job"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div className="col-span-2">
                  <Field
                    fm={fm}
                    name={"notes"}
                    label={"Notes"}
                    type={"textarea"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"total_recruit"}
                    label={"Total Recruit"}
                    type={"money"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"total_promote"}
                    label={"Total Promote"}
                    type={"money"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"recommended_by"}
                    label={"Recommend by"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"approved_by"}
                    label={"Approved by"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"status"}
                    label={"Status"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </>
        );
      }}
    />
  );
}

export default Page;
