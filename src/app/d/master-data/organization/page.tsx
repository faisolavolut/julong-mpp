"use client";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { events } from "@/lib/utils/event";
import { apix } from "@/lib/utils/apix";
import { getNumber } from "@/lib/utils/getNumber";

function Page() {
  return (
    <TableUI
      filter={false}
      title="Organizations"
      name="Organization"
      header={{
        sideLeft: (data: any) => {
          return <></>;
        },
      }}
      column={[
        {
          name: "name",
          header: "Organization",
          renderCell: ({ row, name, cell }: any) => {
            return <>{row.name}</>;
          },
        },
      ]}
      onLoad={async (param: any) => {
        const params = await events("onload-param", param);
        const result: any = await apix({
          port: "portal",
          value: "data.data.organizations",
          path: `/api/organizations${params}`,
          validate: "array",
        });
        return result;
      }}
      onCount={async (param) => {
        const result: any = await apix({
          port: "portal",
          value: "data.data.total",
          path: `/api/organizations${param}`,
          validate: "object",
        });
        return getNumber(result);
      }}
      onInit={async (list: any) => {}}
    />
  );
}

export default Page;
