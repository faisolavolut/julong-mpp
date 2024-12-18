"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
import { TableList } from "@/app/components/tablelist/TableList";
import { Tablist } from "@/app/components/tablist/Tablist";
import { ButtonBetter } from "@/app/components/ui/button";
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
    <div className="w-full flex flex-row flex-grow">
      <div className="flex flex-grow flex-col">
        <Form
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
            return (
              <>
                <div className="flex flex-row flex-grow px-4 py-4 border-b border-gray-300	items-center">
                  <div className="flex flex-col flex-grow">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                      <span className="capitalize">Form Manpower Planning</span>
                    </h1>
                    <div className="flex-grow flex flex-row">
                      <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item href="/d/mpp/monitoring-mpp-hrd">
                          Manpower Planning
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Detail</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-2"></div>
                </div>
              </>
            );
          }}
          children={(fm: any) => {
            return (
              <>
                <div className={cx("flex flex-col flex-wrap px-4 py-2")}>
                  <Card className="w-full">
                    <CardHeader className="p-4">
                      <CardTitle className="flex flex-row items-center gap-x-1">
                        <GoInfo />
                        Information Request
                      </CardTitle>
                      <CardDescription>
                        View Detailed Status of All Your Manpower Requests
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 pt-0">
                      <table className="text-sm">
                        <tbody>
                          <tr>
                            <td>Tipe Request</td>
                            <td>:</td>
                            <td>Request On Budget</td>
                          </tr>
                          <tr>
                            <td>Total Request</td>
                            <td>:</td>
                            <td>5</td>
                          </tr>
                          <tr>
                            <td>Total Left</td>
                            <td>:</td>
                            <td>2 from 7</td>
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                  <div className="text-md font-semibold text-gray-900 py-4">
                    Requirement Data
                  </div>
                  <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8 ">
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
                    <div></div>
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
                    <div>
                      <Field
                        fm={fm}
                        name={"emp_org_id"}
                        label={"Employment Org"}
                        type={"dropdown"}
                        disabled={true}
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
                            typeof fm?.fields?.request_type?.reload ===
                            "function"
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

                    <div>
                      <Field
                        fm={fm}
                        name={"age_min"}
                        label={"Age (Min/Max)"}
                        type={"money"}
                        disabled={true}
                      />
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
                        type={"money"}
                        disabled={true}
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
                    <div>
                      <Field
                        fm={fm}
                        name={"work_experience"}
                        label={"Work Experience"}
                        type={"text"}
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
                    <div>
                      <Field
                        fm={fm}
                        name={"salary_range"}
                        label={"Salary Range"}
                        type={"money"}
                      />
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
                      <Field
                        fm={fm}
                        name={"ceo"}
                        label={"CEO"}
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
      </div>
    </div>
  );
}

export default Page;
