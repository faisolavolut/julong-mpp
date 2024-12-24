"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import { Tablist } from "@/app/components/tablist/Tablist";
import { ButtonBetter } from "@/app/components/ui/button";
import { ButtonLink } from "@/app/components/ui/button-link";
import { columnMpp } from "@/constants/column-mpp";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
import { events } from "@/lib/event";
import { accessMe, getAccess, userRoleMe } from "@/lib/getAccess";
import { getValue } from "@/lib/getValue";
import { useLocal } from "@/lib/use-local";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useEffect } from "react";
import {
  HiPlus,
} from "react-icons/hi";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
  });
  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      const access = getAccess("create-mpp", roles);
      if (access) {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods/status?status=open`
        );
        if (res?.data?.data?.mppperiod) {
          local.can_add = true;
        }
      }
      const edit = getAccess("edit-mpp", roles);
      local.can_edit = edit;
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
            return (
              <>
                <div className="w-full flex flex-col flex-grow">
                  <div className={cx("flex flex-grow flex-col h-[380px]")}>
                    <TableList
                      name="Location"
                      header={{
                        sideLeft: (data: any) => {
                          if (!local.can_add) return <></>;
                          return (
                            <>
                              <div className="flex flex-row flex-grow">
                                <ButtonLink
                                  className="bg-primary"
                                  href={"/d/location/new"}
                                >
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
                      column={columnMpp({ ...data, local })}
                      onLoad={async (param: any) => {
                        try {
                          const params = await events("onload-param", param);
                          const res: any = await api.get(
                            `${process.env.NEXT_PUBLIC_API_MPP}${
                              data.id === "completed"
                                ? "/api/mp-plannings/completed"
                                : "/api/mp-plannings"
                            }` + params
                          );
                          const result: any[] =
                            res.data.data.mp_planning_headers;
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
      </div>
    </div>
  );
}

export default Page;
