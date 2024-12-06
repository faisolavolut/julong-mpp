"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
import { TableList } from "@/app/components/tablelist/TableList";
import { Tablist } from "@/app/components/tablist/Tablist";
import api from "@/lib/axios";
import { cloneFM } from "@/lib/cloneFm";
import { shortDate } from "@/lib/date";
import { getParams } from "@/lib/get-params";
import { get_user } from "@/lib/get_user";
import { useLocal } from "@/lib/use-local";
import { Breadcrumb, Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { IoMdSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function Page() {
  const id = getParams("id");
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          <span className="">Form Monitoring MPP</span>
        </h2>
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item href="/d/master-data/plafon">
            List Monitoring MPP
          </Breadcrumb.Item>
          <Breadcrumb.Item>Edit</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg relative overflow-auto shadow">
        <Form
        className={"absolute top-0 left-0 w-full"}
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
                        <Breadcrumb.Item>Edit</Breadcrumb.Item>
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
                      <div className="flex items-center gap-x-0.5">
                        <IoMdSave className="text-xl" />
                        Save
                      </div>
                    </Button>{" "}
                    <Button
                      className="bg-primary-500"
                      onClick={() => {
                        fm.submit();
                      }}
                    >
                      <div className="flex items-center gap-x-0.5">
                        <IoMdSave className="text-xl" />
                        Submit
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
                        type={"date"}
                        disabled={false}
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
                                  return (
                                    <>
                                      <div className="flex flex-row flex-grow space-x-2">
                                        <Button
                                          className="bg-primary-500"
                                          onClick={() => {
                                            tbl.addRow({});
                                            tbl.render();
                                            fm.render();
                                          }}
                                        >
                                          <div className="flex items-center gap-x-0.5">
                                            <HiPlus className="text-xl" />
                                            <span className="capitalize">
                                              Add New
                                            </span>
                                          </div>
                                        </Button>
                                      </div>
                                    </>
                                  );
                                },
                                sideRight: (tbl: any) => {
                                  return (
                                    <>
                                      <div className="flex flex-row flex-grow space-x-2">
                                        <Button className="bg-primary-500">
                                          <div className="flex items-center gap-x-0.5">
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
      </div>
    </div>
  );
}

export default Page;
