"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
import { Popover } from "@/app/components/Popover/Popover";
import { TableList } from "@/app/components/tablelist/TableList";
import { ButtonBetter, ButtonContainer } from "@/app/components/ui/button";
import api from "@/lib/axios";
import { getValue } from "@/lib/getValue";
import { FiFilter } from "react-icons/fi";

function Page() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col py-4 pt-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          <span className="">Organization Structure</span>
        </h2>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
        <TableList
          name="Organization Structure"
          header={{
            sideLeft: (data: any) => {
              return <></>;
            },
            sideRight: (data: any) => {
              return (
                <>
                  <div className="flex flex-row">
                    <Popover
                      className="flex-1 rounded-md overflow-hidden"
                      content={
                        <div
                          className={cx(
                            "flex flex-row p-4",
                            css`
                              min-width: 350px;
                              overflow: auto;
                            `
                          )}
                        >
                          <Form
                            onSubmit={async () => {}}
                            onLoad={async () => {
                              return {
                                organization: 1,
                                job: 1,
                                name: "pak de",
                              };
                            }}
                            header={(fm: any) => {
                              return <></>;
                            }}
                            children={(fm: any) => {
                              return (
                                <>
                                  <div
                                    className={cx(
                                      "flex flex-col flex-wrap py-2"
                                    )}
                                  >
                                    <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-1 sm:mb-8">
                                      <div>
                                        <Field
                                          fm={fm}
                                          name={"organization"}
                                          label={"Organization"}
                                          type={"dropdown"}
                                          onLoad={async () => {
                                            console.log("MASUKL");
                                            return [
                                              {
                                                value: 1,
                                                label: "Organization",
                                              },
                                            ];
                                          }}
                                        />
                                      </div>
                                      <div>
                                        <Field
                                          fm={fm}
                                          name={"name"}
                                          label={"Name"}
                                          type={"text"}
                                        />
                                      </div>
                                      <div>
                                        <Field
                                          fm={fm}
                                          name={"parent"}
                                          label={"Parent"}
                                          type={"dropdown"}
                                          onLoad={async () => {
                                            return [
                                              {
                                                value: 1,
                                                label: "Job",
                                              },
                                            ];
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            }}
                            onFooter={(fm: any) => {
                              return (
                                <div className="flex-grow flex flex-col">
                                  <ButtonBetter variant={"default"}>
                                    Filter
                                  </ButtonBetter>
                                </div>
                              );
                            }}
                          />
                        </div>
                      }
                    >
                      <ButtonContainer className="py-0 flex flex-row gap-x-2">
                        <span className="text-md">Filter</span> <FiFilter />
                      </ButtonContainer>
                    </Popover>
                  </div>
                </>
              );
            },
          }}
          column={[
            {
              name: "organization.name",
              header: () => <span>Organization</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, "organization.name")}</>;
              },
            },
            {
              name: "name",
              header: () => <span>Name</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, "name")}</>;
              },
            },
            {
              name: "parent.name",
              header: () => <span>Parent</span>,
              renderCell: ({ row, name, cell }: any) => {
                return <>{getValue(row, "parent.name")}</>;
              },
            },
          ]}
          onLoad={async (param: any) => {
            const res: any = await api.get("https://julong-portal.avolut.com/api/organization-structures");
            const data: any[] = res.data.data.OrganizationStructures;
            return data || [];
          }}
          onInit={async (list: any) => {}}
        />
      </div>
    </div>
  );
}

export default Page;
