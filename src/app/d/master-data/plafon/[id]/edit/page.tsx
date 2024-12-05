"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
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
  const local = useLocal({
    data: null as any,
  });
  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-grow flex-col">
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
            return (
              <>
                <div className="flex flex-row flex-grow px-4 py-4 border-b border-gray-300	items-center">
                  <div className="flex flex-col flex-grow">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                      All <span className="capitalize">Form Plafon</span>
                    </h1>
                    <div className="flex-grow flex flex-row">
                      <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item href="/d/master-data/plafon">
                          List Platfon
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Edit</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <Alert
                      type={"delete"}
                      onClick={() => {
                        // fm.submit();
                      }}
                    >
                      <div className={cx("bg-red-500", btn())}>
                        <div className="flex items-center gap-x-0.5">
                          <MdDelete className="text-xl" />
                          Delete
                        </div>
                      </div>
                    </Alert>

                    <Alert
                      type={"save"}
                      onClick={() => {
                        fm.submit();
                      }}
                    >
                      <div className={cx("bg-primary-500", btn())}>
                        <div className="flex items-center gap-x-0.5">
                          <IoMdSave className="text-xl" />
                          Save
                        </div>
                      </div>
                    </Alert>
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
