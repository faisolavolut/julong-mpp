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
export const AlertCeoReject: FC<any> = () => {
  const local = useLocal({
    organization: [] as any[],
    reject: "reject-all" as any,
  });
  useEffect(() => {
    const run = async () => {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_API_PORTAL}/api/organizations`
      );
      const data: any[] = res.data.data.organizations;
      const result = data?.length
        ? data.map((e) => {
            return { id: e.id, label: e.name };
          })
        : [];

      local.organization = result;
      local.render();
    };
    run();
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
            <div className="flex flex-col gap-y-2 mb-2">
              {items.map((item) => (
                <div
                  className="flex items-center space-x-2"
                  key={"checkbox_item_reject" + item.id}
                >
                  <Checkbox
                    id={item.id}
                    checked={local?.reject === item.id}
                    onCheckedChange={(e) => {
                      local.reject = item.id;
                      local.render();
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>

            {local?.reject === "reject-partially" &&
              local?.organization?.length && (
                <>
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
                        <div className="flex flex-col gap-y-2 flex-grow pl-6 max-h-[250px] overflow-y-scroll">
                          {local.organization.map((item) => {
                            const fm_row = cloneFM(fm, { id: item.id });
                            const is_check = fm.data?.organization?.length
                              ? fm.data.organization.find(
                                  (org: any) => org?.id === item.id
                                )
                              : false;
                            return (
                              <div
                                className="flex flex-col"
                                key={"checkbox_item_reject" + item.id}
                              >
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={item.id}
                                    onCheckedChange={(e) => {
                                      if (e) {
                                        if (
                                          !Array.isArray(fm.data?.organization)
                                        ) {
                                          fm.data["organization"] = [];
                                          fm.render();
                                        }
                                        // Jika checkbox dicentang, tambahkan item ke array organization
                                        fm.data.organization.push(fm_row.data);
                                      } else {
                                        // Jika checkbox tidak dicentang, hapus item dari array organization
                                        fm.data["organization"] = fm.data
                                          ?.organization?.length
                                          ? fm.data.organization.filter(
                                              (org: any) => org?.id !== item.id
                                            )
                                          : [];
                                      }
                                      fm.render();
                                    }}
                                  />
                                  <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {item.label}
                                  </label>
                                </div>
                                {is_check ? (
                                  <div className="pt-1 pb-3">
                                    <Field
                                      fm={fm_row}
                                      hidden_label={true}
                                      name={"notes"}
                                      label={"Organization"}
                                      type={"text"}
                                      placeholder="Notes"
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  />
                </>
              )}
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
