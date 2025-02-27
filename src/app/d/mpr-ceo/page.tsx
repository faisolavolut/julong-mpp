"use client";
import { TableList } from "@/lib/components/tablelist/TableList";
import { ButtonLink } from "@/lib/components/ui/button-link";
import { getStatusLabel } from "@/constants/status-mpp";
import api from "@/lib/utils/axios";
import { shortDate } from "@/lib/utils/date";
import { events } from "@/lib/utils/event";
import { getValue } from "@/lib/utils/getValue";
import { IoEye } from "react-icons/io5";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { apix } from "@/lib/utils/apix";
import { getNumber } from "@/lib/utils/getNumber";

function Page() {
  return (
    <TableUI
      title="Manpower Request Overview"
      name="Manpower Request Overview"
      header={{
        sideLeft: (data: any) => {
          return <></>;
        },
      }}
      column={[
        {
          name: "document_number",
          header: "Document Number",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_date",
          header: "Document Date",
          renderCell: ({ row, name, cell }: any) => {
            return <>{shortDate(new Date())}</>;
          },
        },
        {
          name: "organization_name",
          header: "Organization",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "requestor_name",
          header: "Requestor",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "job_name",
          header: "Job Requested",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "status",
          header: "Status",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getStatusLabel(getValue(row, name))}</>;
          },
        },
        {
          name: "action",
          header: "Action",
          filter: false,
          sortable: false,
          renderCell: ({ row, name, cell }: any) => {
            return (
              <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                <ButtonLink
                  className="bg-primary"
                  href={`/d/mpr-ceo/${row.id}/view`}
                >
                  <div className="flex items-center gap-x-2">
                    <IoEye className="text-lg" />
                  </div>
                </ButtonLink>
              </div>
            );
          },
        },
      ]}
      onLoad={async (param: any) => {
        const prm = {
          ...param,
          approver_type: "ceo",
        };
        const params = await events("onload-param", prm);
        const result: any = await apix({
          port: "mpp",
          value: "data.data.mp_request_header",
          path: `/api/mp-requests${params}`,
          validate: "array",
        });
        return result;
      }}
      onInit={async (list: any) => {}}
      onCount={async () => {
        let prm = {
          take: 1,
          paging: 1,
          approver_type: "ceo",
        } as any;
        const params = await events("onload-param", prm);
        const result: any = await apix({
          port: "mpp",
          value: "data.data.total",
          path: `/api/mp-requests${params}`,
          validate: "object",
        });
        return getNumber(result);
      }}
    />
  );
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4 pt-0">
        <h2 className="text-xl font-semibold text-gray-900 ">
          <span className="">Manpower Request</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden border border-gray-300">
        <TableList
          name="Manpower Request Overview"
          header={{
            sideLeft: (data: any) => {
              return <></>;
            },
          }}
          column={[
            {
              name: "document_number",
              header: "Document Number",
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "document_date",
              header: "Document Date",
              renderCell: ({ row, name, cell }: any) => {
                return <>{shortDate(new Date())}</>;
              },
            },
            {
              name: "organization_name",
              header: "Organization",
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "requestor_name",
              header: "Requestor",
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "job_name",
              header: "Job Requested",
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "status",
              header: "Status",
              renderCell: ({ row, name, cell }: any) => {
                return <>{getStatusLabel(getValue(row, name))}</>;
              },
            },
            {
              name: "action",
              header: "Action",
              filter: false,
              sortable: false,
              renderCell: ({ row, name, cell }: any) => {
                return (
                  <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/mpr-ceo/${row.id}/view`}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
                      </div>
                    </ButtonLink>
                  </div>
                );
              },
            },
          ]}
          onLoad={async (param: any) => {
            const pr = {
              ...param,
              approver_type: "ceo",
            };
            delete pr["sort"];
            const params = await events("onload-param", pr);
            const res: any = await api.get(
              `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-requests` + params
            );
            const data: any[] = res.data.data.mp_request_header;
            if (!Array.isArray(data)) return [];
            return data || [];
          }}
          onInit={async (list: any) => {}}
        />
      </div>
    </div>
  );
}

export default Page;
