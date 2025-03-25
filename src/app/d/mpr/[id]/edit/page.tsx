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
import { actionToast } from "@/lib/utils/action";
import api from "@/lib/utils/axios";
import { normalDate, shortDate } from "@/lib/utils/date";
import { events } from "@/lib/utils/event";
import { getParams } from "@/lib/utils/get-params";
import { get_user } from "@/lib/utils/get_user";
import { getAccess, userRoleMe } from "@/lib/utils/getAccess";
import { getNumber } from "@/lib/utils/getNumber";
import { getValue } from "@/lib/utils/getValue";
import { useLocal } from "@/lib/utils/use-local";
import get from "lodash.get";
import { X } from "lucide-react";
import { useEffect } from "react";
import { FiInfo } from "react-icons/fi";
import { IoMdSave } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

function Page() {
  const id = getParams("id");

  const local = useLocal({
    permission: [] as string[],
    staff: false as boolean,
    head: false as boolean,
    can_edit: false as boolean,
    can_delete: false as boolean,
    can_submit: false as boolean,
  });
  useEffect(() => {
    const run = async () => {
      const roles = await userRoleMe();
      const listPermision = ["save-mpr-staff", "save-mpr-dept-head"];
      const permision = listPermision.filter((e) => getAccess(e, roles));
      local.permission = permision;
      local.can_edit = getAccess("edit-mpr", roles);
      local.head = getAccess("submit-mpr-dept-head", roles);
      local.can_delete = getAccess("delete-mpr", roles);
      local.can_submit =
        getAccess("submit-mpr-staff", roles) ||
        getAccess("submit-mpr-dept-head", roles);
      local.render();
    };
    run();
  }, []);
  return (
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col  pt-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 ">
                <span className="">Manpower Request</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: "List Manpower Request",
                    url: "/d/mpr",
                  },
                  {
                    title: "Edit",
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
                              header: "Sender",
                              renderCell: ({ row, name, cell, tbl }: any) => {
                                return <>{getValue(row, name)}</>;
                              },
                            },
                            {
                              name: "status",
                              header: "Status",
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
                              header: "Datetime",
                              renderCell: ({ row, name, cell, tbl }: any) => {
                                return <>{shortDate(getValue(row, name))}</>;
                              },
                            },
                            {
                              name: "notes",
                              header: "Notes",
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
                              header: "Action",
                              filter: false,
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
              {["DRAFT", "REJECTED"].includes(fm.data?.status) &&
                local.can_edit && (
                  <Alert
                    type={"save"}
                    onClick={() => {
                      fm.data.status = "DRAFT";
                      fm.submit();
                    }}
                  >
                    <ButtonContainer className={"bg-primary"}>
                      <IoMdSave className="text-xl" />
                      Save
                    </ButtonContainer>
                  </Alert>
                )}
              {["DRAFT", "REJECTED"].includes(fm.data?.status) &&
                local.can_submit && (
                  <Alert
                    type={"save"}
                    msg={
                      "Are you sure you want to submit this data? Once submitted, the data will be locked and its status will be updated."
                    }
                    onClick={async () => {
                      const isYou =
                        fm.data.requestor_id === get_user("employee.id");
                      const isOnBudget = fm.data.mp_planning_header_id
                        ? true
                        : false;
                      fm.render();
                      if (isOnBudget) {
                        // on budget
                        if (isYou) {
                          if (!local.head) {
                            fm.data.status = "IN PROGRESS";
                          } else {
                            fm.data.status = "APPROVED";
                            fm.data.department_head = get_user("employee.id");
                          }
                        }
                      } else {
                        if (isYou) {
                          if (!local.head) {
                            fm.data.status = "IN PROGRESS";
                          } else {
                            fm.data.status = "NEED APPROVAL";
                            fm.data.department_head = get_user("employee.id");
                          }
                        }
                      }
                      fm.render();
                      await fm.submit();
                      navigate(`/d/mpr/${id}/view`);
                    }}
                  >
                    <ButtonContainer className={"bg-primary"}>
                      <IoMdSave className="text-xl" />
                      Submit
                    </ButtonContainer>
                  </Alert>
                )}

              {["DRAFTED", "DRAFT"].includes(fm.data?.status) &&
              local.can_delete ? (
                <>
                  <Alert
                    type={"save"}
                    onClick={async () => {
                      await actionToast({
                        task: async () => {
                          await api.delete(
                            `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-requests/` +
                              id
                          );
                        },
                        after: () => {
                          navigate("/d/mpr");
                        },
                        msg_load: "Delete ",
                        msg_error: "Delete failed ",
                        msg_succes: "Delete success ",
                      });
                    }}
                  >
                    <ButtonContainer variant="destructive">
                      <MdDelete className="text-xl" />
                      Delete
                    </ButtonContainer>
                  </Alert>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      }}
      onSubmit={async (fm: any) => {
        const data = fm.data;

        const prm: any = {
          id,
          document_number: data.document_number,
          document_date: normalDate(data.document_date),
          mpp_period_id: data.mpp_period_id,
          recruitment_type: data.recruitment_type,
          for_organization_id: data.for_organization_id,
          organization_id: data.for_organization_id,
          emp_organization_id: data.emp_organization_id,
          job_id: data.job_id,
          request_category_id: data.request_category_id,
          expected_date: normalDate(data.expected_date),
          male_needs: data.male_needs,
          female_needs: data.female_needs,
          minimum_age: data.minimum_age,
          job_level_id: data.job_level_id,
          maximum_age: data.maximum_age,
          marital_status: data.marital_status,
          minimum_education: data.minimum_education,
          required_qualification: data.required_qualification,
          experiences: data.experiences,
          major_ids: data.major_ids,
          notes: null,
          status: data.status,
          requestor_id: data.requestor_id,
          department_head: data.department_head,
          vp_gm_director: data.vp_gm_director,
          hrd_ho_unit: data.hrd_ho_unit,
          ceo: data.ceo,
          organization_location_id: data.for_organization_location_id,
          for_organization_location_id: data.for_organization_location_id,
          for_organization_structure_id: data.organization_structure_id,
          organization_structure_id: data.organization_structure_id,
          certificate: data.certificate, // Optional
          computer_skill: data.computer_skill, // Optional
          language_skill: data.language_skill, // Optional
          other_skill: data.other_skill, // Optional
          jobdesc: data.jobdesc,
          salary_min: data.salary_min,
          salary_max: data.salary_max,
          is_replacement: data.is_replacement === "penggantian" ? true : false,
          mp_request_type: data.mp_planning_header_id
            ? "ON_BUDGET"
            : "OFF_BUDGET",
          mp_planning_header_id: data.mp_planning_header_id,
        };
        if (prm.mp_request_type === "ON_BUDGET") {
          const category = [
            {
              value: "MT_Management Trainee",
              label: "Management Trainee",
            },
            {
              value: "PH_Professional Hire",
              label: "Professional Hire",
            },
            {
              value: "NS_Non Staff to Staff",
              label: "Non Staff to Staff",
            },
          ];
          if (
            prm.recruitment_type === "MT_Management Trainee" ||
            prm.recruitment_type === "PH_Professional Hire"
          ) {
            const total =
              getNumber(prm.female_needs) + getNumber(prm.male_needs);
            const remaining_balance = getNumber(data?.remaining_balance);
            if (total > remaining_balance) {
              fm.error = {
                ...fm.error,
                total_needs:
                  "Total needs must not exceed the remaining balance",
              };
              fm.render();
              throw new Error(
                "Failed the total needs exceed the remaining balance."
              );
            }
          }
        }
        await api.put(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-requests`,
          prm
        );
        fm.reload();
      }}
      showResize={false}
      header={(fm: any) => {
        return <></>;
      }}
      onLoad={async () => {
        const res: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-requests/` + id
        );
        const data = res.data.data;

        let categories = [] as any[];
        const ctg: any = await api.get(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/request-categories`
        );
        const category: any[] = ctg.data?.data;
        if (!Array.isArray(category)) {
          categories = [];
        } else {
          categories = category.map((e) => {
            return {
              value: e?.id,
              label: e?.name,
              data: e,
            };
          });
        }
        const lines = data?.mp_planning_header?.mp_planning_lines || [];
        const jobs = lines.find((e: any) => e?.job_id === data?.job_id);
        let enable_majors = false;
        if (data?.minimum_education)
          try {
            const res: any = await api.get(
              `${process.env.NEXT_PUBLIC_API_MPP}/api/majors/education-level?education_level=` +
                data?.minimum_education
            );
            if (Array.isArray(res?.data?.data) && res?.data?.data?.length) {
              enable_majors = true;
            }
          } catch (ex) {}

        let history: any = [];
        try {
          const hst = await api.get(
            `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-requests/approval-histories?mpr_header_id=${id}&status=REJECTED`
          );
          history = hst?.data?.data || [];
        } catch (ex) {}
        const result = {
          id,
          ...data,
          categories: categories,
          divisi: data?.for_organization_structure,
          job_level: data?.job_level_name,
          location: data?.for_organization_location_id,
          is_replacement: data?.is_replacement ? "penggantian" : "penambahan",
          total_needs: data?.male_needs + data.female_needs,
          remaining_balance:
            data?.recruitment_type === "MT_Management Trainee"
              ? getNumber(jobs?.remaining_balance_mt)
              : data.recruitment_type === "PH_Professional Hire"
              ? getNumber(jobs?.remaining_balance_ph)
              : 0,
          organization_structure_id: data?.for_organization_structure_id,
          mpp_name: data?.mpp_period.title,
          major_ids: data?.request_majors?.length
            ? data.request_majors.map((e: any) => e?.["Major"]?.["ID"])
            : [],
          enable_majors,
          history: history?.data?.data,
          for_organization: {
            id: data?.for_organization_id,
            name: data?.for_organization_name,
          },
          for_organization_structure: {
            id: data?.for_organization_structure_id,
            name: data?.for_organization_structure,
          },
          job: {
            id: data?.job_id,
            name: data?.job_name,
          },
          for_organization_location: {
            id: data?.for_organization_location_id,
            name: data?.for_organization_location,
          },
          emp_organization: {
            id: data?.emp_organization_id,
            name: data?.emp_organization_name,
          },
        };
        return result;
      }}
      children={(fm: any) => {
        return (
          <>
            <div className={cx("flex flex-col flex-wrap px-4 py-2")}>
              <div className="text-md font-semibold text-gray-900 py-4">
                Requirement Data
              </div>
              <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8 ">
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
                    required={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    label={"MPP Reference Number"}
                    target="mp_planning_header_id"
                    name={"mp_planning_header"}
                    onChange={(e: any) => {
                      const line = e?.data.mp_planning_lines;
                      fm.data["lines"] = line;
                      fm.render();
                      if (typeof fm?.fields?.job_id?.reload === "function") {
                        fm.fields.job_id.reload();
                      }
                    }}
                    type={"dropdown-async"}
                    autoRefresh={true}
                    pagination={false}
                    search="local"
                    onLabel={"document_number"}
                    onLoad={async () => {
                      try {
                        if (!fm.data?.mpp_period_id) {
                          return [];
                        }
                        const param = {
                          paging: 1,
                          take: 500,
                        };
                        const params = await events("onload-param", param);
                        const res: any = await api.get(
                          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/get-something?organization_id=${fm.data.for_organization_id}&status=COMPLETED&mpp_period_id=${fm.data?.mpp_period_id}`
                        );

                        const data: any[] = res.data.data;
                        if (!Array.isArray(data)) return [];
                        return data;
                      } catch (ex) {
                        return [];
                      }
                    }}
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
                <div>
                  <Field
                    fm={fm}
                    name={"recruitment_type"}
                    label={"Recruitment Type"}
                    type={"dropdown-async"}
                    pagination={false}
                    required={true}
                    search="local"
                    onLabel={(e) => {
                      const label = {
                        "MT_Management Trainee": "Management Trainee",
                        "PH_Professional Hire": "Professional Hire",
                        "NS_Non Staff to Staff": "Non Staff to Staff",
                      };
                      return get(label, e) ? get(label, e) : e?.label;
                    }}
                    onValue={"value"}
                    onChange={() => {
                      const lines = fm.data?.lines || [];
                      const jobs =
                        lines.find((x: any) => x?.job_id === fm.data?.job_id) ||
                        null;
                      const remaining_balance =
                        fm.data.recruitment_type === "MT_Management Trainee"
                          ? getNumber(jobs?.remaining_balance_mt)
                          : fm.data.recruitment_type === "PH_Professional Hire"
                          ? getNumber(jobs?.remaining_balance_ph)
                          : 0;
                      fm.data.remaining_balance = remaining_balance;
                      fm.render();
                    }}
                    onLoad={async () => {
                      return [
                        {
                          value: "MT_Management Trainee",
                          label: "Management Trainee",
                        },
                        {
                          value: "PH_Professional Hire",
                          label: "Professional Hire",
                        },
                        {
                          value: "NS_Non Staff to Staff",
                          label: "Non Staff to Staff",
                        },
                      ];
                    }}
                  />
                </div>
                <div></div>

                <div>
                  <Field
                    fm={fm}
                    target={"for_organization_id"}
                    name={"for_organization"}
                    label={"For Organization"}
                    required={true}
                    disabled={!fm.data?.recruitment_type}
                    type={"dropdown-async"}
                    // pagination={false}
                    // search="local"
                    onLabel={"name"}
                    onChange={(e: any) => {
                      const locations = e.data?.organization_locations;
                      fm.data["list_location"] = locations;
                      fm.render();
                    }}
                    onLoad={async (param) => {
                      const params = await events("onload-param", param);
                      const res: any = await api.get(
                        `${process.env.NEXT_PUBLIC_API_PORTAL}/api/organizations` +
                          params
                      );
                      const data: any[] = res?.data?.data?.organizations;
                      if (!Array.isArray(data)) return [];
                      return data;
                    }}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    target={"emp_organization_id"}
                    name={"emp_organization"}
                    required={true}
                    label={"Employment Org"}
                    type={"dropdown-async"}
                    // pagination={false}
                    // search="local"
                    onLabel={"name"}
                    disabled={!fm.data?.for_organization_id}
                    onLoad={async (param) => {
                      const params = await events("onload-param", param);
                      const res: any = await api.get(
                        `${process.env.NEXT_PUBLIC_API_PORTAL}/api/organizations` +
                          params
                      );
                      const data: any[] = res.data.data.organizations;
                      if (!Array.isArray(data)) return [];
                      return data;
                    }}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    target={"job_id"}
                    name={"job"}
                    required={true}
                    label={"Job Position"}
                    type={"dropdown-async"}
                    pagination={false}
                    search="local"
                    onLabel={"name"}
                    autoRefresh={true}
                    disabled={!fm.data?.for_organization_id}
                    onChange={(e: any) => {
                      const organization_structure_name =
                        e.data?.organization_structure_name;
                      fm.data["divisi"] = organization_structure_name;
                      fm.data["for_organization_id_structure_id"] =
                        e.data?.organization_structure_id;
                      fm.data["organization_structure_id"] =
                        e.data?.organization_structure_id;
                      fm.data["for_organization_id_structure_id"] =
                        e.data?.organization_structure_id;
                      fm.data["job_level"] = get(e, "data.job_level.name");
                      fm.data["job_level_id"] = e.data?.job_level?.id;
                      const lines = fm.data?.lines || [];
                      const jobs =
                        lines.find((x: any) => x?.job_id === fm.data?.job_id) ||
                        null;
                      const remaining_balance =
                        fm.data.recruitment_type === "MT_Management Trainee"
                          ? getNumber(jobs?.remaining_balance_mt)
                          : fm.data.recruitment_type === "PH_Professional Hire"
                          ? getNumber(jobs?.remaining_balance_ph)
                          : 0;
                      fm.data.remaining_balance = remaining_balance;
                      fm.render();
                    }}
                    onLoad={async (param) => {
                      if (!fm.data?.for_organization_id) return [];
                      const params = await events("onload-param", param);
                      try {
                        const res: any = fm.data?.mp_planning_header_id
                          ? await api.get(
                              `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings/jobs/${fm.data?.mp_planning_header_id}` +
                                params
                            )
                          : await api.get(
                              `${process.env.NEXT_PUBLIC_API_PORTAL}/api/jobs/organization/${fm.data?.for_organization_id}` +
                                params
                            );
                        const data: any[] = res.data.data;
                        if (!Array.isArray(data)) return [];
                        return data;
                      } catch (ex) {
                        return [];
                      }
                    }}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    name={"divisi"}
                    label={"Div. / Sect."}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    required={true}
                    fm={fm}
                    target={"for_organization_location_id"}
                    name={"for_organization_location"}
                    label={"Location"}
                    type={"dropdown-async"}
                    pagination={false}
                    search="local"
                    onLabel={"name"}
                    autoRefresh={true}
                    disabled={!fm.data?.for_organization_id}
                    onLoad={async (param) => {
                      if (!fm.data?.for_organization_id) return [];
                      const params = await events("onload-param", param);
                      const res: any = await api.get(
                        `${process.env.NEXT_PUBLIC_API_PORTAL}/api/organization-locations/organization/${fm.data?.for_organization_id}` +
                          params
                      );
                      const data: any[] = res.data.data;
                      if (!Array.isArray(data)) return [];
                      return data;
                    }}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    name={"job_level"}
                    label={"Job Level"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    disabled={true}
                    name={"remaining_balance"}
                    label={"Remaining Balance"}
                    type={"money"}
                  />
                </div>
                <div></div>
                <div>
                  <Field
                    fm={fm}
                    name={"male_needs"}
                    label={"Male Needs"}
                    type={"money"}
                    onChange={() => {
                      fm.data.total_needs =
                        getNumber(fm?.data?.male_needs) +
                        getNumber(fm?.data?.female_needs) +
                        getNumber(fm?.data?.any_gender);
                      fm.render();
                    }}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    name={"female_needs"}
                    label={"Female Needs"}
                    type={"money"}
                    onChange={() => {
                      fm.data.total_needs =
                        getNumber(fm?.data?.male_needs) +
                        getNumber(fm?.data?.female_needs) +
                        getNumber(fm?.data?.any_gender);
                      fm.render();
                    }}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"any_gender"}
                    label={"Any Needs"}
                    type={"money"}
                    onChange={() => {
                      fm.data.total_needs =
                        getNumber(fm?.data?.male_needs) +
                        getNumber(fm?.data?.female_needs) +
                        getNumber(fm?.data?.any_gender);
                      fm.render();
                    }}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    disabled={true}
                    name={"total_needs"}
                    label={"Total Needs"}
                    type={"money"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"is_replacement"}
                    label={"Request Category"}
                    type={"dropdown-async"}
                    pagination={false}
                    search="local"
                    onLabel={(e) => {
                      const label = {
                        penambahan: "Penambahan",
                        penggantian: "Penggantian",
                      };
                      return get(label, e) ? get(label, e) : e?.label;
                    }}
                    onValue={"value"}
                    onLoad={() => {
                      return [
                        {
                          value: "penambahan",
                          label: "Penambahan",
                        },
                        {
                          value: "penggantian",
                          label: "Penggantian",
                        },
                      ];
                    }}
                    onChange={(item: any) => {
                      if (
                        typeof fm?.fields?.request_category_id?.reload ===
                        "function"
                      )
                        fm.fields.request_category_id.reload();
                    }}
                  />
                </div>
                <div></div>
                {["penggantian", "penambahan"].includes(
                  fm.data?.is_replacement
                ) ? (
                  <div className="md:col-span-2">
                    <Field
                      hidden_label={true}
                      fm={fm}
                      name={"request_category_id"}
                      label={""}
                      type={"single-checkbox"}
                      className={"grid grid-cols-3"}
                      onLoad={() => {
                        const is_replacement =
                          fm.data?.is_replacement === "penggantian"
                            ? true
                            : false;
                        if (!fm.data?.is_replacement) return [];
                        return fm.data?.categories?.length
                          ? fm.data?.categories.filter(
                              (e: any) =>
                                e.data?.is_replacement === is_replacement
                            )
                          : [];
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}

                <div className="flex flex-col gap-y-1">
                  <div className="block mb-2 text-md font-medium text-gray-900 text-sm inline">
                    Age (Min/Max)
                  </div>
                  <div className="flex flex-row flex-grow gap-x-1">
                    <div className="flex-grow">
                      <Field
                        fm={fm}
                        required={true}
                        name={"minimum_age"}
                        type={"money"}
                        hidden_label={true}
                        placeholder="Min"
                      />
                    </div>
                    <div className="flex flex-row items-center justify-center px-1">
                      -
                    </div>
                    <div className="flex-grow">
                      <Field
                        fm={fm}
                        required={true}
                        name={"maximum_age"}
                        type={"money"}
                        hidden_label={true}
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Field
                    fm={fm}
                    name={"marital_status"}
                    label={"Marital Status"}
                    type={"dropdown-async"}
                    pagination={false}
                    required={true}
                    search="local"
                    onLabel={(e) => {
                      const label = {
                        single: "Single",
                        married: "Married",
                        any: "No Rules",
                      };
                      return get(label, e) ? get(label, e) : e?.label;
                    }}
                    onValue={"value"}
                    onLoad={() => {
                      return [
                        {
                          value: "single",
                          label: "Single",
                        },
                        {
                          value: "married",
                          label: "Married",
                        },
                        {
                          value: "any",
                          label: "No Rules",
                        },
                      ];
                    }}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    required={true}
                    name={"expected_date"}
                    label={"Expected Start Date"}
                    type={"date"}
                  />
                </div>
              </div>

              <div className="text-md font-semibold text-gray-900 py-4">
                Job Specification
              </div>

              <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8 ">
                <div>
                  <Field
                    fm={fm}
                    name={"minimum_education"}
                    label={"Minimum Education"}
                    type={"dropdown-async"}
                    required={true}
                    pagination={false}
                    search="local"
                    onLabel={(e) => {
                      const labelMap: Record<string, string> = {
                        "1 - Doctoral / Professor": "1 - Doctoral / Professor",
                        "2 - Master Degree": "2 - Master Degree",
                        "3 - Bachelor": "3 - Bachelor",
                        "4 - Diploma 1": "4 - Diploma 1",
                        "5 - Diploma 2": "5 - Diploma 2",
                        "6 - Diploma 3": "6 - Diploma 3",
                        "7 - Diploma 4": "7 - Diploma 4",
                        "8 - Elementary School": "8 - Elementary School",
                        "9 - Senior High School": "9 - Senior High School",
                        "10 - Junior High School": "10 - Junior High School",
                        "11 - Unschooled": "11 - Unschooled",
                      };

                      return labelMap[e] || e?.label || e;
                    }}
                    onChange={() => {
                      fm.data.major_ids = [];
                      const run = async () => {
                        if (fm.data?.minimum_education) {
                          fm.data.enable_majors = false;
                          try {
                            const res: any = await api.get(
                              `${process.env.NEXT_PUBLIC_API_MPP}/api/majors/education-level?education_level=` +
                                fm.data?.minimum_education
                            );
                            if (
                              Array.isArray(res?.data?.data) &&
                              res?.data?.data?.length
                            ) {
                              fm.data.enable_majors = true;
                            }
                          } catch (ex) {}
                        } else {
                          fm.data.enable_majors = false;
                        }
                        fm.render();
                      };
                      run();
                    }}
                    onValue={"value"}
                    onLoad={() => {
                      return [
                        {
                          label: "1 - Doctoral / Professor",
                          value: "1 - Doctoral / Professor",
                        },
                        {
                          label: "2 - Master Degree",
                          value: "2 - Master Degree",
                        },
                        { label: "3 - Bachelor", value: "3 - Bachelor" },
                        { label: "4 - Diploma 1", value: "4 - Diploma 1" },
                        { label: "5 - Diploma 2", value: "5 - Diploma 2" },
                        { label: "6 - Diploma 3", value: "6 - Diploma 3" },
                        { label: "7 - Diploma 4", value: "7 - Diploma 4" },
                        {
                          label: "8 - Elementary School",
                          value: "8 - Elementary School",
                        },
                        {
                          label: "9 - Senior High School",
                          value: "9 - Senior High School",
                        },
                        {
                          label: "10 - Junior High School",
                          value: "10 - Junior High School",
                        },
                        { label: "11 - Unschooled", value: "11 - Unschooled" },
                      ];
                    }}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"major_ids"}
                    label={"Major"}
                    type={"multi-dropdown"}
                    disabled={
                      !fm.data?.minimum_education || !fm.data?.enable_majors
                    }
                    onLoad={async () => {
                      if (!fm.data?.minimum_education) {
                        return [];
                      }
                      const res: any = await api.get(
                        `${process.env.NEXT_PUBLIC_API_MPP}/api/majors/education-level?education_level=` +
                          fm.data.minimum_education
                      );
                      const data: any[] = res.data.data;
                      if (!Array.isArray(data)) {
                        return [];
                      }
                      return data.map((e) => {
                        return {
                          value: e.id,
                          label: e.major,
                          data: e,
                        };
                      });
                    }}
                  />
                </div>
                <div className="md:col-span-2">
                  <Field
                    fm={fm}
                    required={true}
                    name={"experiences"}
                    label={"Work Experience"}
                    type={"textarea"}
                  />
                </div>
                <div></div>
                <div className="md:col-span-2">
                  <Field
                    fm={fm}
                    required={true}
                    name={"required_qualification"}
                    label={"Required Qualification"}
                    type={"textarea"}
                  />
                </div>
              </div>
              <div className="text-md font-semibold text-gray-900 py-4">
                Specific Skills
              </div>
              <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8 ">
                <div>
                  <Field
                    fm={fm}
                    name={"certificate"}
                    label={"Certificate"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"computer_skill"}
                    label={"Computer"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"language_skill"}
                    label={"Languages"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"other_skill"}
                    label={"Others"}
                    type={"text"}
                  />
                </div>
                <div className="md:col-span-2">
                  <Field
                    fm={fm}
                    required={true}
                    name={"jobdesc"}
                    label={"Job Desc"}
                    type={"textarea"}
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="block mb-2 text-md font-medium text-gray-900 text-sm inline">
                    Salary Range
                  </div>
                  <div className="flex flex-row flex-grow gap-x-1">
                    <div className="flex-grow">
                      <Field
                        fm={fm}
                        name={"salary_min"}
                        type={"text"}
                        required={true}
                        hidden_label={true}
                        placeholder="Min"
                      />
                    </div>
                    <div className="flex flex-row items-center justify-center px-1">
                      -
                    </div>
                    <div className="flex-grow">
                      <Field
                        fm={fm}
                        name={"salary_max"}
                        type={"text"}
                        required={true}
                        hidden_label={true}
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
                <div></div>
                <div>
                  <Field
                    fm={fm}
                    name={"requestor_name"}
                    label={"Requestor"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"department_head_name"}
                    label={"Manager/Dept.Head"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"vp_gm_director_name"}
                    label={"VP/GM/Direktur"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"ceo_name"}
                    label={"CEO"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"hrd_ho_unit_name"}
                    label={"HRD/HO"}
                    disabled={true}
                  />
                </div>
                <div></div>

                <div>
                  <Field
                    fm={fm}
                    name={"status"}
                    label={"Status"}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </>
        );
      }}
    />
  );
}

export default Page;
