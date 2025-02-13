"use client";
import { AlertBatch } from "@/app/components/comp/AlertBatch";
import { TableList } from "@/app/components/tablelist/TableList";
import { TabHeader } from "@/app/components/tablist/TabHeader";
import { Tablist } from "@/app/components/tablist/Tablist";
import { ButtonBetter } from "@/app/components/ui/button";
import { ButtonLink } from "@/app/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
import { events } from "@/lib/event";
import { get_user } from "@/lib/get_user";
import { accessMe, getAccess, userRoleMe } from "@/lib/getAccess";
import { getNumber } from "@/lib/getNumber";
import { getValue } from "@/lib/getValue";
import { useLocal } from "@/lib/use-local";
import { Button } from "flowbite-react";
import get from "lodash.get";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { GoInfo } from "react-icons/go";
import {
  HiDocumentDownload,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import { toast } from "sonner";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
    location_null: 0,
    batch_lines: [] as string[],
    can_complete: false,
    batch: null as any,
    tab: "on_going",
  });
  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      const addtional = {
        status: "APPROVED",
        paging: 1,
        take: 1000,
      };
      const params = await events("onload-param", addtional);
      try {
        const res: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/batch` + params
        );
        if (res?.data?.data?.organization_locations?.length) {
          const location_null = res?.data?.data?.organization_locations.filter(
            (e: any) => !e?.mp_planning_header
          );

          const document_line = res?.data?.data?.organization_locations.filter(
            (e: any) => e?.mp_planning_header
          );
          local.batch_lines = document_line.map(
            (e: any) => e?.mp_planning_header?.id
          );
          local.location_null = getNumber(location_null?.length);
          local.can_add = document_line?.length
            ? getAccess("create-batch", roles)
            : false;
        }
      } catch (ex) {}

      try {
        const batch: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/find-by-status/NEED APPROVAL`
        );
        local.batch = batch?.data?.data;
      } catch (ex) {}
      try {
        const batch_ceo: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/find-by-status/APPROVED`
        );
        local.batch = batch_ceo?.data?.data;
      } catch (ex) {}
      local.can_complete = getAccess("complete-batch", roles);
      local.render();
    };
    run();
  }, []);
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row p-4 items-center bg-white border border-gray-300 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900">
          <span className="">Batch</span>
        </h2>
        <div className="flex flex-row items-center px-4">
          <div className="flex flex-row items-center border border-gray-300 rounded-full">
            <TabHeader
              disabledPagination={true}
              onLabel={(row: any) => {
                return row.name;
              }}
              onValue={(row: any) => {
                return row.id;
              }}
              onLoad={async () => {
                return [
                  { id: "on_going", name: "On going" },
                  { id: "completed", name: "Completed" },
                ];
              }}
              onChange={(tab: any) => {
                local.tab = tab?.id;
                local.render();
              }}
              tabContent={(data: any) => {
                return <></>;
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden border border-gray-300">
        <Tablist
          disabledPagination={true}
          value={local.tab}
          hiddenHeaderTab={true}
          take={100}
          onLabel={(row: any) => {
            return row.name;
          }}
          onValue={(row: any) => {
            return row.id;
          }}
          onLoad={async () => {
            return [
              { id: "on_going", name: "On going" },
              { id: "completed", name: "Completed" },
            ];
          }}
          tabContent={(data: any) => {
            return (
              <>
                <div className="w-full flex flex-col flex-grow">
                  {local.batch && (
                    <div className="p-2">
                      <Card className="w-full">
                        <CardContent className="p-4 flex flex-row">
                          <div className=" flex flex-grow">
                            <table className="text-sm">
                              <tbody>
                                <tr>
                                  <td>Batch Number</td>
                                  <td>:</td>
                                  <td>{local.batch?.document_number}</td>
                                </tr>
                                <tr>
                                  <td>Status</td>
                                  <td>:</td>
                                  <td>
                                    {local.batch?.status !== "APPROVED"
                                      ? "Waiting Approval CEO"
                                      : "Approved By CEO"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="flex flex-row items-center">
                            {local.batch?.status === "APPROVED" &&
                              local.can_complete && (
                                <ButtonBetter
                                  onClick={async () => {
                                    toast.info(
                                      <>
                                        <Loader2
                                          className={cx(
                                            "h-4 w-4 animate-spin-important",
                                            css`
                                              animation: spin 1s linear infinite !important;
                                              @keyframes spin {
                                                0% {
                                                  transform: rotate(0deg);
                                                }
                                                100% {
                                                  transform: rotate(360deg);
                                                }
                                              }
                                            `
                                          )}
                                        />
                                        {"Saving..."}
                                      </>
                                    );
                                    try {
                                      const id = local.batch.id;
                                      const param = {
                                        id,
                                        status: "COMPLETED",
                                        approved_by: get_user("employee.id"),
                                        approver_name:
                                          get_user("employee.name"),
                                      };

                                      const res = await api.put(
                                        `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/update-status`,
                                        param
                                      );
                                      try {
                                        const batch: any = await api.get(
                                          `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/find-by-status/NEED APPROVAL`
                                        );
                                        local.batch = batch?.data?.data;
                                      } catch (ex) {}
                                      try {
                                        const batch_ceo: any = await api.get(
                                          `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/find-by-status/APPROVED`
                                        );
                                        local.batch = batch_ceo?.data?.data;
                                      } catch (ex) {}
                                      local.render();
                                      setTimeout(() => {
                                        toast.success(
                                          <div
                                            className={cx(
                                              "cursor-pointer flex flex-col select-none items-stretch flex-1 w-full"
                                            )}
                                            onClick={() => {
                                              toast.dismiss();
                                            }}
                                          >
                                            <div className="flex text-green-700 items-center success-title font-semibold">
                                              <Check className="h-6 w-6 mr-1 " />
                                              Record Saved
                                            </div>
                                          </div>
                                        );
                                      }, 1000);
                                    } catch (ex: any) {
                                      toast.error(
                                        <div className="flex flex-col w-full">
                                          <div className="flex text-red-600 items-center">
                                            <AlertTriangle className="h-4 w-4 mr-1" />
                                            Submit Failed{" "}
                                            {get(
                                              ex,
                                              "response.data.meta.message"
                                            ) || ex.message}
                                            .
                                          </div>
                                        </div>,
                                        {
                                          dismissible: true,
                                          className: css`
                                            background: #ffecec;
                                            border: 2px solid red;
                                          `,
                                        }
                                      );
                                    }
                                  }}
                                >
                                  Completed
                                </ButtonBetter>
                              )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  <div className={cx("flex flex-grow flex-col h-[350px]")}>
                    <TableList
                      name="Location"
                      header={{
                        sideLeft: () => {
                          if (data.id === "completed") return <></>;
                          if (!local.can_add) return <></>;
                          return (
                            <>
                              <AlertBatch local={local} />
                            </>
                          );
                        },
                      }}
                      column={
                        data?.id === "completed"
                          ? [
                              {
                                name: "document_number",
                                header: () => <span>Batch Number</span>,
                                renderCell: ({ row, name, cell }: any) => {
                                  return <>{getValue(row, name)}</>;
                                },
                              },
                              {
                                name: "mpp_period.title",
                                header: () => <span>MPP Period Name</span>,
                                renderCell: ({ row, name, cell }: any) => {
                                  return <>{getValue(row, name)}</>;
                                },
                              },
                              {
                                name: "mpp_period.budget_start_date",
                                header: () => <span>Budget Start Date</span>,
                                renderCell: ({ row, name, cell }: any) => {
                                  return <>{shortDate(getValue(row, name))}</>;
                                },
                              },
                              {
                                name: "mpp_period.budget_end_date",
                                header: () => <span>Budget End Date</span>,
                                renderCell: ({ row, name, cell }: any) => {
                                  return <>{shortDate(getValue(row, name))}</>;
                                },
                              },
                            ]
                          : [
                              {
                                name: "organization_name",
                                header: () => <span>Organization</span>,
                                renderCell: ({ row, name, cell }: any) => {
                                  return <>{getValue(row, name)}</>;
                                },
                              },
                              {
                                name: "name",
                                header: () => <span>Location</span>,
                                renderCell: ({ row, name, cell }: any) => {
                                  return <>{getValue(row, name)}</>;
                                },
                              },
                              {
                                name: "mp_planning_header.document_number",
                                header: () => <span>Document Number</span>,
                                renderCell: ({ row, name, cell }: any) => {
                                  return <>{getValue(row, name)}</>;
                                },
                              },
                              {
                                name: "mp_planning_header.status",
                                header: () => <span>Status</span>,
                                renderCell: ({ row, name, cell }: any) => {
                                  return <>{getValue(row, name)}</>;
                                },
                              },
                            ]
                      }
                      onLoad={async (param: any) => {
                        let result: any[] = [];
                        if (data?.id === "completed") {
                          const addtional = {
                            ...param,
                            status: "APPROVED",
                          };
                          const params = await events(
                            "onload-param",
                            addtional
                          );
                          const res: any = await api.get(
                            `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/completed` +
                              params
                          );
                          result = res.data.data;
                        } else {
                          const addtional = {
                            ...param,
                            status: "APPROVED",
                          };
                          const params = await events(
                            "onload-param",
                            addtional
                          );
                          const res: any = await api.get(
                            `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/batch` +
                              params
                          );
                          result = res.data.data.organization_locations;
                        }

                        if (!Array.isArray(result)) return [];
                        return result || [];
                      }}
                      onInit={async (list: any) => {}}
                    />
                  </div>
                </div>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}

export default Page;
