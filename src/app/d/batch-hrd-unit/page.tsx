"use client";
import { columnMpp } from "@/constants/column-mpp";
import api from "@/lib/utils/axios";
import { events } from "@/lib/utils/event";
import { get_user } from "@/lib/utils/get_user";
import { access, userRoleMe } from "@/lib/utils/getAccess";
import { getNumber } from "@/lib/utils/getNumber";
import { useLocal } from "@/lib/utils/use-local";
import get from "lodash.get";
import { useEffect } from "react";
import { AlertBatchHrdUnit } from "@/app/components/comp/AlertBatchHrdUnit";
import { apix } from "@/lib/utils/apix";
import { TableUI } from "@/lib/components/tablelist/TableUI";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
    roles: null as any,
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
            local.can_add = access("create-batch-hrd-unit");
          }
        }
      } catch (ex) {}
      local.roles = roles;
      // trigger munculin card batch detail
      let prm: any = {
        take: 1,
        paging: 1,
        approver_type: "manager",
        organization_id: get_user("employee.organization_id"),
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
          if (local?.tab === "completed") return <></>;
          return (
            <>
              <AlertBatchHrdUnit local={local} />
            </>
          );
        },
      }}
      column={() => {
        return columnMpp({
          id: local.tab,
          role: "HRD Unit",
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
            const roles = "HRD Unit";
            url = "/api/mp-plannings/approver-type";
            prm = {
              ...prm,
              approver_type: "manager",
              organization_id: get_user("employee.organization_id"),
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
              ? res.data.data?.mp_planning_headers
              : res.data.data.organization_locations;
          if (!Array.isArray(result)) return [];
          return result || [];
        } catch (ex) {
          return [];
        }
      }}
      onInit={async (list: any) => {}}
      onCount={async (param) => {
        let prm = {} as any;
        let url = "/api/mp-plannings/approver-type";
        if (local?.tab === "completed") {
          url = "/api/mp-plannings/completed";
        } else {
          url = "/api/mp-plannings/approver-type";
          prm = {
            approver_type: "manager",
            organization_id: get_user("employee.organization_id"),
          };
        }
        const params = await events("onload-param", prm, param);
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
