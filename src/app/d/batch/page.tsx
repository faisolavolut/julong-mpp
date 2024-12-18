"use client";
import { AlertBatch } from "@/app/components/comp/AlertBatch";
import { TableList } from "@/app/components/tablelist/TableList";
import { Tablist } from "@/app/components/tablist/Tablist";
import { ButtonBetter } from "@/app/components/ui/button";
import { ButtonLink } from "@/app/components/ui/button-link";
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
  });
  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      const access = getAccess("create-mpp", roles);
      if (access) {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods/current?status=open`
        );
        if (res?.data?.data) {
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
          <span className="">Batch</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
        <Tablist
        disabledPagination={true}
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
                <div className="w-full flex flex-row flex-grow">
                  <div
                    className={cx(
                      "flex flex-grow flex-col h-[350px]",
                    )}
                  >
                    <TableList
                      name="Location"
                      header={{
                        sideLeft: (data: any) => {
                          if (!local.can_add) return <></>;
                          return (
                            <>
                            <AlertBatch/>
                            </>
                          );
                        },
                      }}
                      column={[
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
                        {
                          name: "action",
                          header: () => <span>Action</span>,
                          sortable: false,
                          renderCell: ({ row, name, cell }: any) => {
                            return (
                              <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                                <ButtonLink
                                  className="bg-primary"
                                  href={`/d/bacth/${row.id}/view`}
                                >
                                  <div className="flex items-center gap-x-2">
                                    <IoEye className="text-lg" />
                                  </div>
                                </ButtonLink>
                              </div>
                            );
                          },
                        },
                      ]}
                      onLoad={async (param: any) => {
                        const addtional = {
                          ...param,
                          status: "APPROVED"
                        }
                        const params = await events("onload-param", addtional);
                        console.log(params)
                        const res: any = await api.get(
                          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/batch` +
                            params
                        );
                        const data: any[] = res.data.data.organization_locations;
                        if (!Array.isArray(data)) return [];
                        return data || [];
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
