import { ButtonLink } from "@/app/components/ui/button-link";
import { shortDate } from "@/lib/date";
import { getValue } from "@/lib/getValue";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoEye } from "react-icons/io5";

export const columnMpp = (data: any) => {
  switch (data?.role) {
    case "HRD Site":
      return [
        {
          name: "organization_name",
          header: () => <span>Organization</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "organization_location_name",
          header: () => <span>Location</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_number",
          header: () => <span>Document Number</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_date",
          header: () => <span>Document Date</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{shortDate(new Date(getValue(row, name)))}</>;
          },
        },
        {
          name: "status",
          header: () => <span>Status</span>,
          renderCell: ({ row, name, cell }: any) => {
            switch (getValue(row, name)) {
              case "IN_PROGRESS":
                return <>In Progress</>;
                break;

              default:
                return <>{getValue(row, name)}</>;
                break;
            }
          },
        },
        {
          name: "action",
          header: () => <span>Action</span>,
          sortable: false,
          renderCell: ({ row, name, cell }: any) => {
            return (
              <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                {["REJECTED", "DRAFTED", "DRAFT"].includes(row?.status) &&
                data?.local?.can_edit ? (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/location/${row.id}/edit`}
                  >
                    <div className="flex items-center gap-x-2">
                      <HiOutlinePencilAlt className="text-lg" />
                    </div>
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/location/${row.id}/view`}
                  >
                    <div className="flex items-center gap-x-2">
                      <IoEye className="text-lg" />
                    </div>
                  </ButtonLink>
                )}
              </div>
            );
          },
        },
      ];
      break;
    case "HRD Unit":
      return [
        {
          name: "organization_name",
          header: () => <span>Organization</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "organization_location_name",
          header: () => <span>Location</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_number",
          header: () => <span>Document Number</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_date",
          header: () => <span>Document Date</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{shortDate(new Date(getValue(row, name)))}</>;
          },
        },
        {
          name: "status",
          header: () => <span>Status</span>,
          renderCell: ({ row, name, cell }: any) => {
            switch (getValue(row, name)) {
              case "IN_PROGRESS":
                return <>In Progress</>;
                break;

              default:
                return <>{getValue(row, name)}</>;
                break;
            }
          },
        },
        {
          name: "action",
          header: () => <span>Action</span>,
          sortable: false,
          renderCell: ({ row, name, cell }: any) => {
            return (
              <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                {["REJECTED", "DRAFTED", "DRAFT"].includes(row?.status) &&
                data?.local?.can_edit ? (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/location/${row.id}/edit`}
                  >
                    <div className="flex items-center gap-x-2">
                      <HiOutlinePencilAlt className="text-lg" />
                    </div>
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/location/${row.id}/view`}
                  >
                    <div className="flex items-center gap-x-2">
                      <IoEye className="text-lg" />
                    </div>
                  </ButtonLink>
                )}
              </div>
            );
          },
        },
      ];
      break;
    case "Direktur Unit":
      return [
        {
          name: "organization_name",
          header: () => <span>Organization</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "organization_location_name",
          header: () => <span>Location</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_number",
          header: () => <span>Document Number</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_date",
          header: () => <span>Document Date</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{shortDate(new Date(getValue(row, name)))}</>;
          },
        },
        {
          name: "action",
          header: () => <span>Action</span>,
          sortable: false,
          renderCell: ({ row, name, cell }: any) => {
            return (
              <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                {data?.local?.can_edit &&
                ["REJECTED", "DRAFTED", "DRAFT"].includes(row?.status) ? (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/location/${row.id}/edit`}
                  >
                    <div className="flex items-center gap-x-2">
                      <HiOutlinePencilAlt className="text-lg" />
                    </div>
                  </ButtonLink>
                ) : (
                  <></>
                )}

                <ButtonLink
                  className="bg-primary"
                  href={`/d/location/${row.id}/view`}
                >
                  <div className="flex items-center gap-x-2">
                    <IoEye className="text-lg" />
                  </div>
                </ButtonLink>
              </div>
            );
          },
        },
      ];
      break;
    default:
      return [
        {
          name: "document_number",
          header: () => <span>Document Number</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_date",
          header: () => <span>Document Date</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{shortDate(new Date(getValue(row, name)))}</>;
          },
        },
        {
          name: "organization_name",
          header: () => <span>Organization</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "organization_location_name",
          header: () => <span>Location</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "requestor_name",
          header: () => <span>Requestor</span>,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "status",
          header: () => <span>Status</span>,
          renderCell: ({ row, name, cell }: any) => {
            switch (getValue(row, name)) {
              case "IN_PROGRESS":
                return <>In Progress</>;
                break;

              default:
                return <>{getValue(row, name)}</>;
                break;
            }
          },
        },
        {
          name: "action",
          header: () => <span>Action</span>,
          sortable: false,
          renderCell: ({ row, name, cell }: any) => {
            return (
              <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                {["REJECTED", "DRAFTED", "DRAFT"].includes(row?.status) &&
                data?.local?.can_edit ? (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/location/${row.id}/edit`}
                  >
                    <div className="flex items-center gap-x-2">
                      <HiOutlinePencilAlt className="text-lg" />
                    </div>
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/location/${row.id}/view`}
                  >
                    <div className="flex items-center gap-x-2">
                      <IoEye className="text-lg" />
                    </div>
                  </ButtonLink>
                )}
              </div>
            );
          },
        },
      ];
      break;
  }
};
