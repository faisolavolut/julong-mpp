"use client";
import { Field } from "@/app/components/form/Field";
import { FormBetter } from "@/app/components/form/FormBetter";
import { TableList } from "@/app/components/tablelist/TableList";
import { Tablist } from "@/app/components/tablist/Tablist";
import { Alert } from "@/app/components/ui/alert";
import { BreadcrumbBetterLink } from "@/app/components/ui/breadcrumb-link";
import { ButtonBetter, ButtonContainer } from "@/app/components/ui/button";
import api from "@/lib/axios";
import { cloneFM } from "@/lib/cloneFm";
import { getParams } from "@/lib/get-params";
import { get_user } from "@/lib/get_user";
import { HiPlus } from "react-icons/hi";
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
              <h2 className="text-xl font-semibold text-gray-900 ">
                <span className="">Manpower Planning</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: "List Manpower Planning",
                    url: "/d/mpp/monitoring-mpp-hrd",
                  },
                  {
                    title: "Detail",
                  },
                ]}
              />
            </div>
          </div>
        );
      }}
      mode={"view"}
      onSubmit={async (fm: any) => {
        const data = fm.data;
        console.log({ data });
      }}
      onLoad={async () => {
        return {
          id,
          document_date: new Date(),
          requestor: get_user("id"),
          location: [
            {
              id: "123",
              name: "Location 1",
              line: [
                {
                  job: "JOB 1",
                  level: "1",
                },
              ],
            },
            { id: "333", name: "Location 2" },
            { id: "4", name: "Location 4" },
            { id: "5", name: "Location 5" },
            { id: "6", name: "Location 6" },
            { id: "7", name: "Location 7" },
            { id: "8", name: "Location 8" },
            { id: "9", name: "Location 9" },
            { id: "10", name: "Location 10" },
            { id: "11", name: "Location 11" },
          ],
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
                    disabled={true}
                    onLoad={async () => {
                      return [
                        {
                          value: 1,
                          label: "Organization",
                          data: {
                            id: 1,
                            label: "Organization",
                          },
                        },
                      ];
                    }}
                  />
                </div>{" "}
                <div>
                  <Field
                    fm={fm}
                    name={"emp_org_id"}
                    label={"Employment Org"}
                    type={"dropdown"}
                    disabled={true}
                    onLoad={async () => {
                      return [
                        {
                          value: 1,
                          label: "Organization",
                          data: {
                            id: 1,
                            label: "Organization",
                          },
                        },
                      ];
                    }}
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
                  />
                </div>
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
                    name={"requestor"}
                    label={"Requestor"}
                    type={"dropdown"}
                    disabled={true}
                    onLoad={async () => {
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
                    name={"requestor"}
                    label={"Requestor"}
                    type={"dropdown"}
                    disabled={true}
                    onLoad={async () => {
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
                    disabled={true}
                    onLoad={async () => {
                      return [
                        {
                          value: 1,
                          label: "Organization",
                        },
                      ];
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <Field
                    fm={fm}
                    name={"notes"}
                    label={"Notes"}
                    type={"textarea"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"total_recruit"}
                    label={"Total Recruit"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"total_promote"}
                    label={"Total Promote"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"recommend_by"}
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
            `)}
          >
            <Tablist
              take={100}
              onLabel={(row: any) => {
                return row.name;
              }}
              onValue={(row: any) => {
                return row.id;
              }}
              tabContent={(data: any) => {
                return (
                  <>
                    <div className="w-full flex flex-row py-6">
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
                          column={[
                            {
                              name: "level",
                              header: () => <span>Job Level</span>,
                              renderCell: ({ row, name, cell }: any) => {
                                return (
                                  <>
                                    <Field
                                      fm={cloneFM(fm, row)}
                                      hidden_label={true}
                                      name={"level"}
                                      label={"Organization"}
                                      type={"dropdown"}
                                      onLoad={async () => {
                                        return [
                                          {
                                            value: "1",
                                            label: "1",
                                          },
                                          {
                                            value: "2",
                                            label: "2",
                                          },
                                          {
                                            value: "3",
                                            label: "3",
                                          },
                                          {
                                            value: "4",
                                            label: "4",
                                          },
                                          {
                                            value: "5",
                                            label: "5",
                                          },
                                          {
                                            value: "6",
                                            label: "6",
                                          },
                                          {
                                            value: "7",
                                            label: "7",
                                          },
                                        ];
                                      }}
                                    />
                                  </>
                                );
                              },
                            },
                            {
                              name: "job",
                              header: () => <span>Job</span>,
                              width: 150,
                              renderCell: ({ row, name, cell }: any) => {
                                return (
                                  <>
                                    <Field
                                      fm={cloneFM(fm, row)}
                                      hidden_label={true}
                                      name={"organization"}
                                      label={"Organization"}
                                      type={"dropdown"}
                                      onLoad={async () => {
                                        return [
                                          {
                                            value: 1,
                                            label: "Organization",
                                          },
                                        ];
                                      }}
                                    />
                                  </>
                                );
                              },
                            },
                            {
                              name: "existing",
                              header: () => <span>Existing</span>,
                              renderCell: ({ row, name, cell }: any) => {
                                return (
                                  <>
                                    <Field
                                      fm={cloneFM(fm, row)}
                                      name={"existing"}
                                      label={"Approved by"}
                                      type={"text"}
                                      hidden_label={true}
                                    />
                                  </>
                                );
                              },
                            },
                            {
                              name: "recruit",
                              header: () => <span>Recruit</span>,
                              renderCell: ({ row, name, cell }: any) => {
                                return (
                                  <>
                                    <Field
                                      fm={cloneFM(fm, row)}
                                      name={"recruit"}
                                      label={"Approved by"}
                                      type={"text"}
                                      hidden_label={true}
                                    />
                                  </>
                                );
                              },
                            },
                            {
                              name: "suggested_recruit",
                              header: () => <span>Suggested Recruit</span>,
                              renderCell: ({ row, name, cell }: any) => {
                                return (
                                  <>
                                    <Field
                                      fm={cloneFM(fm, row)}
                                      name={"suggested_recruit"}
                                      label={"Approved by"}
                                      type={"text"}
                                      hidden_label={true}
                                    />
                                  </>
                                );
                              },
                            },
                            {
                              name: "promotion",
                              header: () => <span>Promotion</span>,
                              renderCell: ({ row, name, cell }: any) => {
                                return (
                                  <>
                                    <Field
                                      fm={cloneFM(fm, row)}
                                      name={"promotion"}
                                      label={"Approved by"}
                                      type={"text"}
                                      hidden_label={true}
                                    />
                                  </>
                                );
                              },
                            },
                            {
                              name: "total",
                              header: () => <span>Total</span>,
                              renderCell: ({ row, name, cell }: any) => {
                                return <>{row?.total || 0}</>;
                              },
                            },
                          ]}
                          onLoad={async (param: any) => {
                            return data?.line || [];
                            const res: any = await api.get(
                              "https://jsonplaceholder.typicode.com/users"
                            );
                            console.log(res);
                            return res.data;
                          }}
                          onInit={async (list: any) => {}}
                        />
                      </div>
                    </div>
                  </>
                );
              }}
              onLoad={async () => {
                return fm.data?.location;
                return [
                  { id: "123", name: "Location 1" },
                  { id: "333", name: "Location 2" },
                ];
              }}
            />
          </div>
        );
      }}
    />
  );
}

export default Page;
