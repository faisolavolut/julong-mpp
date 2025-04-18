import { ButtonLink } from "@/lib/components/ui/button-link";
import { shortDate } from "@/lib/utils/date";
import { getAccess } from "@/lib/utils/getAccess";
import { getValue } from "@/lib/utils/getValue";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import { getStatusLabel } from "./status-mpp";
export const rolesMpr = (roles: any[]) => {
  const data = [
    {
      name: "superadmin",
      permision: [
        "read-mpr",
        "read-mpr-dept-head",
        "read-mpr-vp",
        "read-mpr-ho",
      ],
    },
    {
      name: "Staff",
      permision: ["read-mpr"],
    },
    {
      name: "Departmen Head",
      permision: ["read-mpr-dept-head"],
    },
    {
      name: "Vice President",
      permision: ["read-mpr-vp"],
    },
    {
      name: "HO",
      permision: ["read-mpr-ho"],
    },
  ];
  const yourRole =
    data.find((e) => {
      if (e.name === "superadmin") {
        // Cek semua izin (and)
        return e.permision.every((perm) => getAccess(perm, roles));
      } else {
        // Cek salah satu izin (or)
        return e.permision.some((perm) => getAccess(perm, roles));
      }
    })?.name || null;
  return yourRole;
};
export const columnMpr = (data: any) => {
  const access = rolesMpr(
    typeof data?.local?.roles === "object" ? [data?.local?.roles] : []
  );
  switch (access) {
    case "Staff":
      return [
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
            return <>{shortDate(getValue(row, name))}</>;
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
                {["DRAFT", "REJECTED"].includes(getValue(row, "status")) &&
                data?.local?.can_edit ? (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/mpr/${row.id}/edit`}
                  >
                    <div className="flex items-center gap-x-2">
                      <HiOutlinePencilAlt className="text-lg" />
                    </div>
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/mpr/${row.id}/view`}
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
    case "Departmen Head":
      return [
        {
          name: "organization_location_name",
          header: "Location",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_number",
          header: "Document Number",
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
                {["DRAFT", "REJECTED"].includes(getValue(row, "status")) &&
                data?.local?.can_edit ? (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/mpr/${row.id}/edit`}
                  >
                    <div className="flex items-center gap-x-2">
                      <HiOutlinePencilAlt className="text-lg" />
                    </div>
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/mpr/${row.id}/view`}
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
    case "Vice President":
      return [
        {
          name: "organization_location_name",
          header: "Location",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "for_organization_structure",
          header: "Department",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_number",
          header: "Document Number",
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
                  href={`/d/mpr/${row.id}/view`}
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
    case "HO":
      return [
        {
          name: "organization_name",
          header: "Organization",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "organization_location_name",
          header: "Location",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_number",
          header: "Document Number",
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
                  href={`/d/mpr/${row.id}/view`}
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
          header: "Document Number",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "document_date",
          header: "Document Date",
          renderCell: ({ row, name, cell }: any) => {
            return <>{shortDate(getValue(row, name))}</>;
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
                {["DRAFT", "REJECTED"].includes(getValue(row, "status")) &&
                data?.local?.can_edit ? (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/mpr/${row.id}/edit`}
                  >
                    <div className="flex items-center gap-x-2">
                      <HiOutlinePencilAlt className="text-lg" />
                    </div>
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    className="bg-primary"
                    href={`/d/mpr/${row.id}/view`}
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
