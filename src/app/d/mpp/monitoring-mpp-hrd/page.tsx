"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import { ButtonBetter } from "@/app/components/ui/button";
import { ButtonLink } from "@/app/components/ui/button-link";
import api from "@/lib/axios";
import { shortDate } from "@/lib/date";
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
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4 pt-0">
        <h2 className="text-xl font-semibold text-gray-900 ">
          <span className="">Monitoring MPP</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
        <TableList
          name="monitoring mpp"
          header={{
            sideLeft: (data: any) => {
              return (
                <>
                  <div className="flex flex-row flex-grow gap-x-1">
                    <ButtonLink
                      className="bg-primary"
                      href={"/d/mpp/monitoring-mpp-hrd/new"}
                    >
                      <div className="flex items-center gap-x-0.5">
                        <HiPlus className="text-xl" />
                        <span className="capitalize">Add New</span>
                      </div>
                    </ButtonLink>
                    <ButtonBetter variant="outline">
                      <div className="flex items-center gap-x-1">
                        <HiDocumentDownload className="text-xl" />
                        <span>Export</span>
                      </div>
                    </ButtonBetter>
                  </div>
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
                  <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/mpp/monitoring-mpp-hrd/${row.id}/view`}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
                      </div>
                    </ButtonLink>
                    <ButtonLink
                      className="bg-primary"
                      href={`/d/mpp/monitoring-mpp-hrd/${row.id}/edit`}
                    >
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                      </div>
                    </ButtonLink>
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
