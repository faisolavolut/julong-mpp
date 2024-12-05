"use client";
import { useLocal } from "@/lib/use-local";
import { Check, Loader2 } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resize";

type FormProps<T> = {
  children: (fm: Local<T>) => ReactNode;
  header: (fm: Local<T>) => ReactNode;
  onFooter?: (fm: Local<T>) => ReactNode;
  onLoad: () => Promise<T> | T;
  onSubmit: (fm: Local<T>) => Promise<void>;
  showResize: boolean;
};

type Local<T> = {
  data: T | null;
  submit: () => Promise<void>;
  render: () => void;
};

export const Form: React.FC<any> = ({
  children,
  header,
  onLoad,
  onSubmit,
  onFooter,
  showResize,
  mode,
}) => {
  const local = useLocal({
    ready: false,
    data: null as any | null,
    submit: async () => {
      await onSubmit(local);
    },
    fields: {} as any,
    render: () => {},
    mode,
  });

  useEffect(() => {
    local.ready = false;
    local.render();
    toast.info(
      <>
        <Loader2 className="h-4 w-4 animate-spin" />
        {"Loading..."}
      </>
    );
    const res = onLoad();
    if (res instanceof Promise) {
      res.then((data) => {
        local.ready = true;
        local.data = data;
        local.render();
        toast.dismiss();
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
              Saved
            </div>
          </div>
        );
        setTimeout(() => {
          toast.dismiss();
        }, 1000);
      });
    } else {
      local.ready = true;
      local.data = res;
      local.render();
      toast.dismiss();
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
            Saved
          </div>
        </div>
      );
      setTimeout(() => {
        toast.dismiss();
      }, 1000);
    }
  }, []);

  return (
    <div className="flex-grow flex-col flex">
      <div className="flex flex-row">{header(local)}</div>
      {showResize ? (
        <>
          <ResizablePanelGroup
            direction="vertical"
            className="rounded-lg border flex-grow border-none flex-col"
          >
            <ResizablePanel
              className={cx(
                "border-none flex flex-col ",
                css`
                  overflow-y: scroll !important;
                `
              )}
            >
              <form
                className="flex flex-grow flex-col"
                onSubmit={(e) => {
                  e.preventDefault();
                  local.submit();
                }}
              >
                {children(local)}
              </form>
            </ResizablePanel>
            <ResizableHandle className="border-none" />
            <ResizablePanel className="border-t-2	 flex flex-row flex-grow">
              <div></div>
              <div
                className={cx(
                  "flex flex-col flex-grow relative",
                  css`
                    .tbl-wrapper {
                      padding-top: 0 !important;
                    }
                    .head-tbl-list {
                      padding-top: 0 !important;
                    }
                  `
                )}
              >
                {typeof onFooter === "function" ? onFooter(local) : <></>}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </>
      ) : (
        <>
          <form
            className="flex flex-grow flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              local.submit();
            }}
          >
            {children(local)}
          </form>
          <div
            className={cx(
              "flex flex-col flex-grow relative",
              css`
                .tbl-wrapper {
                  padding-top: 0 !important;
                }
                    .tbl {
                      position: relative;
                    }
                .head-tbl-list {
                  padding-top: 0 !important;
                }
              `
            )}
          >
            {typeof onFooter === "function" ? onFooter(local) : <></>}
          </div>
        </>
      )}
    </div>
  );
};
