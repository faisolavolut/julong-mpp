"use client";
import { Field } from "@/app/components/form/Field";
import { FormBetter } from "@/app/components/form/FormBetter";
import { Alert } from "@/app/components/ui/alert";
import { BreadcrumbBetterLink } from "@/app/components/ui/breadcrumb-link";
import { btn } from "@/app/components/ui/button";
import { getParams } from "@/lib/get-params";
import { IoMdSave } from "react-icons/io";

function Page() {
  const id = getParams("id")
  return (
      <FormBetter
        onTitle={(fm: any) => {
          return (
            <div className="flex flex-row w-full">
              <div className="flex flex-col py-4 pt-0 flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  <span className="">Period</span>
                </h2>
                <BreadcrumbBetterLink
                  data={[
                    {
                      title: "List Period",
                      url: "/d/mpp/period",
                    },
                    {
                      title: "Edit",
                    },
                  ]}
                />
              </div>
              <div className="flex flex-row space-x-2">
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
                {fm.data?.status === "complete" ? (
                  <>
                    <Alert
                      type={"save"}
                      onClick={() => {
                        fm.data.status = "closed"
                        fm.render()
                        fm.submit();
                      }}
                    >
                      <div className={cx("bg-primary", btn())}>
                        <div className="flex items-center gap-x-0.5">
                          <IoMdSave className="text-xl" />
                          Close
                        </div>
                      </div>
                    </Alert>
                  </>
                ) : fm.data?.status === "open" ? (
                  <>
                    <Alert
                      type={"save"}
                      onClick={() => {
                        fm.data.status = "complete"
                        fm.render()
                        fm.submit();
                      }}
                    >
                      <div className={cx("bg-primary", btn())}>
                        <div className="flex items-center gap-x-0.5">
                          <IoMdSave className="text-xl" />
                          Complete
                        </div>
                      </div>
                    </Alert>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        }}
      onSubmit={async (fm: any) => {
        const data = fm.data;
      }}
      onLoad={async () => {
        return {
          id,
          status: "open"
        };
      }}
      header={(fm: any) => {
        return (
          <>
          </>
        );
      }}
      children={(fm: any) => {
        return (
          <>
            <div className={cx("flex flex-col flex-wrap px-4 py-2")}>
              <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
                <div>
                  <Field
                    fm={fm}
                    name={"title"}
                    label={"Manpower Planning Name"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"start_date"}
                    label={"Start Date"}
                    type={"date"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"end_date"}
                    label={"End Date"}
                    type={"date"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"status"}
                    label={"Status"}
                    disabled={true}
                    type={"dropdown"}
                    onLoad={async () => {
                      return [
                        {
                          value: "open",
                          label: "Open",
                        },
                        {
                          value: "close",
                          label: "Close",
                        },
                      ];
                    }}
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
