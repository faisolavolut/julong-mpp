"use client";
import { Field } from "@/lib/components/form/Field";
import { FormBetter } from "@/lib/components/form/FormBetter";
import { Alert } from "@/lib/components/ui/alert";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import api from "@/lib/utils/axios";
import { normalDate } from "@/lib/utils/date";
import { IoMdSave } from "react-icons/io";
import { ButtonContainer } from "@/lib/components/ui/button";
import { getLabel } from "@/lib/utils/getLabel";

function Page() {
  return (
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col  pt-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 ">
                <span className="">Period</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: "List Period",
                    url: "/d/period",
                  },
                  {
                    title: "Add New",
                  },
                ]}
              />
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <Alert
                type={"save"}
                msg={"Are you sure you want to save this new record?"}
                onClick={async () => {
                  fm.data.status = "draft";
                  await fm.submit();
                  await fm.reload();
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
        const param = {
          title: data?.title,
          start_date: normalDate(data?.start_date),
          end_date: normalDate(data?.end_date),
          status: data?.status,
          budget_start_date: normalDate(data?.budget_start_date),
          budget_end_date: normalDate(data?.budget_end_date),
        };
        const res: any = await api.post(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods`,
          param
        );
        navigate("/d/period/" + res.data?.data?.id + "/edit");
      }}
      onLoad={async () => {
        return {
          status: "draft",
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
                    name={"title"}
                    label={"Name"}
                    type={"text"}
                    required={true}
                  />
                </div>
                <div></div>
                <div>
                  <Field
                    fm={fm}
                    required={true}
                    name={"start_date"}
                    label={"Start Date"}
                    type={"date"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    required={true}
                    name={"end_date"}
                    label={"End Date"}
                    type={"date"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    required={true}
                    name={"budget_start_date"}
                    label={"Budget Start date"}
                    type={"date"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    required={true}
                    name={"budget_end_date"}
                    label={"Budget End Date"}
                    type={"date"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"status"}
                    label={"Status"}
                    disabled={true}
                    type={"dropdown-async"}
                    pagination={false}
                    search="local"
                    onLoad={async () => {
                      return [
                        {
                          value: "open",
                          label: "Open",
                        },
                        {
                          value: "draft",
                          label: "Draft",
                        },
                        {
                          value: "not_open",
                          label: "Not Open",
                        },
                        {
                          value: "complete",
                          label: "Complete",
                        },
                        {
                          value: "close",
                          label: "Close",
                        },
                      ];
                    }}
                    onLabel={(item) =>
                      typeof item !== "object"
                        ? getLabel(item)
                        : getLabel(item?.value)
                    }
                    onValue={"value"}
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
