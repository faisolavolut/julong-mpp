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
import { normalDate } from "@/lib/date";
import { events } from "@/lib/event";
import { getParams } from "@/lib/get-params";
import { get_user } from "@/lib/get_user";
import { getNumber } from "@/lib/getNumber";
import { GoInfo } from "react-icons/go";
import { HiDocumentDownload, HiPlus } from "react-icons/hi";
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
                    url: "/d/mpr-hrd",
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
              <Alert
                type={"delete"}
                onClick={async () => {
                  fm.data.status = fm.data.mp_planning_header_id
                    ? "IN PROGRESS"
                    : "NEED APPROVAL";
                  fm.render();
                  if (!fm.data.requestor_name)
                    fm.data.requestor_id = get_user("employee.id");
                  if (fm.data.status === "NEED APPROVAL")
                    fm.data.department_head = get_user("employee.id");
                  fm.render();
                  await fm.submit();
                  if (fm.data.status === "IN PROGRESS") {
                    navigate(`/d/mpr-hrd/${id}/view`);
                  }
                }}
              >
                <ButtonContainer className={"bg-primary"}>
                  <IoMdSave className="text-xl" />
                  Submit
                </ButtonContainer>
              </Alert>
              <Alert
                type={"delete"}
                onClick={async () => {
                  fm.data.department_head = get_user("employee.id");
                  fm.data.status = "APPROVED";
                  fm.render();
                  await fm.submit();
                  navigate(`/d/mpr-hrd/${id}/view`);
                }}
              >
                <ButtonContainer className={"bg-primary"}>
                  <IoMdSave className="text-xl" />
                  Submit & Approved
                </ButtonContainer>
              </Alert>
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
          organization_location_id: data.organization_location_id,
          for_organization_location_id: data.organization_location_id,
          for_organization_structure_id: data.organization_structure_id,
          organization_structure_id: data.organization_structure_id,
          certificate: data.certificate, // Optional
          computer_skill: data.computer_skill, // Optional
          language_skill: data.language_skill, // Optional
          other_skill: data.other_skill, // Optional
          jobdesc: data.jobdesc,
          salary_min: data.salary_min,
          salary_max: data.salary_max,
          is_replacement: data.is_replacement === "penambahan" ? true : false,
          mp_request_type: data.mp_planning_header_id
            ? "ON_BUDGET"
            : "OFF_BUDGET",
          mp_planning_header_id: data.mp_planning_header_id,
        };
        
        await api.put(
          `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-requests`,
          prm
        );
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
        if (!Array.isArray(category)) categories = [];
        categories = category.map((e) => {
          return {
            value: e.id,
            label: e.name,
            data: e,
          };
        });
        const lines = data.mp_planning_header.mp_planning_lines || [];
        const jobs = lines.find((e: any) => e.job_id === data.job_id);

        return {
          id,
          ...data,
          categories: categories,
          divisi: data.for_organization_structure,
          job_level: data.job_level_name,
          location: data.for_organization_location_id,
          is_replacement: data.is_replacement ? "penggantian" : "penambahan",
          total_needs: data.male_needs + data.female_needs,
          remaining_balance:
            data.recruitment_type === "MT_Management Trainee"
              ? getNumber(jobs?.remaining_balance_mt)
              : data.recruitment_type === "PH_Professional Hire"
              ? getNumber(jobs?.remaining_balance_ph)
              : 0,
          organization_structure_id: data.for_organization_structure_id,
          mpp_name: data.mpp_period.title,
          major_ids: data.request_majors.map((e: any) => e?.["Major"]?.["ID"]),
        };
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
                  />
                </div>
                <div>
                  <Field
                    fm={fm}
                    name={"mp_planning_header_id"}
                    label={"MPP Reference Number"}
                    type={"dropdown"}
                    onChange={(e: any) => {
                      
                      fm.data.mpp_name = e?.data.mpp_period?.title;
                      fm.data.mpp_period_id = e?.data.mpp_period?.id;
                      const line = e?.data.mp_planning_lines;
                      fm.data["lines"] = line;
                      fm.render();
                    }}
                    onLoad={async () => {
                      const param = {
                        paging: 1,
                        take: 500,
                      };
                      const params = await events("onload-param", param);
                      const res: any = await api.get(
                        `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-plannings` +
                          params
                      );

                      const data: any[] = res.data.data.mp_planning_headers;
                      if (!Array.isArray(data)) return [];
                      return data.map((e) => {
                        return {
                          value: e.id,
                          label: e.document_number,
                          data: e,
                        };
                      });
                    }}
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
                <div>
                  <Field
                    fm={fm}
                    name={"recruitment_type"}
                    label={"Recruitment Type"}
                    type={"dropdown"}
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
                    name={"for_organization_id"}
                    label={"For Organization"}
                    type={"dropdown"}
                    disabled={!fm.data?.recruitment_type}
                    onChange={(e: any) => {
                      const locations = e.data?.organization_locations;
                      fm.data["list_location"] = locations;
                      fm.render();
                    }}
                    onLoad={async () => {
                      const param = {
                        paging: 1,
                        take: 500,
                      };
                      const params = await events("onload-param", param);
                      const res: any = await api.get(
                        "https://julong-portal.avolut.com/api/organizations" +
                          params
                      );
                      const data: any[] = res.data.data.organizations;
                      if (!Array.isArray(data)) return [];
                      return data.map((e) => {
                        return {
                          value: e.id,
                          label: e.name,
                          data: e,
                        };
                      });
                    }}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    name={"emp_organization_id"}
                    label={"Employment Org"}
                    type={"dropdown"}
                    disabled={!fm.data?.for_organization_id}
                    onLoad={async () => {
                      const param = {
                        paging: 1,
                        take: 500,
                      };
                      const params = await events("onload-param", param);
                      const res: any = await api.get(
                        "https://julong-portal.avolut.com/api/organizations" +
                          params
                      );
                      const data: any[] = res.data.data.organizations;
                      if (!Array.isArray(data)) return [];
                      return data.map((e) => {
                        return {
                          value: e.id,
                          label: e.name,
                          data: e,
                        };
                      });
                    }}
                  />
                </div>

                <div>
                  <Field
                    fm={fm}
                    name={"job_id"}
                    label={"Job Position"}
                    type={"dropdown"}
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
                      fm.data["job_level"] = e.data?.job_level.name;

                      fm.data["job_level_id"] = e.data?.job_level.id;
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
                      const param = {
                        paging: 1,
                        take: 500,
                      };
                      const params = await events("onload-param", param);
                      const res: any = await api.get(
                        `${process.env.NEXT_PUBLIC_API_PORTAL}/api/jobs` +
                          params
                      );
                      const data: any[] = res.data.data.jobs;
                      if (!Array.isArray(data)) return [];
                      return data.map((e) => {
                        return {
                          value: e.id,
                          label: e.name,
                          data: e,
                        };
                      });
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
                    fm={fm}
                    name={"location"}
                    label={"Location"}
                    type={"dropdown"}
                    disabled={!fm.data?.for_organization_id}
                    onLoad={async () => {
                      if (!fm.data?.for_organization_id) return [];
                      const param = {
                        paging: 1,
                        take: 500,
                      };
                      const params = await events("onload-param", param);
                      const res: any = await api.get(
                        `${process.env.NEXT_PUBLIC_API_PORTAL}/api/organization-locations/organization/` +
                          fm.data?.for_organization_id +
                          params
                      );

                      const data: any[] = res.data.data;
                      
                      if (!Array.isArray(data)) return [];
                      return data.map((e) => {
                        return {
                          value: e.id,
                          label: e.name,
                          data: e,
                        };
                      });
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
                        getNumber(fm?.data?.female_needs);
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
                        getNumber(fm?.data?.female_needs);
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
                <div></div>
                <div>
                  <Field
                    fm={fm}
                    name={"is_replacement"}
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
                  <div className="col-span-2">
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
                    Age (Max/Min)
                  </div>
                  <div className="flex flex-row flex-grow gap-x-1">
                    <div className="flex-grow">
                      <Field
                        fm={fm}
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
                    type={"dropdown"}
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
                    // disabled={!fm.data?.minimum_education}
                    onLoad={async () => {
                      const param = {
                        paging: 1,
                        take: 500,
                        search: fm.data?.minimum_education
                          ? fm.data.minimum_education
                          : null,
                      };
                      if (!fm.data?.minimum_education) {
                        return [];
                      }
                      const params = await events("onload-param", param);
                      const res: any = await api.get(
                        `${process.env.NEXT_PUBLIC_API_MPP}/api/majors` + params
                      );
                      const data: any[] = res.data.data;
                      if (!Array.isArray(data)) return [];
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
                <div className="col-span-2">
                  <Field
                    fm={fm}
                    name={"experiences"}
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
                <div className="col-span-2">
                  <Field
                    fm={fm}
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
