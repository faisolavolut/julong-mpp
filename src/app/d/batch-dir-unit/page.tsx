"use client";
import { AlertBatchHrdUnit } from "@/app/components/comp/AlertBatchHrdUnit";
import { TableList } from "@/app/components/tablelist/TableList";
import { Tablist } from "@/app/components/tablist/Tablist";
import { ButtonBetter } from "@/app/components/ui/button";
import { ButtonLink } from "@/app/components/ui/button-link";
import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/Skeleton";
import { columnMpp, rolesMpp } from "@/constants/column-mpp";
import { getStatusLabel } from "@/constants/status-mpp";
import { actionToast } from "@/lib/action";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
import { events } from "@/lib/event";
import { get_user } from "@/lib/get_user";
import { getAccess, userRoleMe } from "@/lib/getAccess";
import { getNumber } from "@/lib/getNumber";
import { getValue } from "@/lib/getValue";
import { useLocal } from "@/lib/use-local";
import get from "lodash.get";
import { AlertTriangle, Check } from "lucide-react";
import { useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import { toast } from "sonner";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
    roles: "Direktur Unit" as any,
    ready: false as boolean,
    location_null: 0,
    batch_lines: [] as any[],
    batch: null as any,
    can_process: false,
  });
  useEffect(() => {
    const run = async () => {
      local.ready = false;
      local.render();
      const roles = await userRoleMe();
      // trigger muncul tombol create batch
      try {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/trigger-create?approver_type=DIRECTOR`
        );
        if (res?.data?.data) {
          const line = await api.get(
            `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/batched-list?approver_type=DIRECTOR`
          );
          const mpp = await api.get(
            `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/batch?status=APPROVED&approver_type=DIRECTOR`
          );
          local.location_null = getNumber(get(mpp, "data.data.total_null"));
          const res_line = line?.data?.data;
          if (Array.isArray(res_line) && res_line?.length) {
            local.batch_lines = res_line.map((e) => e?.id);
            local.can_add = getAccess("create-batch-hrd-unit", roles);
          }
        }
      } catch (ex) {
        console.log(get(ex, "message"));
      }
      // trigger munculin card batch detail
      local.ready = true;
      local.render();
    };
    run();
  }, []);
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4 pt-0">
        <h2 className="text-xl font-semibold text-gray-900 ">
          <span className="">Manpower Planning Overview</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
        {!local.ready ? (
          <div className="flex-grow flex flex-row items-center justify-center">
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-row gap-x-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 flex-grow" />
              </div>
              <Skeleton className="h-16 w-[250px]" />
            </div>
          </div>
        ) : (
          <Tablist
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
            tabContent={(data: any) => {
              const col = columnMpp({
                ...data,
                role: "Direktur Unit",
                local,
              });
              return (
                <>
                  <div className="w-full flex flex-col flex-grow">
                    <div className={cx("flex flex-grow flex-col h-[380px]")}>
                      <TableList
                        name="Location"
                        header={{
                          sideLeft: () => {
                            if (!local.can_add) return <></>;
                            return (
                              <>
                                <AlertBatchHrdUnit local={local} />
                              </>
                            );
                          },
                        }}
                        column={
                          data.id === "on_going"
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
                                    return (
                                      <>{shortDate(getValue(row, name))}</>
                                    );
                                  },
                                },
                                {
                                  name: "mpp_period.budget_end_date",
                                  header: () => <span>Budget End Date</span>,
                                  renderCell: ({ row, name, cell }: any) => {
                                    return (
                                      <>{shortDate(getValue(row, name))}</>
                                    );
                                  },
                                },
                                {
                                  name: "action",
                                  header: () => <span>Action</span>,
                                  sortable: false,
                                  renderCell: ({ row, name, cell }: any) => {
                                    if (!get(row, "id")) return <></>;
                                    return (
                                      <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                                        <ButtonLink
                                          className="bg-primary"
                                          href={`/d/batch-dir-unit/${get(
                                            row,
                                            "id"
                                          )}/doc`}
                                        >
                                          <div className="flex items-center gap-x-2">
                                            <IoEye className="text-lg" />
                                          </div>
                                        </ButtonLink>
                                      </div>
                                    );
                                  },
                                },
                              ]
                            : col
                        }
                        onLoad={async (param: any) => {
                          let prm = {
                            ...param,
                          };
                          try {
                            let url = "/api/mp-plannings/approver-type";
                            if (data?.id === "completed") {
                              url = "/api/mp-plannings/completed";
                            } else {
                              url = "/api/batch/status";
                              prm = {
                                approver_type: "DIRECTOR",
                                status: "NEED APPROVAL",
                              };
                            }
                            const params = await events("onload-param", prm);
                            const res: any = await api.get(
                              `${process.env.NEXT_PUBLIC_API_MPP}${url}` +
                                params
                            );
                            const result: any[] =
                              url === "/api/mp-plannings"
                                ? res.data.data.mp_planning_headers
                                : data?.id === "completed"
                                ? res.data.data
                                : res.data.data;
                            if (!Array.isArray(result)) return [];
                            return result || [];
                          } catch (ex) {
                            return [];
                          }
                        }}
                        onInit={async (list: any) => {}}
                      />
                    </div>
                  </div>
                </>
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
