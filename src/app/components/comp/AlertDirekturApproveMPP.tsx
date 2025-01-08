import { FC } from "react";
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
import { IoEye } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import api from "@/lib/axios";
import { get_user } from "@/lib/get_user";
import { toast } from "sonner";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import { getParams } from "@/lib/get-params";
import get from "lodash.get";
export const AlertDirekturApproveMPP: FC<any> = ({fm}) => {
  const id = getParams("id");
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-row flex-grow">
            <ButtonBetter>Approve</ButtonBetter>
          </div>
        </DialogTrigger>
        <DialogContent className=" flex flex-col">
          <DialogHeader>
            <DialogTitle>Approve</DialogTitle>
            <DialogDescription>
              Are You Sure to Approve This Batch?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <ButtonBetter variant={"outline"}>
                <div className="flex items-center gap-x-0.5">
                  <span className="capitalize">No</span>
                </div>
              </ButtonBetter>
            </DialogClose>
            <DialogClose asChild>
              <ButtonBetter
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
                      approver_type:"DIRECTOR",
                      status: "APPROVED",
                      approved_by: get_user("employee.id"),
                      approver_name: get_user("employee.name"),
                    };
                    await api.put(
                      `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/update-status`,
                      param
                    );
                    
                    setTimeout(() => {
                      fm.data.is_approve  = false;
                      fm.render();
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
                          Submit Failed { get(ex, "response.data.meta.message") || ex.message}.
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
                <div className="flex items-center gap-x-0.5">
                  <span className="capitalize">Yes</span>
                </div>
              </ButtonBetter>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
