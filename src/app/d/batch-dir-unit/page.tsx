"use client";
import { ButtonLink } from "@/lib/components/ui/button-link";
import { columnMpp } from "@/constants/column-mpp";
import api from "@/lib/utils/axios";
import { shortDate } from "@/lib/utils/date";
import { events } from "@/lib/utils/event";
import { getAccess, userRoleMe } from "@/lib/utils/getAccess";
import { getNumber } from "@/lib/utils/getNumber";
import { getValue } from "@/lib/utils/getValue";
import { useLocal } from "@/lib/utils/use-local";
import get from "lodash.get";
import { useEffect } from "react";
import { IoEye } from "react-icons/io5";
import { AlertBatchHrdUnit } from "@/app/components/comp/AlertBatchHrdUnit";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { apix } from "@/lib/utils/apix";

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
    tab: "on_going",
    list: [
      { id: "on_going", name: "On Going", count: 0 },
      { id: "completed", name: "Completed", count: 0 },
    ],
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

      let prm: any = {
        take: 1,
        paging: 1,
        approver_type: "DIRECTOR",
        status: "NEED APPROVAL",
      };

      const params = await events("onload-param", prm);
      let result: any = 0;
      try {
        result = await apix({
          port: "mpp",
          value: "data.data.total",
          path: `/api/mp-plannings/approver-type${params}`,
          validate: "object",
        });
      } catch (ex) {}
      let completed = 0;
      try {
        completed = await apix({
          port: "mpp",
          value: "data.data.total",
          path: `/api/mp-plannings/completed?page=1&page_size=1`,
          validate: "object",
        });
      } catch (ex) {}
      local.list = [
        { id: "on_going", name: "On Going", count: getNumber(result) },
        { id: "completed", name: "Completed", count: getNumber(completed) },
      ];
      local.ready = true;
      local.render();
    };
    run();
  }, []);
  return (
    <TableUI
      ready={local.ready}
      tab={local.list}
      onTab={(e: string) => {
        local.tab = e;
        local.render();
      }}
      title="Manpower Planning Overview"
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
      column={() => {
        if (local.tab === "on_going") {
          [
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
                      href={`/d/batch-dir-unit/${get(row, "id")}/doc`}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
                      </div>
                    </ButtonLink>
                  </div>
                );
              },
            },
          ];
        }
        return columnMpp({
          id: local.tab,
          role: "Direktur",
          local,
        });
      }}
      onLoad={async (param: any) => {
        let prm = {
          ...param,
        };
        try {
          let url = "/api/mp-plannings/approver-type";
          if (local?.tab === "completed") {
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
            `${process.env.NEXT_PUBLIC_API_MPP}${url}` + params
          );
          const result: any[] =
            url === "/api/mp-plannings"
              ? res.data.data.mp_planning_headers
              : local?.tab === "completed"
              ? res.data.data
              : res.data.data;
          if (!Array.isArray(result)) return [];
          return result || [];
        } catch (ex) {
          return [];
        }
      }}
      onInit={async (list: any) => {}}
      onCount={async () => {
        let prm = {
          take: 1,
          paging: 1,
        } as any;
        let url = "/api/mp-plannings/approver-type";
        if (local?.tab === "completed") {
          url = "/api/mp-plannings/approver-type";
        } else {
          prm = {
            ...prm,
            approver_type: "DIRECTOR",
            status: "NEED APPROVAL",
          };
          url = "/api/mp-plannings/completed";
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
