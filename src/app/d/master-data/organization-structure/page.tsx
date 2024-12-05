"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import api from "@/lib/axios";
import { getValue } from "@/lib/getValue";

function Page() {
  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-grow flex-col">
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
