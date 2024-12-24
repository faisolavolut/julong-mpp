"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import { ButtonBetter } from "@/app/components/ui/button";
import { ButtonLink } from "@/app/components/ui/button-link";
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
  });
  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      const access = getAccess("create-mpr", roles);
      if (access) {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods/current?status=complete`
        );
        if (res?.data?.data) {
          local.can_add = true;
        }
      }
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
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
        <TableList
          name="Manpower Request Overview"
          header={{
            sideLeft: (data: any) => {
              if (!local.can_add) return <></>;
              return (
                <>
                  <div className="flex flex-row flex-grow">
                    <ButtonLink className="bg-primary" href={"/d/mpr-hrd/new"}>
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
          column={[
            {
              name: "document_number",
              header: () => <span>Document Number</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "document_date",
              header: () => <span>Document Date</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{shortDate(new Date())}</>;
              },
            },
            {
              name: "organization_name",
              header: () => <span>Organization</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "requestor_name",
              header: () => <span>Requestor</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "job_name",
              header: () => <span>Job Requested</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "status",
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
                    {["DRAFT", "REJECTED"].includes(getValue(row, "status")) ? (
                      <ButtonLink
                        className="bg-primary"
                        href={`/d/mpr-hrd/${row.id}/edit`}
                      >
                        <div className="flex items-center gap-x-2">
                          <HiOutlinePencilAlt className="text-lg" />
                        </div>
                      </ButtonLink>
                    ) : (
                      <ButtonLink
                        className="bg-primary"
                        href={`/d/mpr-hrd/${row.id}/view`}
                      >
                        <div className="flex items-center gap-x-2">
                          <IoEye className="text-lg" />
                        </div>
                      </ButtonLink>
                    )}
                  </div>
                );
              },
            },
          ]}
          onLoad={async (param: any) => {
            const params = await events("onload-param", param);
            const res: any = await api.get(
              `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-requests` + params
            );
            const data: any[] = res.data.data.mp_request_header;
            if (!Array.isArray(data)) return [];
            return data || [];
          }}
          onInit={async (list: any) => {}}
        />
      </div>
    </div>
  );
}

export default Page;
