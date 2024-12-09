"use client";
import { TableList } from "@/app/components/tablelist/TableList";
import api from "@/lib/axios";
import { useLocal } from "@/lib/use-local";
import { Button } from "flowbite-react";
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi";

function Page() {
  const local = useLocal({
    data: null as any,
  });
  return (
    <div className="w-full flex flex-row flex-grow">
      <div className="flex flex-grow flex-col">
      <TableList 
          name="user"
          column={[
            {
              name: "name",
              header: () => <span>Last Name</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>123</>;
              },
            },
            {
              name: "action",
              header: () => <span>Action</span>,
              sortable: false,
              renderCell: ({ row, name, cell }: any) => {
                return <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                <Button
                  className="bg-primary"
                  onClick={() => {
                    navigate(`/d/tablelist/${row.id}`)
                  }}
                >
                  <div className="flex items-center gap-x-2">
                    <HiOutlinePencilAlt className="text-lg" />
                  </div>
                </Button>
                <Button color="failure" className="bg-red-500">
                  <div className="flex items-center gap-x-2">
                    <HiTrash className="text-lg" />
                  </div>
                </Button>
              </div>;
              },
            },
          ]}
          onLoad={async (param: any) => {
            const res: any = await api.get(
              "https://jsonplaceholder.typicode.com/users"
            );
            console.log(res)
            return res.data
          }}
          onInit={async(list: any) => {

          }}/>
      </div>
    </div>
  );
}

export default Page;
