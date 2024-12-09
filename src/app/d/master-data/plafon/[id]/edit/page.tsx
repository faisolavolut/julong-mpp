"use client";
import { Field } from "@/app/components/form/Field";
import { FormBetter } from "@/app/components/form/FormBetter";
import { Alert } from "@/app/components/ui/alert";
import { BreadcrumbBetterLink } from "@/app/components/ui/breadcrumb-link";
import { btn } from "@/app/components/ui/button";
import { getParams } from "@/lib/get-params";
import { get_params_url } from "@/lib/getParamsUrl";
import { IoMdSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function Page() {
  const id = getParams("id")
  return (
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col py-4 pt-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                <span className="">Plafon</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: "List Plafon",
                    url: "/d/master-data/plafon",
                  },
                  {
                    title: "Edit"
                  }
                ]}
              />
            </div>
            <div className="flex flex-row space-x-2">
              {/* <Alert type={"delete"} onClick={() => {}}>
                <div className={cx("bg-red-500", btn())}>
                  <div className="flex items-center gap-x-0.5">
                    <MdDelete className="text-xl" />
                    Delete
                  </div>
                </div>
              </Alert> */}
              <Alert
                type={"save"}
                onClick={() => {
                  fm.submit();
                }}
              >
                <div className={cx("bg-primary", btn())}>
                  <div className="flex items-center gap-x-0.5">
                    <IoMdSave className="text-xl" />
                    Save
                  </div>
                </div>
              </Alert>
            </div>
          </div>
        );
      }}
      onSubmit={async (fm: any) => {
        console.log("MAH")
        const data = fm?.data
        console.log({data})
        const res = {
          id,
          plafon: Number(data.plafon)
        }
        console.log(res)
        // navigate("/d/master-data/plafon")
        
      }}
      onLoad={async () => {
        return {
          organization: 1,
          job: 1,
          name: "pak de",
        };
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
                    name={"organization"}
                    label={"Organization"}
                    type={"dropdown"}
                    onLoad={async () => {
                      console.log("MASUKL");
                      return [
                        {
                          value: 1,
                          label: "Organization",
                        },
                      ];
                    }}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"job"}
                    label={"Job"}
                    type={"dropdown"}
                    onLoad={async () => {
                      return [
                        {
                          value: 1,
                          label: "Job",
                        },
                      ];
                    }}
                  />
                </div>
                <div>
                  <Field fm={fm} name={"plafon"} label={"Plafon"} type={"money"} />
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
