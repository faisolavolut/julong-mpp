"use client";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { events } from "@/lib/utils/event";
import { apix } from "@/lib/utils/apix";
import { getNumber } from "@/lib/utils/getNumber";
import { getValue } from "@/lib/utils/getValue";

function Page() {
  return (
    <TableUI
      title="Organization Structure"
      name="Organization Structure"
      header={{
        sideLeft: (data: any) => {
          return <></>;
        },
        sideRight: (data: any) => {
          return <></>;
        },
      }}
      column={[
        {
          name: "organization.name",
          header: "Organization",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "name",
          header: "Name",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "parent.name",
          header: "Parent",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
      ]}
      onLoad={async (param: any) => {
        const params = await events("onload-param", param);
        const result: any = await apix({
          port: "portal",
          value: "data.data.OrganizationStructures",
          path: `/api/organization-structures${params}`,
          validate: "array",
        });
        return result;
      }}
      onCount={async (param) => {
        const result: any = await apix({
          port: "portal",
          value: "data.data.Total",
          path: `/api/organization-structures${param}`,
          validate: "object",
        });
        return getNumber(result);
      }}
      onInit={async (list: any) => {}}
    />
  );
}

export default Page;
