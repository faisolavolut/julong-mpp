"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import api from "@/lib/axios";
import { events } from "@/lib/event";
import { generateQueryString } from "@/lib/generateQueryString";
import { joinString } from "@/lib/joinString";
import { Breadcrumb } from "flowbite-react";

function Page() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4 pt-0">
        <h2 className="text-xl font-semibold text-gray-900 ">
          <span className="">Organizations</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
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
                  const data = row.organization_locations;
                  return <>{joinString(data, "name")}</>;
                },
              },
            ]}
            onLoad={async (param: any) => {
              const params = await events("onload-param", param);
              const res: any = await api.get(
                `${process.env.NEXT_PUBLIC_API_PORTAL}/api/organizations` + params
              );
              const data: any[] = res.data.data.organizations;
              console.log({data, n: data.length})
              return data || [];
            }}
            onInit={async (list: any) => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
