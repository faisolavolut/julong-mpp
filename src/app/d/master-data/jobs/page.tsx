"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import api from "@/lib/axios";

function Page() {
  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-grow flex-col">
        <TableList
          name="Job"
          header={{
            sideRight: (data: any) => {
              return <></>;
            },
          }}
          column={[
            {
              name: "Organization",
              header: () => <span>Organization</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
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
              name: "parent",
              header: () => <span>Parent</span>,
              width: 300,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
              },
            },
          ]}
          onLoad={async (param: any) => {
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
