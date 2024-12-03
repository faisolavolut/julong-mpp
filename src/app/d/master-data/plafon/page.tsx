"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import api from "@/lib/axios";
import { Button } from "flowbite-react";
import Link from "next/link";
import { HiOutlinePencilAlt, HiPlus, HiTrash } from "react-icons/hi";
import { IoEye } from "react-icons/io5";

function Page() {
  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-grow flex-col">
        <TableList
          name="Plafon"
          header={{
            sideRight: (data: any) => {
              return (
                <>
                  <div className="flex flex-row flex-grow">
                    <Link href={"/d/master-data/plafon/new"}>
                      <Button className="bg-primary-500">
                        <div className="flex items-center gap-x-3">
                          <HiPlus className="text-xl" />
                          <span className="capitalize">Add Plafon</span>
                        </div>
                      </Button>
                    </Link>
                  </div>
                </>
              );
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
              name: "job",
              header: () => <span>Job</span>,
              width: 300,
              renderCell: ({ row, name, cell }: any) => {
                return <>{row.name}</>;
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
                  <div className="flex items-center gap-x-3 whitespace-nowrap">
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
                        navigate(`/d/master-data/plafon/${row.id}`);
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