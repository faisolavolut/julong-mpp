"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
import { FormBetter } from "@/app/components/form/FormBetter";
import { Alert } from "@/app/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { btn } from "@/app/components/ui/button";
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
    <FormBetter
      onTitle={(fm: any) => {
        return (
          <div className="flex flex-row w-full">
            <div className="flex flex-col py-4 pt-0 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                <span className="">Plafon</span>
              </h2>
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item href="/d/master-data/plafon">
                  List Platfon
                </Breadcrumb.Item>
                <Breadcrumb.Item>Detail</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        );
      }}
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
            <div className={cx("flex flex-col flex-wrap px-4 py-2")}>
              <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
                <div>
                  <Field
                    fm={fm}
                    mode={"view"}
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
                    name={"job"}
                    label={"Job"}
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
                <div>
                  <Field fm={fm} name={"name"} label={"Plafon"} type={"text"} />
                </div>
              </div>
            </div>
          </>
        );
      }}
    />
  );
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row w-full">
        <div className="flex flex-col py-4 pt-0 flex-grow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            <span className="">Plafon</span>
          </h2>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item href="/d/master-data/plafon">
              List Platfon
            </Breadcrumb.Item>
            <Breadcrumb.Item>Edit</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="flex flex-row space-x-2">
          <Alert type={"delete"} onClick={() => {}}>
            <div className={cx("bg-red-500", btn())}>
              <div className="flex items-center gap-x-0.5">
                <MdDelete className="text-xl" />
                Delete
              </div>
            </div>
          </Alert>
          <Alert type={"save"} onClick={() => {}}>
            <div className={cx("bg-primary-500", btn())}>
              <div className="flex items-center gap-x-0.5">
                <IoMdSave className="text-xl" />
                Save
              </div>
            </div>
          </Alert>
        </div>
      </div>
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
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
                <div className={cx("flex flex-col flex-wrap px-4 py-2")}>
                  <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
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
                        name={"job"}
                        label={"Job"}
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
                    <div>
                      <Field
                        fm={fm}
                        name={"name"}
                        label={"Plafon"}
                        type={"text"}
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
