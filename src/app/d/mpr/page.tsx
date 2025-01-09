"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import { ButtonBetter } from "@/app/components/ui/button";
import { ButtonLink } from "@/app/components/ui/button-link";
import { Skeleton } from "@/app/components/ui/Skeleton";
import { columnMpr, rolesMpr } from "@/constants/column-mpr";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
import { events } from "@/lib/event";
import { getAccess, userRoleMe } from "@/lib/getAccess";
import { getValue } from "@/lib/getValue";
import { useLocal } from "@/lib/use-local";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useEffect } from "react";
import {
  HiDocumentDownload,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { IoEye } from "react-icons/io5";

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
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4 pt-0">
        <h2 className="text-xl font-semibold text-gray-900 ">
          <span className="">Manpower Request</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden border border-gray-300">
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
          <TableList
            name="Manpower Request Overview"
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
          />
        )}
      </div>
    </div>
  );
}

export default Page;
