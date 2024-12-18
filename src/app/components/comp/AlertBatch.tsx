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
export const AlertBatch: FC<any> = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-row flex-grow">
            <ButtonContainer className="bg-primary">
              <div className="flex items-center gap-x-0.5">
                <HiPlus className="text-xl" />
                <span className="capitalize">Create Batch</span>
              </div>
            </ButtonContainer>
          </div>
        </DialogTrigger>
        <DialogContent className=" flex flex-col">
          <DialogHeader>
            <DialogTitle>Create Batch</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="flex items-center flex-row space-x-2 flex-grow">
            <div className={cx(" flex flex-col flex-grow")}>
              Are you sure to continue this action? There are 4 locations NULL
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
