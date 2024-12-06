"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import api from "@/lib/axios";
import { getValue } from "@/lib/getValue";

function Page() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          <span className="">Organization Structure</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
        <TableList
          name="Organization Structure"
          header={{
            sideLeft: (data: any) => {
              return <></>;
            },
          }}
          column={[
            {
              name: "organization.name",
              header: () => <span>Organization</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, "organization.name")}</>;
              },
            },
            {
              name: "name",
              header: () => <span>Name</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, "name")}</>;
              },
            },
            {
              name: "parent",
              header: () => <span>Parent</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, "parent.name")}</>;
              },
            },
          ]}
          onLoad={async (param: any) => {
            // const res: any = await api.get("/api/organization-structures");
            // const data: any[] = res.data.data.OrganizationStructures
            // return data || []
            const res: any = await api.get(
              "https://jsonplaceholder.typicode.com/users"
            );
            console.log(res);
            return res.data;
          }}
          onInit={async (list: any) => {}}
        />
      </div>
    </div>
  );
}

export default Page;
