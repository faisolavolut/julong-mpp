"use client";
import { Field } from "@/lib/components/form/Field";
import { FormBetter } from "@/lib/components/form/FormBetter";
import { TableList } from "@/lib/components/tablelist/TableList";
import { Alert } from "@/lib/components/ui/alert";
import {
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/lib/components/ui/alert-dialog";
import { BreadcrumbBetterLink } from "@/lib/components/ui/breadcrumb-link";
import { ButtonBetter, ButtonContainer } from "@/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import { PreviewImagePopup } from "@/lib/components/ui/previewImage";
import { statusMpp } from "@/constants/status-mpp";
import api from "@/lib/utils/axios";
import { cloneFM } from "@/lib/utils/cloneFm";
import { shortDate } from "@/lib/utils/date";
import { events } from "@/lib/utils/event";
import { getParams } from "@/lib/utils/get-params";
import { getValue } from "@/lib/utils/getValue";
import { useLocal } from "@/lib/utils/use-local";
import { X } from "lucide-react";
import { useEffect } from "react";
import { FiInfo } from "react-icons/fi";
import { IoEye } from "react-icons/io5";

function Page() {
  const id = getParams("id");

  const local = useLocal({
    can_approve: false,
    can_reject: false,
    can_process: false,
    can_submit: false,
    fm: null as any,
    can_approval: false,
  });
  useEffect(() => {}, []);
  return (
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col  pt-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 ">
                <span className="">Manpower Planning Overview</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: "List Manpower Planning Overview",
                    url: "/d/batch-hrd-unit",
                  },
                  {
                    title: "Detail",
                  },
                ]}
              />
            </div>
            <div className="flex flex-row space-x-2 items-center">
              {fm.data?.history?.length && (
                <Alert
                  className={"max-w-3xl"}
                  type={"save"}
                  content={
                    <>
                      <AlertDialogHeader className="flex flex-row items-center">
                        <AlertDialogTitle className="flex-grow">
                          History Notes
                        </AlertDialogTitle>

                        <AlertDialogCancel className="m-0 p-1 h-auto">
                          <X className="h-4 w-4" />
                        </AlertDialogCancel>
                      </AlertDialogHeader>

                      <div
                        className={cx(
                          "h-[300px] flex flex-col",
                          css`
                            .tbl-search {
                              display: none !important;
                            }
                            .head-tbl-list {
                              display: none;
                            }
                            .tbl-pagination {
                              display: none !important;
                            }
                          `
                        )}
                      >
                        <TableList
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
                              name: "approver_name",
                              header: () => <span>Sender</span>,
                              renderCell: ({ row, name, cell, tbl }: any) => {
                                return <>{getValue(row, name)}</>;
                              },
                            },
                            {
                              name: "status",
                              header: () => <span>Status</span>,
                              renderCell: ({ row, name, cell, tbl }: any) => {
                                return (
                                  <div className="uppercase">
                                    {getValue(row, name)}
                                  </div>
                                );
                              },
                            },
                            {
                              name: "created_at",
                              header: () => <span>Datetime</span>,
                              renderCell: ({ row, name, cell, tbl }: any) => {
                                return <>{shortDate(getValue(row, name))}</>;
                              },
                            },
                            {
                              name: "notes",
                              header: () => <span>Notes</span>,
                              renderCell: ({ row, name, cell, tbl }: any) => {
                                return (
                                  <div className="uppercase">
                                    {getValue(row, name)}
                                  </div>
                                );
                              },
                            },

                            {
                              name: "action",
                              header: () => <span>Action</span>,
                              sortable: false,
                              renderCell: ({ row, name, cell }: any) => {
                                if (!row?.attachments?.length) return <></>;
                                return (
                                  <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <div>
                                          <ButtonContainer variant={"outline"}>
                                            <div className="flex items-center gap-x-2">
                                              <IoEye className="text-lg" />
                                            </div>
                                          </ButtonContainer>
                                        </div>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-5xl  flex flex-col">
                                        <DialogHeader>
                                          <DialogTitle>List File</DialogTitle>
                                          <DialogDescription className="hidden"></DialogDescription>
                                        </DialogHeader>
                                        <div className="flex items-center flex-row space-x-2 flex-grow">
                                          <div
                                            className={cx(
                                              "h-[300px] flex flex-col flex-grow",
                                              css`
                                                .tbl-search {
                                                  display: none !important;
                                                }
                                                .head-tbl-list {
                                                  display: none;
                                                }
                                                .tbl-pagination {
                                                  display: none !important;
                                                }
                                              `
                                            )}
                                          >
                                            <TableList
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
                                                  name: "file_name",
                                                  header: () => (
                                                    <span>Filename</span>
                                                  ),
                                                  renderCell: ({
                                                    row,
                                                    name,
                                                    cell,
                                                    tbl,
                                                  }: any) => {
                                                    return (
                                                      <>{getValue(row, name)}</>
                                                    );
                                                  },
                                                },
                                                {
                                                  name: "action",
                                                  header: () => (
                                                    <span>Action</span>
                                                  ),
                                                  sortable: false,
                                                  renderCell: ({
                                                    row,
                                                    name,
                                                    cell,
                                                  }: any) => {
                                                    const type = getValue(
                                                      row,
                                                      "file_type"
                                                    )
                                                      ? getValue(
                                                          row,
                                                          "file_type"
                                                        ).startsWith("image/")
                                                      : false;

                                                    if (type)
                                                      return (
                                                        <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                                                          <PreviewImagePopup
                                                            url={getValue(
                                                              row,
                                                              "file_path"
                                                            )}
                                                            children={
                                                              <div>
                                                                <ButtonContainer
                                                                  variant={
                                                                    "outline"
                                                                  }
                                                                >
                                                                  <div className="flex items-center gap-x-2">
                                                                    <IoEye className="text-lg" />
                                                                  </div>
                                                                </ButtonContainer>
                                                              </div>
                                                            }
                                                          />
                                                        </div>
                                                      );

                                                    return (
                                                      <>
                                                        <div className="flex items-center flex-row gap-x-2 whitespace-nowrap">
                                                          <ButtonBetter
                                                            variant={"outline"}
                                                            onClick={() => {
                                                              window.open(
                                                                getValue(
                                                                  row,
                                                                  "file_path"
                                                                ),
                                                                "_blank"
                                                              );
                                                            }}
                                                          >
                                                            <div className="flex items-center gap-x-2">
                                                              <IoEye className="text-lg" />
                                                            </div>
                                                          </ButtonBetter>
                                                        </div>
                                                      </>
                                                    );
                                                  },
                                                },
                                              ]}
                                              onLoad={async (param: any) => {
                                                return row.attachments || [];
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                );
                              },
                            },
                          ]}
                          onLoad={async (param: any) => {
                            const params = await events("onload-param", param);
                            const res: any = await api.get(
                              `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/approval-histories/` +
                                id
                            );
                            const data: any[] = res.data.data;

                            if (!Array.isArray(data)) return [];
                            return data || [];
                          }}
                        />
                      </div>
                    </>
                  }
                >
                  <ButtonContainer variant="outline">
                    <FiInfo className="text-xl" />
                  </ButtonContainer>
                </Alert>
              )}
            </div>
          </div>
        );
      }}
      onSubmit={async (fm: any) => {}}
      onInit={(fm: any) => {
        local.fm = fm;
        local.render();
      }}
      onLoad={async () => {
        const res: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/` + id
        );

        const history: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/approval-histories/` +
            id
        );
        const data = res.data.data;
        console.log({
          id,
          ...data,
          mpp_name: data?.mpp_period?.title,
          budget_year_from: data?.mpp_period?.budget_start_date,
          budget_year_to: data?.mpp_period?.budget_end_date,
          document_line: data?.mp_planning_lines || [],
          history: history.data.data,
          location: data?.organization_location_name,
        });
        return {
          id,
          ...data,
          mpp_name: data?.mpp_period?.title,
          budget_year_from: data?.mpp_period?.budget_start_date,
          budget_year_to: data?.mpp_period?.budget_end_date,
          document_line: data?.mp_planning_lines || [],
          history: history.data.data,
          location: data?.organization_location_name,
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
                    label={"Periode Name"}
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
                    name={"requestor_name"}
                    label={"Recommend by"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"approver_ceo_name"}
                    label={"Approved by"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"status"}
                    label={"Status"}
                    disabled={true}
                    type={"dropdown"}
                    onLoad={() => {
                      return statusMpp;
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        );
      }}
      mode="view"
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
                                const existing = item.data.existing;
                                fm_row.data.existing = existing;
                                fm.render();

                                const getNumber = (data: any) => {
                                  return Number(data) || 0;
                                };
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
                              type={"money"}
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
                  ]}
                  onLoad={async (param: any) => {
                    return fm.data.document_line;
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
