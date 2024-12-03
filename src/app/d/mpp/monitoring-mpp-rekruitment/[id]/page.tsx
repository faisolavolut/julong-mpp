"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
import { get_user } from "@/lib/get_user";
import { Breadcrumb, Button } from "flowbite-react";
import { IoMdSave } from "react-icons/io";
import { Tablist } from "@/app/components/tablist/Tablist";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
import { TableList } from "@/app/components/tablelist/TableList";
import { HiPlus } from "react-icons/hi";
import { Skeleton } from "@/app/components/ui/Skeleton";
import { getParams } from "@/lib/get-params";
function Page() {
  const id = getParams("id");
  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-grow flex-col">
        <Form
          onSubmit={async (fm: any) => {
            const data = fm.data;
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
                      level: 1,
                    },
                    {
                      job: "JOB 2",
                      level: 1,
                    },
                  ],
                },
                { id: "333", name: "Location 2" },
              ],
            };
          }}
          header={(fm: any) => {
            return (
              <>
                <div className="flex flex-row flex-grow px-4 py-4 border-b border-gray-300	items-center">
                  <div className="flex flex-col flex-grow">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                      <span className="capitalize">Form Manpower Planning</span>
                    </h1>
                    <div className="flex-grow flex flex-row">
                      <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item href="/d/mpp/monitoring-mpp-hrd">
                          Manpower Planning
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Add New</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <Button
                      className="bg-primary-500"
                      onClick={() => {
                        fm.submit();
                      }}
                    >
                      <div className="flex items-center gap-x-3">
                        <IoMdSave className="text-xl" />
                        Approve
                      </div>
                    </Button>
                    <Button
                      className="bg-red-500"
                      onClick={() => {
                        fm.submit();
                      }}
                    >
                      <div className="flex items-center gap-x-3">
                        <IoMdSave className="text-xl" />
                        Reject
                      </div>
                    </Button>
                  </div>
                </div>
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
                        type={"datetime"}
                        disabled={true}
                      />
                    </div>
                    <div>
                      <Field
                        fm={fm}
                        name={"budget_year_from"}
                        label={"Budget year From"}
                        type={"datetime"}
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
                      />
                    </div>
                    <div>
                      <Field
                        fm={fm}
                        name={"total_recruit"}
                        label={"Total Recruit"}
                        type={"text"}
                      />
                    </div>
                    <div>
                      <Field
                        fm={fm}
                        name={"total_promote"}
                        label={"Total Promote"}
                        type={"text"}
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
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          }}
          showResize={true}
          onFooter={(fm: any) => {
            if (!fm.ready)
              return (
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              );
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
                  onLoad={async () => {
                    return fm.data?.location || [];
                  }}
                  tabContent={(data: any) => {
                    return (
                      <>
                        <div className="w-full flex flex-row">
                          <div className={cx("flex flex-grow flex-col h-[500px]", css`.tbl{
                            position: relative}`)}>
                            <TableList
                              name={"Line"}
                              header={{
                                sideRight: (tbl: any) => {
                                  return (
                                    <>
                                      <div className="flex flex-row flex-grow space-x-2">
                                        <Button
                                          className="bg-primary-500"
                                          onClick={async () => {
                                            tbl.addRow({total: 1})
                                            fm.render();
                                          }}
                                        >
                                          <div className="flex items-center gap-x-3">
                                            <HiPlus className="text-xl" />
                                            <span className="capitalize">
                                              Add New
                                            </span>
                                          </div>
                                        </Button>
                                        <Button className="bg-primary-500">
                                          <div className="flex items-center gap-x-3">
                                            <IoMdSave className="text-xl" />
                                            <span className="capitalize">
                                              Save
                                            </span>
                                          </div>
                                        </Button>
                                      </div>
                                    </>
                                  );
                                },
                              }}
                              column={[
                                {
                                  name: "level",
                                  header: () => <span>Job Level</span>,
                                  renderCell: ({ row, name, cell }: any) => {
                                    return <>{row.level}</>;
                                  },
                                },
                                {
                                  name: "job",
                                  header: () => <span>Job</span>,
                                  renderCell: ({ row, name, cell }: any) => {
                                    return <>{shortDate(new Date())}</>;
                                  },
                                },
                                {
                                  name: "existing",
                                  header: () => <span>Existing</span>,
                                  renderCell: ({ row, name, cell }: any) => {
                                    return (
                                      <>
                                        <Field
                                          fm={{
                                            data: row,
                                            render: fm.render,
                                          }}
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
                                          fm={fm}
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
                                          fm={fm}
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
                                          fm={fm}
                                          name={"approved_by"}
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
                              onLoad={data.line || []}
                              onInit={async (list: any) => {}}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }}
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

export default Page;
