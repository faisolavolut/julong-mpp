import { FC, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { ButtonBetter, ButtonContainer } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { IoEye } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import { useLocal } from "@/lib/use-local";
import api from "@/lib/axios";
import { Form } from "../form/Form";
import { Field } from "../form/Field";
import { cloneFM } from "@/lib/cloneFm";
import { toast } from "sonner";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import { get_user } from "@/lib/get_user";
import { getParams } from "@/lib/get-params";
export const AlertCeoRejectMPR: FC<any> = ({lc}) => {
  const id = getParams("id");
  const local = useLocal({
    organization: [] as any[],
    reject: "reject-all" as any,
  });
  useEffect(() => {
  }, []);
  const items = [
    {
      id: "reject-all",
      label: "Reject All",
    },
    {
      id: "reject-partially",
      label: "Reject Partially",
    },
  ] as const;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-row flex-grow">
            <ButtonBetter variant={"reject"}>Reject</ButtonBetter>
          </div>
        </DialogTrigger>
        <DialogContent className=" flex flex-col">
          <DialogHeader>
            <DialogTitle>Reject</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col flex-grow">

            <Form
              onSubmit={async (fm: any) => {}}
              onLoad={async () => {
                return {
                  organization: [],
                };
              }}
              showResize={false}
              header={(fm: any) => {
                return <></>;
              }}
              children={(fm: any) => {
                return (
                  <div className={cx("flex flex-col flex-wrap px-4 py-2")}>
                    <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
                      <div className="col-span-2">
                        <Field
                          fm={fm}
                          name={"notes"}
                          label={"Notes"}
                          type={"textarea"}
                        />
                      </div>
                    </div>
                  </div>
                );
              }}
              onFooter={(fm: any) => {
                return (
                  <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                      <ButtonBetter variant={"outline"}>
                        <div className="flex items-center gap-x-0.5">
                          <span className="capitalize">No</span>
                        </div>
                      </ButtonBetter>
                    </DialogClose>
                    <DialogClose
                      asChild
                      onClick={async () => {
                        toast.info(
                          <>
                            <Loader2
                              className={cx(
                                "h-4 w-4 animate-spin-important",
                                css`
                                  animation: spin 1s linear infinite !important;
                                  @keyframes spin {
                                    0% {
                                      transform: rotate(0deg);
                                    }
                                    100% {
                                      transform: rotate(360deg);
                                    }
                                  }
                                `
                              )}
                            />
                            {"Saving..."}
                          </>
                        );
                        try {
                          const param = {
                            id,
                            status: "REJECTED",
                            level: "Level CEO",
                            approver_id: get_user("employee.id"),
                            approved_by: get_user("employee.name"),
                          };

                          const formData = new FormData();
                          formData.append("payload", JSON.stringify(param));
                          const res = await api.put(
                            `${process.env.NEXT_PUBLIC_API_MPP}/api/mp-requests/status`,
                            formData,
                            {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            }
                          );
                          setTimeout(() => {
                            lc.data.is_approve  = false;
                            lc.render();
                            toast.success(
                              <div
                                className={cx(
                                  "cursor-pointer flex flex-col select-none items-stretch flex-1 w-full"
                                )}
                                onClick={() => {
                                  toast.dismiss();
                                }}
                              >
                                <div className="flex text-green-700 items-center success-title font-semibold">
                                  <Check className="h-6 w-6 mr-1 " />
                                  Record Saved
                                </div>
                              </div>
                            );
                          }, 1000);
                        } catch (ex: any) {
                          toast.error(
                            <div className="flex flex-col w-full">
                              <div className="flex text-red-600 items-center">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                Submit Failed {ex.message}.
                              </div>
                            </div>,
                            {
                              dismissible: true,
                              className: css`
                                background: #ffecec;
                                border: 2px solid red;
                              `,
                            }
                          );
                        }
                      }}
                    >
                      <ButtonBetter>
                        <div className="flex items-center gap-x-0.5">
                          <span className="capitalize">Yes</span>
                        </div>
                      </ButtonBetter>
                    </DialogClose>
                  </DialogFooter>
                );
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
