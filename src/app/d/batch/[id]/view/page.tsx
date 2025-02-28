"use client";
import { Field } from "@/lib/components/form/Field";
import { formatMoney } from "@/lib/components/form/field/TypeInput";
import { FormBetter } from "@/lib/components/form/FormBetter";
import { TableList } from "@/lib/components/tablelist/TableList";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import api from "@/lib/utils/axios";
import { getParams } from "@/lib/utils/get-params";
import { getAccess, userRoleMe } from "@/lib/utils/getAccess";
import { getNumber } from "@/lib/utils/getNumber";
import { getValue } from "@/lib/utils/getValue";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect } from "react";

function Page() {
  const id = getParams("id");

  const local = useLocal({
    can_approve: false,
    can_reject: false,
    can_process: false,
    fm: null as any,
  });
  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      local.can_approve = getAccess("approve-mpp", roles);
      local.can_reject = getAccess("reject-mpp", roles);
      local.can_process = getAccess("process-mpp", roles);
      local.render();
    };
    run();
  }, []);
  return (
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col  pt-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 ">
                <span className="">Manpower Planning Overview</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: "List Manpower Planning Overview",
                    url: "/d/location",
                  },
                  {
                    title: "Detail",
                  },
                ]}
              />
            </div>
            <div className="flex flex-row space-x-2"></div>
          </div>
        );
      }}
      onSubmit={async (fm: any) => {
        const data = fm.data;
      }}
      onInit={(fm: any) => {
        local.fm = fm;
        local.render();
      }}
      onLoad={async () => {
        const res: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/` + id
        );
        const data = res.data.data;
        return {
          id,
          ...data,
          mpp_name: data?.mpp_period?.name,
          budget_year_from: data?.mpp_period?.budget_start_date,
          budget_year_to: data?.mpp_period?.budget_end_date,
          document_line: data?.mp_planning_lines || [],
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
                    name={"organization_name"}
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
                    name={"requestor_name"}
                    label={"Requestor"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"job_name"}
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
                    name={"requestor_name"}
                    label={"Recommend by"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"approved_by"}
                    label={"Approved by"}
                    type={"text"}
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
      mode="view"
      onFooter={(fm: any) => {
        if (!fm?.data?.id) return <></>;
        return (
          <div
            className={cx(css`
              .tbl-search {
                display: none !important;
              }
              .tbl-pagination {
                display: none !important;
              }
              .is_disable {
                background: transparent !important;
              }
            `)}
          >
            <div className="w-full flex flex-row">
              <div className="flex flex-grow flex-col h-[350px]">
                <TableList
                  disabledPagination={true}
                  header={{
                    sideLeft: (tbl: any) => {
                      return <></>;
                    },
                    sideRight: (tbl: any) => {
                      return <></>;
                    },
                  }}
                  filter={false}
                  column={[
                    {
                      name: "level",
                      header: "Job Level",
                      sortable: false,
                      renderCell: ({ row, name, cell, tbl }: any) => {
                        return (
                          <>
                            {`${getValue(row, "job_level")}`} -{" "}
                            {getValue(row, "job_level_name")}
                          </>
                        );
                      },
                    },
                    {
                      name: "job_name",
                      header: "Job",
                      width: 150,
                      sortable: false,
                      renderCell: ({ row, name, cell }: any) => {
                        return <>{getValue(row, name)}</>;
                      },
                    },
                    {
                      name: "existing",
                      header: "Existing",
                      width: 50,
                      sortable: false,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <div className="text-right">
                            {formatMoney(getNumber(getValue(row, name)))}
                          </div>
                        );
                      },
                    },
                    {
                      name: "suggested_recruit",
                      header: "Suggested Recruit",
                      width: 50,
                      sortable: false,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <div className="text-right">
                            {formatMoney(getNumber(getValue(row, name)))}
                          </div>
                        );
                      },
                    },
                    {
                      name: "recruit_ph",
                      header: "Recruit PH",
                      width: 50,
                      sortable: false,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <div className="text-right">
                            {formatMoney(getNumber(getValue(row, name)))}
                          </div>
                        );
                      },
                    },
                    {
                      name: "recruit_mt",
                      header: "Recruit MT",
                      width: 50,
                      sortable: false,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <div className="text-right">
                            {formatMoney(getNumber(getValue(row, name)))}
                          </div>
                        );
                      },
                    },
                    {
                      name: "promotion",
                      header: "Promotion",
                      width: 50,
                      sortable: false,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <div className="text-right">
                            {formatMoney(getNumber(getValue(row, name)))}
                          </div>
                        );
                      },
                    },
                    {
                      name: "total",
                      header: "Total",
                      width: 50,
                      sortable: false,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <div className="text-right">
                            {formatMoney(getNumber(getValue(row, name)))}
                          </div>
                        );
                      },
                    },
                  ]}
                  onLoad={async (param: any) => {
                    return fm.data.document_line;
                  }}
                  onInit={async (list: any) => {}}
                  take={1000}
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

export default Page;
