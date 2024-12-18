"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
import { FormBetter } from "@/app/components/form/FormBetter";
import { TableList } from "@/app/components/tablelist/TableList";
import { Tablist } from "@/app/components/tablist/Tablist";
import { Alert } from "@/app/components/ui/alert";
import { BreadcrumbBetterLink } from "@/app/components/ui/breadcrumb-link";
import { ButtonBetter, ButtonContainer } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import api from "@/lib/axios";
import { cloneFM } from "@/lib/cloneFm";
import { shortDate } from "@/lib/date";
import { getParams } from "@/lib/get-params";
import { get_user } from "@/lib/get_user";
import { useLocal } from "@/lib/use-local";
import { Breadcrumb, Button } from "flowbite-react";
import { GoInfo } from "react-icons/go";
import { IoMdSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function Page() {
  const id = getParams("id");
  return (
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col py-4 pt-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 ">
                <span className="">Manpower Request</span>
              </h2>
              <BreadcrumbBetterLink
                data={[
                  {
                    title: "List Manpower Request",
                    url: "/d/mpr-rekruitment",
                  },
                  {
                    title: "Detail",
                  },
                ]}
              />
            </div>
            <div className="flex flex-row space-x-2">
              <Alert
                type={"delete"}
                onClick={() => {
                  fm.submit();
                }}
              >
                <ButtonContainer className={"bg-primary"}>
                  <IoMdSave className="text-xl" />
                  Save
                </ButtonContainer>
              </Alert>
            </div>
          </div>
        );
      }}
      onSubmit={async (fm: any) => {
        const data = fm.data;
      }}
      onLoad={async () => {
        return {
          id,
          document_date: new Date(),
          requestor: get_user("id"),
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
              <div className="text-md font-semibold text-gray-900 py-4">
                Requirement Data
              </div>
              <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8 ">
                <div>
                  <Field
                    fm={fm}
                    name={"organization"}
                    label={"Organization"}
                    type={"dropdown"}
                    onLoad={async () => {
                      return [
                        {
                          value: 1,
                          label: "Organization",
                          data: {
                            id: 1,
                            label: "Organization",
                          },
                        },
                      ];
                    }}
                  />
                </div>
                <div></div>

                <div>
                  <Field
                    fm={fm}
                    name={"document_number"}
                    label={"Document Number"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"document_date"}
                    label={"Document Date"}
                    type={"date"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"mpp_reference_number"}
                    label={"MPP Reference Number"}
                    type={"dropdown"}
                    onLoad={async () => {
                      return [
                        {
                          value: 1,
                          label: "Organization",
                          data: {
                            id: 1,
                            label: "Organization",
                          },
                        },
                      ];
                    }}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"recruitment_type"}
                    label={"Recruitment Type"}
                    type={"dropdown"}
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
                <div>
                  <Field
                    fm={fm}
                    name={"for_organization"}
                    label={"For Organization"}
                    type={"dropdown"}
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

                <div>
                  <Field
                    fm={fm}
                    name={"emp_org_id"}
                    label={"Employment Org"}
                    type={"dropdown"}
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

                <div>
                  <Field
                    fm={fm}
                    name={"job_position"}
                    label={"Job Position"}
                    type={"dropdown"}
                    onLoad={() => {
                      return [
                        {
                          value: "1",
                          label: "Job 1",
                        },
                      ];
                    }}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    name={"divisi"}
                    label={"Div. / Sect."}
                    type={"dropdown"}
                    onLoad={async () => {
                      return [
                        {
                          value: 1,
                          label: "Organization",
                          data: {
                            id: 1,
                            label: "Organization",
                          },
                        },
                      ];
                    }}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"location"}
                    label={"Location"}
                    type={"dropdown"}
                    onLoad={async () => {
                      return [
                        {
                          value: 1,
                          label: "Organization",
                          data: {
                            id: 1,
                            label: "Organization",
                          },
                        },
                      ];
                    }}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    name={"job_level"}
                    label={"Job Level"}
                    type={"dropdown"}
                    onLoad={() => {
                      return [
                        {
                          value: "3",
                          label: "3",
                        },
                        {
                          value: "4",
                          label: "4",
                        },
                        {
                          value: "5",
                          label: "5",
                        },
                        {
                          value: "6",
                          label: "6",
                        },
                        {
                          value: "7",
                          label: "7",
                        },
                      ];
                    }}
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
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    name={"female_needs"}
                    label={"Female Needs"}
                    type={"money"}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    disabled={true}
                    name={"total"}
                    label={"Total Needs"}
                    type={"money"}
                  />
                </div>
                <div></div>
                <div>
                  <Field
                    fm={fm}
                    name={"request_category"}
                    label={"Request Category"}
                    type={"dropdown"}
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
                      console.log(item, fm);
                      if (
                        typeof fm?.fields?.request_type?.reload === "function"
                      )
                        fm.fields.request_type.reload();
                    }}
                  />
                </div>
                <div></div>
                {["penggantian", "penambahan"].includes(
                  fm.data?.request_category
                ) ? (
                  <div className="col-span-2">
                    <Field
                      hidden_label={true}
                      fm={fm}
                      name={"request_type"}
                      label={""}
                      type={"checkbox"}
                      className={"grid grid-cols-3"}
                      onLoad={() => {
                        if (fm.data?.request_category === "penambahan") {
                          return [
                            {
                              value: "posisi_baru",
                              label: "Posisi baru 新岗位",
                            },
                            {
                              value: "new_employe",
                              label: "New Employee 新员工",
                            },
                          ];
                        } else if (
                          fm.data?.request_category === "penggantian"
                        ) {
                          return [
                            {
                              value: "undur_diri",
                              label: "Undur diri 离职",
                            },
                            {
                              value: "diberhentikan",
                              label: "Diberhentikan 辞退",
                            },
                            {
                              value: "mutasi",
                              label: "Dimutasikan 调动",
                            },
                            {
                              value: "promosi",
                              label: "Promosi 升职",
                            },
                            {
                              value: "pensiun",
                              label: "Pensiun 退休",
                            },
                            {
                              value: "meninggal_dunia",
                              label: "Meninggal Dunia 去世",
                            },
                          ];
                        }
                        return [];
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}

                <div className="flex flex-col gap-y-1">
                  <div className="block mb-2 text-md font-medium text-gray-900 text-sm inline">
                    Age (Max/Min)
                  </div>
                  <div className="flex flex-row flex-grow gap-x-1">
                    <div className="flex-grow">
                      <Field
                        fm={fm}
                        name={"age_min"}
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
                        name={"age_max"}
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
                    type={"dropdown"}
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
                          value: "no rules",
                          label: "No Rules",
                        },
                      ];
                    }}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    name={"expected_start_date"}
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
                    type={"dropdown"}
                    onLoad={() => {
                      return [
                        {
                          value: "1",
                          label: "Doctoral / Professor",
                        },
                        {
                          value: "2",
                          label: "Master Degree",
                        },
                        {
                          value: "3",
                          label: "Bachelor",
                        },
                        {
                          value: "4",
                          label: "Diploma 1",
                        },
                        {
                          value: "5",
                          label: "Diploma 2",
                        },
                        {
                          value: "6",
                          label: "Diploma 3",
                        },
                        {
                          value: "7",
                          label: "Diploma 4",
                        },
                        {
                          value: "8",
                          label: "Elementary School",
                        },
                        {
                          value: "9",
                          label: "Senior High School",
                        },
                        {
                          value: "10",
                          label: "Junior High School",
                        },
                        {
                          value: "11",
                          label: "Unschooled",
                        },
                      ];
                    }}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"major"}
                    label={"Major"}
                    type={"text"}
                    disabled={true}
                  />
                </div>
                <div className="col-span-2">
                  <Field
                    fm={fm}
                    name={"work_experience"}
                    label={"Work Experience"}
                    type={"textarea"}
                  />
                </div>
                <div></div>
                <div className="col-span-2">
                  <Field
                    fm={fm}
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
                    name={"computer"}
                    label={"Computer"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"languages"}
                    label={"Languages"}
                    type={"text"}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"others"}
                    label={"Others"}
                    type={"text"}
                  />
                </div>
                <div className="col-span-2">
                  <Field
                    fm={fm}
                    name={"job_desc"}
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
                        name={"salary_range_min"}
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
                        name={"salary_range_max"}
                        type={"money"}
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
                    name={"direktur"}
                    label={"VP/GM/Direktur"}
                    disabled={true}
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"manager"}
                    label={"Manager/Dept.Head"}
                    type={"dropdown"}
                    onLoad={async () => {
                      return [
                        {
                          value: 1,
                          label: "Pak Budi",
                        },
                      ];
                    }}
                  />
                </div>
                <div>
                  <Field fm={fm} name={"ceo"} label={"CEO"} disabled={true} />
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
