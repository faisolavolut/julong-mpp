"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import api from "@/lib/axios";
import { getValue } from "@/lib/getValue";

function Page() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4 pt-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          <span className="">Jobs</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
        <TableList
          name="Job"
          header={{
            sideLeft: (data: any) => {
              return <></>;
            },
          }}
          column={[
            {
              name: "organization_structure.organization.name",
              header: () => <span>Organization</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "name",
              header: () => <span>Name</span>,
              width: 300,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
              },
            },
            {
              name: "parent.name",
              header: () => <span>Parent</span>,
              width: 300,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
              },
            },
          ]}
          onLoad={async (param: any) => {
            const res: any = await api.get("https://julong-portal.avolut.com/api/jobs");
            const data: any[] = res.data.data.jobs;
            return data || [];
          }}
          onInit={async (list: any) => {}}
        />
      </div>
    </div>
  );
}

export default Page;
