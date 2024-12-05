"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import api from "@/lib/axios";
import { joinString } from "@/lib/joinString";

function Page() {
  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-grow flex-col">
        <TableList
          name="Organization"
          header={{
            sideLeft: (data: any) => {
              return <></>;
            },
          }}
          column={[
            {
              name: "name",
              header: () => <span>Organization</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
              },
            },
            {
              name: "organization_location",
              header: () => <span>Organization Location</span>,
              width: 300,
              renderCell: ({ row, name, cell }: any) => {
                const data = row.organization_location;
                return <>{joinString(data, "name")}</>;
              },
            },
          ]}
          onLoad={async (param: any) => {
            // await api.get("/api/users/me")  
            // console.log("HALO")
            // await api.get("http://localhost:3000/api/proxy/api/organizations")
            // const res: any = await api.get("/api/organizations");
            // const data: any[] = res.data.data.organizations
            // return data || []
            
            const res: any = await api.get(
              "https://jsonplaceholder.typicode.com/users"
            );
            return res.data;
          }}
          onInit={async (list: any) => {}}
        />
      </div>
    </div>
  );
}

export default Page;
