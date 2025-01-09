"use client";
import { Field } from "@/app/components/form/Field";
import { FormBetter } from "@/app/components/form/FormBetter";
import { Alert } from "@/app/components/ui/alert";
import { BreadcrumbBetterLink } from "@/app/components/ui/breadcrumb-link";
import { btn } from "@/app/components/ui/button";
import api from "@/lib/axios";
import { getParams } from "@/lib/get-params";
import { IoMdSave } from "react-icons/io";
function Page() {
  const id = getParams("id")
  return (
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col  pt-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 ">
                <span className="">Plafon</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: "List Plafon",
                    url: "/d/master-data/plafon",
                  },
                  {
                    title: "Detail"
                  }
                ]}
              />
            </div>
            <div className="flex flex-row space-x-2">
            </div>
          </div>
        );
      }}
      onSubmit={async (fm: any) => {
        
      }}
      onLoad={async () => {
        
        const res: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/job-plafons/` +
            id
        );
        
        return res.data.data
      }}
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
                    name={"organization_name"}
                    label={"Organization"}
                    disabled={true}
                  />
                </div>
                <div>
                 
                <Field
                    fm={fm}
                    name={"job_name"}
                    label={"Job"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field fm={fm}
                    disabled={true} name={"plafon"} label={"Plafon"} type={"money"} />
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
