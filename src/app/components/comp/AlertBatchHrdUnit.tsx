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
import { formatMoney } from "../form/field/TypeInput";
import { get_user } from "@/lib/get_user";
import api from "@/lib/axios";
import { toast } from "sonner";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import get from "lodash.get";
import { IoMdSave } from "react-icons/io";
export const AlertBatchHrdUnit: FC<any> = ({ local }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-row flex-grow">
            <ButtonContainer className="bg-primary">
              <div className="flex items-center gap-x-0.5">
                <IoMdSave className="text-xl" />
                <span className="capitalize">Process</span>
              </div>
            </ButtonContainer>
          </div>
        </DialogTrigger>
        <DialogContent className=" flex flex-col">
          <DialogHeader>
            <DialogTitle>Process and Create Batch</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="flex items-center flex-row space-x-2 flex-grow">
            <div className={cx(" flex flex-col flex-grow")}>
              {local?.location_null
                ? ` There are still ${formatMoney(
                    local?.location_null
                  )} locations without an MPP. `
                : ``}
              Are you sure you want to process dan batch this MPP? Keep in mind,
              this action can't be undone!
            </div>
          </div>
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
                try {
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
                  if (local.batch_lines?.length) {
                    const data = {
                      approver_id: get_user("employee.id"),
                      approver_name: get_user("employee.name"),
                      approver_type: "DIRECTOR",
                      batch_lines: local.batch_lines?.length
                        ? local.batch_lines.map((e: any) => {
                            return {
                              mp_planning_header_id: e,
                            };
                          })
                        : [],
                    };
                    await api.post(
                      `${process.env.NEXT_PUBLIC_API_MPP}/api/batch/create`,
                      data
                    );
                    local.can_add = false;
                    local.render();
                  }
                  setTimeout(() => {
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
                        Create Batch Failed{" "}
                        {get(ex, "response.data.meta.message") || ex.message}.
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
        </DialogContent>
      </Dialog>
    </>
  );
};
