"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import { TabHeader } from "@/app/components/tablist/TabHeader";
import { Tablist } from "@/app/components/tablist/Tablist";
import { ButtonBetter } from "@/app/components/ui/button";
import { ButtonLink } from "@/app/components/ui/button-link";
import { Skeleton } from "@/app/components/ui/Skeleton";
import { columnMpp, rolesMpp } from "@/constants/column-mpp";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
import { events } from "@/lib/event";
import { get_user } from "@/lib/get_user";
import { accessMe, getAccess, userRoleMe } from "@/lib/getAccess";
import { getValue } from "@/lib/getValue";
import { useLocal } from "@/lib/use-local";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useEffect } from "react";
import { HiPlus } from "react-icons/hi";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
    roles: null as any,
    ready: false as boolean,
    tab: "on_going",
  });
  useEffect(() => {
    const run = async () => {
      local.ready = false;
      local.render();
      const roles = await userRoleMe();
      const access = getAccess("create-mpp", roles);
      if (access) {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods/status?status=open`
        );
        if (res?.data?.data?.mppperiod) {
          local.can_add = getAccess("create-mpp", roles);
        }
      }
      local.roles = roles?.[0];
      local.can_edit = getAccess("edit-mpp", roles);
      local.ready = true;
      local.render();
    };
    run();
  }, []);
  return (
    <div className="flex flex-col flex-grow gap-y-4">
      <div className="flex flex-row p-4 items-center bg-white border border-gray-300 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900">
          <span className="">Manpower Planning Overview</span>
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
          hiddenHeaderTab={true}
            value={local.tab}
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
                role: local.roles?.name,
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
                            if (data?.id === "completed") return <></>;
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
                                      <span className="capitalize">
                                        Add New
                                      </span>
                                    </div>
                                  </ButtonLink>
                                </div>
                              </>
                            );
                          },
                        }}
                        column={col}
                        onLoad={async (param: any) => {
                          let prm = {
                            ...param,
                          };
                          try {
                            let url = "/api/mp-plannings/approver-type";
                            if (data?.id === "completed") {
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
                                    organization_id: get_user(
                                      "employee.organization_id"
                                    ),
                                  };
                                  break;
                                case "Direktur Unit":
                                  prm = {
                                    approver_type: "direktur",
                                    organization_id: get_user(
                                      "employee.organization_id"
                                    ),
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
                              `${process.env.NEXT_PUBLIC_API_MPP}${url}` +
                                params
                            );
                            const result: any[] =
                              url === "/api/mp-plannings"
                                ? res.data.data.mp_planning_headers
                                : data?.id === "completed"
                                ? res.data.data
                                : res.data.data.organization_locations;
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
