"use client";
import { ButtonLink } from "@/lib/components/ui/button-link";
import { columnMpr, rolesMpr } from "@/constants/column-mpr";
import api from "@/lib/utils/axios";
import { events } from "@/lib/utils/event";
import { getAccess, userRoleMe } from "@/lib/utils/getAccess";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { apix } from "@/lib/utils/apix";
import { getNumber } from "@/lib/utils/getNumber";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
    roles: null as any,
    ready: false as boolean,
    role: null as any,
    column: [] as any[],
  });
  useEffect(() => {
    const run = async () => {
      local.ready = false;
      local.render();
      const roles = await userRoleMe();
      try {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods/current?status=complete`
        );
        if (res?.data?.data) {
          local.can_add = getAccess("create-mpr", roles);
        }
        local.can_edit = getAccess("edit-mpr", roles);
      } catch (ex) {}
      local.roles = roles?.[0];
      local.role = rolesMpr(roles);
      local.render();
      local.column = columnMpr({
        local,
      });
      local.ready = true;
      local.render();
    };
    run();
  }, []);

  return (
    <TableUI
      ready={local.ready}
      header={{
        sideLeft: (data: any) => {
          if (!local.can_add) return <></>;
          return (
            <>
              <div className="flex flex-row flex-grow">
                <ButtonLink className="bg-primary" href={"/d/mpr/new"}>
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
      column={local.column}
      onLoad={async (param: any) => {
        const prm = {
          ...param,
          approver_type:
            local.role === "Staff"
              ? "requestor"
              : local.role === "Departmen Head"
              ? "department_head"
              : local.role === "Vice President"
              ? "vp_gm_director"
              : local.role === "HO"
              ? "hrd_ho_unit"
              : null,
        };
        const params = await events("onload-param", prm);
        const res: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-requests` + params
        );
        const data: any[] = res.data.data.mp_request_header;
        if (!Array.isArray(data)) return [];
        return data || [];
      }}
      onInit={async (list: any) => {}}
      onCount={async () => {
        let prm = {
          take: 1,
          paging: 1,
          approver_type:
            local.role === "Staff"
              ? "requestor"
              : local.role === "Departmen Head"
              ? "department_head"
              : local.role === "Vice President"
              ? "vp_gm_director"
              : local.role === "HO"
              ? "hrd_ho_unit"
              : null,
        } as any;
        const params = await events("onload-param", prm);
        const result: any = await apix({
          port: "mpp",
          value: "data.data.total",
          path: `/api/mp-requests${params}`,
          validate: "object",
        });
        return getNumber(result);
      }}
    />
  );
}

export default Page;
