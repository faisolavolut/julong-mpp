"use client";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { events } from "@/lib/utils/event";
import { getValue } from "@/lib/utils/getValue";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect } from "react";
import { access } from "@/lib/utils/getAccess";
import { apix } from "@/lib/utils/apix";
import { getNumber } from "@/lib/utils/getNumber";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import { ButtonLink } from "@/lib/components/ui/button-link";

function Page() {
  const local = useLocal({
    edit: false,
  });
  useEffect(() => {
    const run = async () => {
      const result = access("edit-plafon");
      local.edit = result;
      local.render();
    };
    run();
  }, []);
  return (
    <TableUI
      title="Plafon"
      name="Plafon"
      header={{
        sideLeft: (data: any) => {
          return <></>;
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
          name: "job_name",
          header: () => <span>Job</span>,
          width: 300,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "plafon",
          header: () => <span>Plafon</span>,
          width: 50,
          renderCell: ({ row, name, cell }: any) => {
            return <div className="text-left">{getValue(row, name)}</div>;
          },
        },
        {
          name: "action",
          header: () => <span>Action</span>,
          sortable: false,
          renderCell: ({ row, name, cell }: any) => {
            return (
              <div className="flex items-center  gap-x-2 whitespace-nowrap">
                {!local.edit && (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/master-data/plafon/${row.id}/view`}
                  >
                    <div className="flex items-center gap-x-2">
                      <IoEye className="text-lg" />
                    </div>
                  </ButtonLink>
                )}

                {local.edit && (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/master-data/plafon/${row.id}/edit`}
                  >
                    <div className="flex items-center gap-x-2">
                      <HiOutlinePencilAlt className="text-lg" />
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
        const result: any = await apix({
          port: "mpp",
          value: "data.data.job_plafons",
          path: `/api/job-plafons${params}`,
          validate: "array",
        });
        return result;
      }}
      onInit={async (list: any) => {}}
      onCount={async () => {
        const result: any = await apix({
          port: "portal",
          value: "data.data.total",
          path: `/api/job_plafons?page=1&page_size=1`,
          validate: "object",
        });
        return getNumber(result);
      }}
    />
  );
}

export default Page;
