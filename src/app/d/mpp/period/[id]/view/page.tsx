"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
import { useLocal } from "@/lib/use-local";
import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { IoMdSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function Page() {
  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-grow flex-col">
        <Form
        mode={"view"}
          onSubmit={async (fm: any) => {
            const data = fm.data;
          }}
          onLoad={async () => {
            return {};
          }}
          header={(fm: any) => {
            return (
              <>
                <div className="flex flex-row flex-grow px-4 py-4 border-b border-gray-300	items-center">
                  <div className="flex flex-col flex-grow">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                      All <span className="capitalize">Form period</span>
                    </h1>
                    <div className="flex-grow flex flex-row">
                      <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item href="/d/mpp/period">
                          List Period
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Detail</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <Button
                      className="bg-primary-500"
                      onClick={() => {
                        fm.submit();
                      }}
                    >
                      <div className="flex items-center gap-x-0.5">
                        <IoMdSave className="text-xl" />
                        Submit
                      </div>
                    </Button>
                    {fm.data?.status === "complete" ? (
                      <>
                        <Button
                          className="bg-primary-500"
                          onClick={() => {
                            fm.submit();
                          }}
                        >
                          <div className="flex items-center gap-x-0.5">
                            <IoMdSave className="text-xl" />
                            Close
                          </div>
                        </Button>
                      </>
                    ) : fm.data?.status === "open" ? (
                      <>
                        <Button
                          className="bg-primary-500"
                          onClick={() => {
                            fm.submit();
                          }}
                        >
                          <div className="flex items-center gap-x-0.5">
                            <IoMdSave className="text-xl" />
                            Complete
                          </div>
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </>
            );
          }}
          children={(fm: any) => {
            return (
              <>
                <div className={cx("flex flex-col flex-wrap px-4 py-2")}>
                  <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
                    <div>
                      <Field
                        fm={fm}
                        name={"title"}
                        label={"Manpower Planning Name"}
                        type={"text"}
                      />
                    </div>
                    <div>
                      <Field
                        fm={fm}
                        name={"start_date"}
                        label={"Start Date"}
                        type={"date"}
                      />
                    </div>
                    <div>
                      <Field
                        fm={fm}
                        name={"end_date"}
                        label={"End Date"}
                        type={"date"}
                      />
                    </div>
                    <div>
                      <Field
                        fm={fm}
                        name={"status"}
                        label={"Status"}
                        type={"dropdown"}
                        onLoad={async () => {
                          return [
                            {
                              value: "open",
                              label: "Open",
                            },
                            {
                              value: "close",
                              label: "Close",
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
        />
      </div>
    </div>
  );
}

export default Page;
