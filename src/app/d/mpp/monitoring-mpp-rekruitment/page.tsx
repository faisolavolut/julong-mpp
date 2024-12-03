"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
import { Button } from "flowbite-react";
import Link from "next/link";
import { HiOutlinePencilAlt, HiPlus, HiTrash } from "react-icons/hi";
import { IoEye } from "react-icons/io5";

function Page() {
  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-grow flex-col">
        <TableList
          name="monitoring mpp"
          header={{
            sideRight: (data: any) => {
              return (
                <>
                  
                </>
              );
            },
          }}
          column={[
            {
              name: "document_number",
              header: () => <span>Document Number</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
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
              name: "organization",
              header: () => <span>Organization</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
              },
            },
            {
              name: "company",
              header: () => <span>Company</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
              },
            },
            {
              name: "location",
              header: () => <span>Location</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
              },
            },
            {
              name: "requestor",
              header: () => <span>Requestor</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
              },
            },
            {
              name: "job_position",
              header: () => <span>Job Position</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
              },
            },
            {
              name: "status",
              header: () => <span>Status</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
              },
            },
            {
              name: "action",
              header: () => <span>Action</span>,
              sortable: false,
              renderCell: ({ row, name, cell }: any) => {
                return (
                  <div className="flex items-center gap-x-3 whitespace-nowrap">
                    <Button
                      className="bg-primary-500"
                      onClick={() => {
                        navigate(`/d/mpp/monitoring-mpp-rekruitment/${row.id}`);
                      }}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
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
