"use client";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { events } from "@/lib/utils/event";
import { getValue } from "@/lib/utils/getValue";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect } from "react";
import { access } from "@/lib/utils/getAccess";
import { apix } from "@/lib/utils/apix";
import { getNumber } from "@/lib/utils/getNumber";
import { IoEye } from "react-icons/io5";
import api from "@/lib/utils/axios";
import { ButtonLink } from "@/lib/components/ui/button-link";
import { getStatusLabel } from "@/constants/status-mpp";
import { shortDate } from "@/lib/utils/date";
import { HiOutlinePencilAlt, HiPlus } from "react-icons/hi";

function Page() {
  const local = useLocal({
    can_add: false,
    can_edit: false,
  });
  useEffect(() => {
    const run = async () => {
      const check = await api.get(
        `${process.env.NEXT_PUBLIC_API_MPP}/api/mpp-periods/status?status=open`
      );
      console.log(process.env.NEXT_PUBLIC_API_MPP);

      if (!check.data.data?.mppperiod) local.can_add = access("create-period");
      local.can_edit = access("edit-period");
      local.render();
    };
    run();
  }, []);

  return (
    <TableUI
      title="Period"
      name="period"
      header={{
        sideLeft: (data: any) => {
          if (!local.can_add) return <></>;
          if (!local.can_edit) return <></>;
          return (
            <>
              <div className="flex flex-row flex-grow">
                <ButtonLink className="bg-primary" href={"/d/period/new"}>
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
            return <>{getStatusLabel(getValue(row, name))}</>;
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
                    href={`/d/period/${row.id}/view`}
                  >
                    <div className="flex items-center gap-x-2">
                      <IoEye className="text-lg" />
                    </div>
                  </ButtonLink>
                </div>
              );
            } else {
              if (!local.can_edit) return <></>;
              return (
                <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/period/${row.id}/edit`}
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
        const result: any = await apix({
          port: "mpp",
          value: "data.data.mppperiods",
          path: `/api/mpp-periods${params}`,
          validate: "array",
        });
        return result;
      }}
      onInit={async (list: any) => {}}
      onCount={async () => {
        const result: any = await apix({
          port: "portal",
          value: "data.data.total",
          path: `/api/mpp-periods?page=1&page_size=1`,
          validate: "object",
        });
        return getNumber(result);
      }}
    />
  );
}

export default Page;
