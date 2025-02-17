"use client";
import { ButtonLink } from "@/lib/components/ui/button-link";
import { columnMpp, rolesMpp } from "@/constants/column-mpp";
import api from "@/lib/utils/axios";
import { events } from "@/lib/utils/event";
import { get_user } from "@/lib/utils/get_user";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { access, userRoleMe } from "@/lib/utils/getAccess";
import { apix } from "@/lib/utils/apix";
import { getNumber } from "@/lib/utils/getNumber";
import { TableUI } from "@/lib/components/tablelist/TableUI";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
    roles: null as any,
    ready: false as boolean,
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
      const is_access = access("create-mpp");
      if (is_access) {
        try {
          const res = await api.get(
            `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods/status?status=open`
          );
          if (res?.data?.data?.mppperiod) {
            local.can_add = access("create-mpp");
          }
        } catch (ex) {}
      }
      local.roles = roles?.[0];
      local.can_edit = access("edit-mpp");
      local.ready = true;
      const role = rolesMpp([roles?.[0]]);
      let prm: any = {
        take: 1,
        paging: 1,
      };
      let url = "/api/mp-plannings/approver-type";
      switch (role) {
        case "HRD Location":
          url = "/api/mp-plannings";
          break;
        case "HRD Unit":
          prm = {
            approver_type: "manager",
            organization_id: get_user("employee.organization_id"),
          };
          break;
        case "Direktur Unit":
          prm = {
            approver_type: "direktur",
            organization_id: get_user("employee.organization_id"),
          };
          break;
        default:
          prm = {
            approver_type: "admin",
          };
      }
      const params = await events("onload-param", prm);
      const result: any = await apix({
        port: "mpp",
        value: "data.data.total",
        path: `${url}${params}`,
        validate: "object",
      });
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
          if (local.tab === "completed") return <></>;
          if (!local.can_add) return <></>;
          return (
            <>
              <div className="flex flex-row flex-grow">
                <ButtonLink className="bg-primary" href={"/d/location/new"}>
                  <div className="flex items-center gap-x-0.5">
                    <HiPlus className="text-xl" />
                    <span className="capitalize">Add New</span>
                  </div>
                </ButtonLink>
              </div>
            </>
          );
        },
      }}
      column={() => {
        return columnMpp({
          id: local.tab,
          role: local.roles?.name,
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
            const roles = rolesMpp([local.roles]);
            url = "/api/mp-plannings/approver-type";
            switch (roles) {
              case "HRD Location":
                url = "/api/mp-plannings";
                break;
              case "HRD Unit":
                prm = {
                  approver_type: "manager",
                  organization_id: get_user("employee.organization_id"),
                };
                break;
              case "Direktur Unit":
                prm = {
                  approver_type: "direktur",
                  organization_id: get_user("employee.organization_id"),
                };
                break;
              default:
                prm = {
                  approver_type: "admin",
                };
            }
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
              : res.data.data.organization_locations;
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
          url = "/api/mp-plannings/completed";
        } else {
          const roles = rolesMpp([local.roles]);
          url = "/api/mp-plannings/approver-type";
          switch (roles) {
            case "HRD Location":
              url = "/api/mp-plannings";
              break;
            case "HRD Unit":
              prm = {
                approver_type: "manager",
                organization_id: get_user("employee.organization_id"),
              };
              break;
            case "Direktur Unit":
              prm = {
                approver_type: "direktur",
                organization_id: get_user("employee.organization_id"),
              };
              break;
            default:
              prm = {
                approver_type: "admin",
              };
          }
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
