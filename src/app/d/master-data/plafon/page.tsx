"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import api from "@/lib/axios";
import { getValue } from "@/lib/getValue";
import { Button } from "flowbite-react";
import Link from "next/link";
import { HiOutlinePencilAlt, HiPlus, HiTrash } from "react-icons/hi";
import { IoEye } from "react-icons/io5";

function Page() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          <span className="">Plafon</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
        <TableList
          name="Plafon"
          header={{
            sideLeft: (data: any) => {
              return (
                <></>
              );
            },
          }}
          column={[
            {
              name: "Organization",
              header: () => <span>Organization</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, "organization.name")}</>;
              },
            },
            {
              name: "job",
              header: () => <span>Job</span>,
              width: 300,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, "job.name")}</>;
              },
            },
            {
              name: "plafon",
              header: () => <span>Plafon</span>,
              width: 300,
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
                    <Button
                      className="bg-primary-500"
                      onClick={() => {
                        navigate(`/d/master-data/plafon/${row.id}/view`);
                      }}
                    >
                      <div className="flex items-center gap-x-2">
                        <IoEye className="text-lg" />
                      </div>
                    </Button>
                    <Button
                      className="bg-primary-500"
                      onClick={() => {
                        navigate(`/d/master-data/plafon/${row.id}/edit`);
                      }}
                    >
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                      </div>
                    </Button>
                  </div>
                );
              },
            },
          ]}
          onLoad={async (param: any) => {
            
            
            // const res: any = await api.get("/api/organization-structures");
            // const data: any[] = res.data.data.plafon
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
