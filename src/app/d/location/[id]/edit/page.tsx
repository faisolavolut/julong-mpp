"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
import { FormBetter } from "@/app/components/form/FormBetter";
import { TableList } from "@/app/components/tablelist/TableList";
import { Alert } from "@/app/components/ui/alert";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { BreadcrumbBetterLink } from "@/app/components/ui/breadcrumb-link";
import { ButtonBetter, ButtonContainer } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import api from "@/lib/axios";
import { cloneFM } from "@/lib/cloneFm";
import { normalDate } from "@/lib/date";
import { getParams } from "@/lib/get-params";
import { get_user } from "@/lib/get_user";
import { getAccess, userRoleMe } from "@/lib/getAccess";
import { getNumber } from "@/lib/getNumber";
import { useLocal } from "@/lib/use-local";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { FiInfo } from "react-icons/fi";
import { GoInfo } from "react-icons/go";
import { HiDocumentDownload, HiPlus } from "react-icons/hi";
import { IoMdSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function Page() {
  const local = useLocal({
    can_save: false,
    can_submit: false,
    can_edit: true,
  });
  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      local.can_save = getAccess("save-mpp", roles);
      local.can_submit = getAccess("submit-mpp", roles);
      local.can_edit = getAccess("edit-mpp", roles);
      local.render()
    };
    run();
  }, []);
  if(!local.can_edit){
    notFound();
  }
  const id = getParams("id");
  return (
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col py-4 pt-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                <span className="">Manpower Planning Overview</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: "List Manpower Planning Overview",
                    url: "/d/location",
                  },
                  {
                    title: "Edit",
                  },
                ]}
              />
            </div>
            <div className="flex flex-row space-x-2">
              <Alert
                type={"save"}
                content={
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        update your request from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Form
                      onSubmit={async (fm: any) => {
                        const data = fm.data;
                      }}
                      onLoad={async () => {
                        return {
                          id,
                        };
                      }}
                      showResize={false}
                      header={(fm: any) => {
                        return <></>;
                      }}
                      children={(fm: any) => {
                        return (
                          <>
                            <div className={cx("flex flex-col flex-wrap")}>
                              <div className="grid gap-4 mb-4 grid-cols-1">
                                <div>
                                  <Field
                                    fm={fm}
                                    name={"notes"}
                                    label={"Notes"}
                                    type={"textarea"}
                                  />
                                </div>
                                <div>
                                  <Field
                                    fm={fm}
                                    name={"attachment"}
                                    label={"Attachment"}
                                    type={"multi-upload"}
                                    onChange={(val: any) => {
                                      console.log(
                                        fm.fields?.tbl,
                                        typeof fm.fields?.tbl
                                      );
                                      if (typeof fm.fields?.tbl === "object") {
                                        console.log(
                                          "attachment",
                                          fm.data?.attachment
                                        );
                                        fm.fields.tbl.reload();
                                      }
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
                          <div
                            className={cx(css`
                              .tbl-search {
                                display: none !important;
                              }
                              .tbl-pagination {
                                display: none !important;
                              }
                            `)}
                          >
                            <div className="w-full flex flex-row">
                              <div className="flex flex-grow flex-col h-[150px]">
                                <TableList
                                  onInit={(tbl: any) => {
                                    fm.fields["tbl"] = tbl;
                                    fm.render();
                                  }}
                                  disabledHeader={true}
                                  disabledHeadTable={true}
                                  disabledPagination={true}
                                  header={{
                                    sideLeft: (tbl: any) => {
                                      return <></>;
                                    },
                                    sideRight: (tbl: any) => {
                                      return <></>;
                                    },
                                  }}
                                  column={[
                                    {
                                      name: "level",
                                      header: () => <span>Job Level</span>,
                                      renderCell: ({
                                        row,
                                        name,
                                        cell,
                                        tbl,
                                      }: any) => {
                                        return (
                                          <div className="flex flex-row items-center">
                                            <div className="flex flex-row flex-grow">
                                              123
                                            </div>

                                            <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                                              <ButtonBetter
                                                className="bg-red-500"
                                                onClick={() => {
                                                  tbl.removeRow(row);
                                                }}
                                              >
                                                <div className="flex items-center">
                                                  <MdDelete />
                                                </div>
                                              </ButtonBetter>
                                            </div>
                                          </div>
                                        );
                                      },
                                    },
                                  ]}
                                  onLoad={(param: any) => {
                                    console.log("load", fm.data?.attachment);
                                    return fm.data?.attachment || [];
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className={"bg-red-500 text-white"}
                        onClick={() => {
                          fm.submit();
                        }}
                      >
                        Reject
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </>
                }
              >
                <ButtonContainer variant="outline">
                  <FiInfo className="text-xl" />
                </ButtonContainer>
              </Alert>
              <Alert
                type={"save"}
                onClick={() => {
                  fm.data.status = "DRAFTED";
                  fm.submit();
                }}
              >
                <ButtonContainer className={"bg-primary"}>
                  <IoMdSave className="text-xl" />
                  Save
                </ButtonContainer>
              </Alert>
              {local.can_submit ? (
                <Alert
                  type={"save"}
                  onClick={() => {
                    fm.data.level = "Level HRD";
                    fm.data.status = "IN_PROGRESS";
                    fm.submit();
                  }}
                >
                  <ButtonContainer className={"bg-primary"}>
                    <IoMdSave className="text-xl" />
                    Submit
                  </ButtonContainer>
                </Alert>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      }}
      onSubmit={async (fm: any) => {
        const data = fm.data;
        const param: any = {
          id: data.id,
          mpp_period_id: data.mpp_period_id,
          organization_id: data.organization_id,
          emp_organization_id: data.emp_organization_id,
          job_id: data.job_id,
          document_number: data.document_number,
          document_date: normalDate(data.document_date),
          notes: data.notes,
          total_recruit: data.total_recruit,
          total_promote: data.total_promote,
          status: data.status,
          recommended_by: null,
          approved_by: null,
          requestor_id: data.requestor_id,
          organization_location_id: "b61cd44b-e66a-48e3-9bc1-7a5a31b6932d",
        };
        const document_line = data.document_line.map((e: any) => {
          return {
            ...e,
            organization_location_id: "b61cd44b-e66a-48e3-9bc1-7a5a31b6932d",
          };
        });
        const formData = new FormData();

        // Menambahkan data param ke FormData
        formData.append("payload", JSON.stringify(param));

        const res: any = await api.put(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        await api.post(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/lines/batch/store`,
          {
            mp_planning_header_id: data.id,
            mp_planning_lines: document_line,
          }
        );
        if (data.status === "IN_PROGRESS") {
          const data_status = {
            id: id,
            approver_id: get_user("employee.id"),
            approved_by: get_user("employee.name"),
            level: data.level,
            status: "IN_PROGRESS",
            notes: data.notes || null,
          };
          const attachments = data.attachment.length
            ? data.attachment.map((e: any) => e.data)
            : [];
          const formData = new FormData();
          formData.append("payload", JSON.stringify(data_status));
          const res: any = await api.put(
            `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/update-status`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
      }}
      onLoad={async () => {
        const res: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/` + id
        );
        const turn_over = await api.get(
          `${process.env.NEXT_PUBLIC_API_PORTAL}/api/employees/turnover?start_date=2024-06-01&end_date=2025-07-01`
        );
        const data = res.data.data;
        console.log({ turn_over });
        return {
          id,
          ...data,
          plafon: data?.job_plafon?.plafon,
          turn_over: getNumber(turn_over?.data?.data?.total),
          mpp_name: data?.mpp_period?.title,
          budget_year_from: data?.mpp_period?.budget_start_date,
          budget_year_to: data?.mpp_period?.budget_end_date,
          document_line: data?.mp_planning_lines || [],
        };
      }}
      showResize={false}
      header={(fm: any) => {
        return <></>;
      }}
      children={(fm: any) => {
        return (
          <>
            <div className={cx("flex flex-col flex-wrap px-4 py-2")}>
              <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
                <div>
                  <Field
                    fm={fm}
                    name={"organization_name"}
                    label={"Organization"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"location"}
                    label={"Location"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"document_number"}
                    label={"Document Number"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"document_date"}
                    label={"Document Date"}
                    type={"date"}
                    disabled={false}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"mpp_name"}
                    label={"MPP Name"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div></div>
                <div>
                  <Field
                    fm={fm}
                    name={"budget_year_from"}
                    label={"Budget year From"}
                    type={"date"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"budget_year_to"}
                    label={"Budget year To"}
                    type={"date"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"requestor_name"}
                    label={"Requestor"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"job_name"}
                    label={"Job"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div className="col-span-2">
                  <Field
                    fm={fm}
                    name={"notes"}
                    label={"Notes"}
                    type={"textarea"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"total_recruit"}
                    label={"Total Recruit"}
                    type={"money"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"total_promote"}
                    label={"Total Promote"}
                    type={"money"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"recommend_by"}
                    label={"Recommend by"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"approved_by"}
                    label={"Approved by"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"status"}
                    label={"Status"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </>
        );
      }}
      onFooter={(fm: any) => {
        if (!fm?.data?.id) return <></>;
        return (
          <div
            className={cx(css`
              .tbl-search {
                display: none !important;
              }
              .tbl-pagination {
                display: none !important;
              }
            `)}
          >
            <div className="w-full flex flex-row">
              <div className="flex flex-grow flex-col h-[350px]">
                <TableList
                  disabledPagination={true}
                  header={{
                    sideLeft: (tbl: any) => {
                      return (
                        <>
                          <div className="flex flex-row flex-grow space-x-2">
                            <ButtonBetter
                              className="bg-primary"
                              onClick={() => {
                                tbl.addRow({});
                                tbl.render();
                                fm.render();
                                const recruit = fm.data.document_line?.length
                                  ? fm.data.document_line
                                      .map(
                                        (e: any) =>
                                          getNumber(e.recruit_ph) +
                                          getNumber(e.recruit_mt)
                                      )
                                      .reduce((a: any, b: any) => a + b, 0)
                                  : 0;

                                const totalPromotion = fm.data.document_line
                                  ?.length
                                  ? fm.data.document_line
                                      .map((e: any) => getNumber(e.promotion))
                                      .reduce((a: any, b: any) => a + b, 0)
                                  : 0;
                                fm.data.total_promote = totalPromotion;
                                fm.data.total_recruit = recruit;
                                fm.render();
                              }}
                            >
                              <div className="flex items-center gap-x-0.5">
                                <HiPlus className="text-xl" />
                                <span className="capitalize">Add New</span>
                              </div>
                            </ButtonBetter>
                          </div>
                        </>
                      );
                    },
                    sideRight: (tbl: any) => {
                      return <></>;
                    },
                  }}
                  column={[
                    {
                      name: "level",
                      header: () => <span>Job Level</span>,
                      renderCell: ({ row, name, cell, tbl }: any) => {
                        const fm_row = cloneFM(fm, row);
                        return (
                          <>
                            <Field
                              fm={cloneFM(fm, row)}
                              hidden_label={true}
                              name={"job_level_id"}
                              label={"Organization"}
                              type={"dropdown"}
                              onChange={() => {
                                // console.log({ data: fm_row.data });
                                // tbl.renderRow(fm_row.data);
                              }}
                              onLoad={async () => {
                                const res: any = await api.get(
                                  `${process.env.NEXT_PUBLIC_API_PORTAL}/api/job-levels/organization/${fm.data.organization_id}`
                                );
                                const data: any[] = res.data.data;
                                if (!Array.isArray(data)) return [];
                                const result = data.map((e) => {
                                  return {
                                    value: e.id,
                                    label: `${e.level} - ${e.name}`,
                                  };
                                });
                                return result || [];
                              }}
                            />
                          </>
                        );
                      },
                    },
                    {
                      name: "job",
                      header: () => <span>Job</span>,
                      width: 150,
                      renderCell: ({ row, name, cell }: any) => {
                        const fm_row = cloneFM(fm, row);
                        return (
                          <>
                            <Field
                              fm={cloneFM(fm, row)}
                              hidden_label={true}
                              disabled={!fm_row.data?.job_level_id}
                              name={"job_id"}
                              label={"Organization"}
                              type={"dropdown"}
                              onChange={(item: any) => {
                                console.log({ item });
                                const existing = item.data.existing;
                                fm_row.data.existing = existing;
                                fm.render();
                                const suggested_recruit =
                                  getNumber(fm.data.plafon) +
                                  getNumber(existing) +
                                  getNumber(fm.data.turn_over) +
                                  getNumber(fm_row.data.promotion);
                                fm_row.data.suggested_recruit =
                                  suggested_recruit;
                                const total =
                                  getNumber(fm_row.data.existing) +
                                  getNumber(fm_row.data.recruit_ph) +
                                  getNumber(fm_row.data.recruit_mt) -
                                  getNumber(fm_row.data.promotion);
                                fm_row.data.total = total;
                                fm.render();
                              }}
                              onLoad={async () => {
                                if (!row.job_level_id) return [];
                                const res: any = await api.get(
                                  `${process.env.NEXT_PUBLIC_API_PORTAL}/api/jobs/job-level/${row.job_level_id}`
                                );
                                const data: any[] = res.data.data;
                                if (!Array.isArray(data)) return [];
                                const result = data.map((e) => {
                                  return {
                                    value: e.id,
                                    label: `${e.name}`,
                                    data: e,
                                  };
                                });
                                return result || [];
                              }}
                            />
                          </>
                        );
                      },
                    },
                    {
                      name: "existing",
                      header: () => <span>Existing</span>,
                      width: 50,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <>
                            <Field
                              fm={cloneFM(fm, row)}
                              name={"existing"}
                              label={"Approved by"}
                              type={"text"}
                              disabled={true}
                              hidden_label={true}
                            />
                          </>
                        );
                      },
                    },
                    {
                      name: "suggested_recruit",
                      header: () => <span>Suggested Recruit</span>,
                      width: 50,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <>
                            <Field
                              fm={cloneFM(fm, row)}
                              name={"suggested_recruit"}
                              label={"Approved by"}
                              type={"money"}
                              hidden_label={true}
                              disabled={true}
                            />
                          </>
                        );
                      },
                    },
                    {
                      name: "recruit_ph",
                      header: () => <span>Recruit PH</span>,
                      width: 50,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <>
                            <Field
                              fm={cloneFM(fm, row)}
                              name={"recruit_ph"}
                              type={"money"}
                              hidden_label={true}
                              onChange={() => {
                                const fm_row = cloneFM(fm, row);
                                const getNumber = (data: any) => {
                                  return Number(data) || 0;
                                };
                                const total =
                                  getNumber(fm_row.data.existing) +
                                  getNumber(fm_row.data.recruit_ph) +
                                  getNumber(fm_row.data.recruit_mt) -
                                  getNumber(fm_row.data.promotion);

                                const recruit = fm.data.document_line
                                  .map(
                                    (e: any) =>
                                      getNumber(e.recruit_ph) +
                                      getNumber(e.recruit_mt)
                                  )
                                  .reduce((a: any, b: any) => a + b, 0);
                                fm.data.total_recruit = recruit;
                                fm_row.data.total = total;
                                fm.render();
                              }}
                            />
                          </>
                        );
                      },
                    },
                    {
                      name: "recruit_mt",
                      header: () => <span>Recruit MT</span>,
                      width: 50,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <>
                            <Field
                              fm={cloneFM(fm, row)}
                              name={"recruit_mt"}
                              type={"money"}
                              hidden_label={true}
                              onChange={() => {
                                const fm_row = cloneFM(fm, row);
                                const getNumber = (data: any) => {
                                  return Number(data) || 0;
                                };
                                const total =
                                  getNumber(fm_row.data.existing) +
                                  getNumber(fm_row.data.recruit_ph) +
                                  getNumber(fm_row.data.recruit_mt) -
                                  getNumber(fm_row.data.promotion);

                                const recruit = fm.data.document_line
                                  .map(
                                    (e: any) =>
                                      getNumber(e.recruit_ph) +
                                      getNumber(e.recruit_mt)
                                  )
                                  .reduce((a: any, b: any) => a + b, 0);
                                fm.data.total_recruit = recruit;
                                fm_row.data.total = total;
                                fm.render();
                              }}
                            />
                          </>
                        );
                      },
                    },
                    {
                      name: "promotion",
                      header: () => <span>Promotion</span>,
                      width: 50,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <>
                            <Field
                              fm={cloneFM(fm, row)}
                              name={"promotion"}
                              label={"Approved by"}
                              type={"money"}
                              hidden_label={true}
                              onChange={() => {
                                const fm_row = cloneFM(fm, row);
                                const getNumber = (data: any) => {
                                  return Number(data) || 0;
                                };
                                const total =
                                  getNumber(fm_row.data.existing) +
                                  getNumber(fm_row.data.recruit_ph) +
                                  getNumber(fm_row.data.recruit_mt) -
                                  getNumber(fm_row.data.promotion);
                                const totalPromotion = fm.data.document_line
                                  .map((e: any) => getNumber(e.promotion))
                                  .reduce((a: any, b: any) => a + b, 0);
                                fm.data.total_promote = totalPromotion;
                                fm_row.data.total = total;
                                fm.render();

                                const suggested_recruit =
                                  getNumber(fm.data.plafon) +
                                  getNumber(fm_row.data.existing) +
                                  getNumber(fm.data.turn_over) +
                                  getNumber(fm_row.data.promotion);
                                fm_row.data.suggested_recruit =
                                  suggested_recruit;
                                fm.render();
                              }}
                            />
                          </>
                        );
                      },
                    },
                    {
                      name: "total",
                      header: () => <span>Total</span>,
                      width: 50,
                      renderCell: ({ row, name, cell }: any) => {
                        return (
                          <>
                            <Field
                              fm={cloneFM(fm, row)}
                              name={"total"}
                              label={"Approved by"}
                              type={"money"}
                              disabled={true}
                              hidden_label={true}
                            />
                          </>
                        );
                      },
                    },

                    {
                      name: "action",
                      header: () => <span>Action</span>,
                      sortable: false,
                      renderCell: ({ row, name, cell, tbl }: any) => {
                        return (
                          <div className="flex items-center gap-x-0.5 whitespace-nowrap">
                            <ButtonBetter
                              className="bg-red-500"
                              onClick={() => {
                                tbl.removeRow(row);
                                fm.data.document_line =
                                  fm.data.document_line.filter(
                                    (e) => e !== row
                                  );
                                fm.render();
                                console.log(fm.data.document_line, row);
                                const recruit = fm.data.document_line?.length
                                  ? fm.data.document_line
                                      .map(
                                        (e: any) =>
                                          getNumber(e.recruit_ph) +
                                          getNumber(e.recruit_mt)
                                      )
                                      .reduce((a: any, b: any) => a + b, 0)
                                  : 0;

                                const totalPromotion = fm.data.document_line
                                  ?.length
                                  ? fm.data.document_line
                                      .map((e: any) => getNumber(e.promotion))
                                      .reduce((a: any, b: any) => a + b, 0)
                                  : 0;
                                fm.data.total_promote = totalPromotion;
                                fm.data.total_recruit = recruit;
                                fm.render();
                              }}
                            >
                              <div className="flex items-center">
                                <MdDelete />
                              </div>
                            </ButtonBetter>
                          </div>
                        );
                      },
                    },
                  ]}
                  onLoad={async (param: any) => {
                    return fm.data.document_line;
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
          </div>
        );
      }}
    />
  );
}

export default Page;
