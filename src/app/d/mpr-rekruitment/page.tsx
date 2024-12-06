"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
import { getValue } from "@/lib/getValue";
import { Button } from "flowbite-react";
import Link from "next/link";
import {
  HiDocumentDownload,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { IoEye } from "react-icons/io5";

function Page() {
  return (
    <div className="w-full flex flex-row flex-grow">
      <div className="flex flex-grow flex-col">
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
              header: () => <span>Document Number</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "mpp_number",
              header: () => <span>MPP Number</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "document_date",
              header: () => <span>Document Date</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{shortDate(new Date())}</>;
              },
            },
            {
              name: "organization.name",
              header: () => <span>Organization</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "company.name",
              header: () => <span>Company</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "location",
              header: () => <span>Location</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "requestor",
              header: () => <span>Requestor</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "job_position",
              header: () => <span>Job Position</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "amount",
              header: () => <span>Amount</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "status",
              header: () => <span>Status</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "request_type",
              header: () => <span>Request Type</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, name)}</>;
              },
            },
            {
              name: "action",
              header: () => <span>Action</span>,
              sortable: false,
              renderCell: ({ row, name, cell }: any) => {
                return (
                  <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                    <Button
                      className="bg-primary-500"
                      onClick={() => {
                        navigate(`/d/mpr-hrd/${row.id}/view`);
                      }}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
                      </div>
                    </Button>
                    <Button color="gray">
                      <div className="flex items-center gap-x-2">
                        <HiDocumentDownload className="text-xl" />
                      </div>
                    </Button>
                  </div>
                );
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
