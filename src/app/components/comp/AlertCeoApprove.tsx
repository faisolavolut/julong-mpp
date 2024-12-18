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
export const AlertCeoApprove: FC<any> = () => {
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
            <DialogDescription>Are You Sure to Approve This Batch?</DialogDescription>
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
              <ButtonBetter >
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
