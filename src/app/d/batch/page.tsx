"use client";
import { AlertBatch } from "@/app/components/comp/AlertBatch";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { ButtonBetter } from "@/lib/components/ui/button";
import { Card, CardContent } from "@/lib/components/ui/card";
import { apix } from "@/lib/utils/apix";
import api from "@/lib/utils/axios";
import { shortDate } from "@/lib/utils/date";
import { events } from "@/lib/utils/event";
import { get_user } from "@/lib/utils/get_user";
import { getAccess, userRoleMe } from "@/lib/utils/getAccess";
import { getNumber } from "@/lib/utils/getNumber";
import { getValue } from "@/lib/utils/getValue";
import { useLocal } from "@/lib/utils/use-local";
import get from "lodash.get";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import { useEffect } from "react";
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
    list: [
      { id: "on_going", name: "On Going", count: 0 },
      { id: "completed", name: "Completed", count: 0 },
    ],
    ready: false as boolean,
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
      let document_line = [] as any[];
      try {
        const res: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/batch` + params
        );
        if (res?.data?.data?.organization_locations?.length) {
          const location_null = res?.data?.data?.organization_locations.filter(
            (e: any) => !e?.mp_planning_header
          );

          document_line = res?.data?.data?.organization_locations.filter(
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
      let completed = 0;
      try {
        completed = await apix({
          port: "mpp",
          value: "data.data.total",
          path: `/api/batch/completed?page=1&page_size=1&status=APPROVED`,
          validate: "object",
        });
      } catch (ex) {}
      local.list = [
        {
          id: "on_going",
          name: "On Going",
          count: getNumber(document_line?.length),
        },
        { id: "completed", name: "Completed", count: getNumber(completed) },
      ];
      local.ready = true;
      local.render();
    };
    run();
  }, []);

  return (
    <TableUI
      tabHeader={
        <div className="flex flex-col px-2 flex-grow">
          {local.tab === "on_going" && local.batch && (
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
                                approver_name: get_user("employee.name"),
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
                                    {get(ex, "response.data.meta.message") ||
                                      ex.message}
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
        </div>
      }
      ready={local.ready}
      tab={local.list}
      onTab={(e: string) => {
        local.tab = e;
        local.render();
      }}
      title="Batch"
      name="Location"
      header={{
        sideLeft: () => {
          if (local.tab === "completed") return <></>;
          if (!local.can_add) return <></>;
          return (
            <>
              <AlertBatch local={local} />
            </>
          );
        },
      }}
      column={() => {
        if (local?.tab === "completed") {
          return [
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
          ];
        }
        return [
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
        ];
      }}
      onLoad={async (param: any) => {
        let result: any[] = [];
        if (local?.tab === "completed") {
          const addtional = {
            ...param,
            status: "APPROVED",
          };
          const params = await events("onload-param", addtional);
          const res: any = await api.get(
            `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/completed` + params
          );
          result = res.data.data;
        } else {
          const addtional = {
            ...param,
            status: "APPROVED",
          };
          const params = await events("onload-param", addtional);
          const res: any = await api.get(
            `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/batch` + params
          );
          result = res.data.data.organization_locations;
        }

        if (!Array.isArray(result)) return [];
        return result || [];
      }}
      onInit={async (list: any) => {}}
      onCount={async () => {
        let prm = {
          take: 1,
          paging: 1,
          status: "APPROVED",
        } as any;
        let url = "";
        if (local?.tab === "completed") {
          url = "/api/batch/completed";
        } else {
          url = "/api/mp-plannings/batch";
        }
        const params = await events("onload-param", prm);
        const result: any = await apix({
          port: "mpp",
          value: "data.data.total",
          path: `${url}${params}`,
          validate: "object",
        });
        return getNumber(result);
      }}
    />
  );
}

export default Page;
