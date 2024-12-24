"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import { ButtonLink } from "@/app/components/ui/button-link";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
import { events } from "@/lib/event";
import { getValue } from "@/lib/getValue";
import { useLocal } from "@/lib/use-local";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useEffect } from "react";
import { HiOutlinePencilAlt, HiPlus, HiTrash } from "react-icons/hi";
import { IoEye } from "react-icons/io5";

function Page() {
  const local = useLocal({
    can_add: false,
  });
  useEffect(() => {
    const run = async () => {
      const check = await api.get(
        `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods/status?status=open`
      );
      if (!check.data.data?.mppperiod) local.can_add = true;
      local.render();
    };
    run();
  }, []);
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4 pt-0">
        <h2 className="text-xl font-semibold text-gray-900 ">
          <span className="">Period</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
        <TableList
          name="period"
          header={{
            sideLeft: (data: any) => {
              if (!local.can_add) return <></>;
              return (
                <>
                  <div className="flex flex-row flex-grow">
                    <ButtonLink
                      className="bg-primary"
                      href={"/d/mpp/period/new"}
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
          column={[
            {
              name: "title",
              header: () => <span>title</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "start_date",
              header: () => <span>Start Date</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{shortDate(getValue(row, name))}</>;
              },
            },
            {
              name: "end_date",
              header: () => <span>End Date</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{shortDate(getValue(row, name))}</>;
              },
            },
            {
              name: "budget_start_date",
              header: () => <span>Budget Start Date</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{shortDate(getValue(row, name))}</>;
              },
            },
            {
              name: "budget_end_date",
              header: () => <span>Budget End Date</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{shortDate(getValue(row, name))}</>;
              },
            },
            {
              name: "status",
              header: () => <span>Status</span>,
              renderCell: ({ row, name, cell }: any) => {
                return (
                  <div className="capitalize">
                    {getValue(row, name) === "not_open"
                      ? "Not Open"
                      : getValue(row, name)}
                  </div>
                );
              },
            },
            {
              name: "action",
              header: () => <span>Action</span>,
              sortable: false,
              renderCell: ({ row, name, cell }: any) => {
                if (getValue(row, "status") !== "draft") {
                  return (
                    <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                      <ButtonLink
                        className="bg-primary"
                        href={`/d/mpp/period/${row.id}/view`}
                      >
                        <div className="flex items-center gap-x-2">
                          <IoEye className="text-lg" />
                        </div>
                      </ButtonLink>
                    </div>
                  );
                } else {
                  return (
                    <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                      <ButtonLink
                        className="bg-primary"
                        href={`/d/mpp/period/${row.id}/edit`}
                      >
                        <div className="flex items-center gap-x-2">
                          <HiOutlinePencilAlt className="text-lg" />
                        </div>
                      </ButtonLink>
                    </div>
                  );
                }
              },
            },
          ]}
          onLoad={async (param: any) => {
            const params = await events("onload-param", param);
            const res: any = await api.get(
              `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods` + params
            );
            const data: any[] = res.data.data.mppperiods;

            return data || [];
          }}
          onInit={async (list: any) => {}}
        />
      </div>
    </div>
  );
}

export default Page;
