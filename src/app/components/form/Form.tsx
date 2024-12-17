"use client";
import { useLocal } from "@/lib/use-local";
import { Check, Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resize";

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
  className,
  onInit,
}) => {
  const local = useLocal({
    ready: false,
    data: null as any | null,
    submit: async () => {
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
          )} />
          {"Saving..."}
        </>
      );
      await onSubmit(local);
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
    },
    fields: {} as any,
    render: () => {},
    mode,
  });
  useEffect(() => {
    if (typeof onInit === "function") {
      onInit(local);
    }
    local.ready = false;
    local.render();
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
          )} />
        {"Loading..."}
      </>
    );
    const res = onLoad();
    if (res instanceof Promise) {
      res.then((data) => {
        local.ready = true;
        local.data = data;
        local.render(); // Panggil render setelah data diperbarui
        // toast.dismiss();
        // toast.success("Data Loaded Successfully!");
      });
    } else {
      local.ready = true;
      local.data = res;
      local.render(); // Panggil render untuk memicu re-render
      toast.dismiss();
      toast.success("Data Loaded Successfully!");
    }

  }, []);

  // Tambahkan dependency ke header agar reaktif
  const HeaderComponent = header(local);

  return (
    <div className={`flex-grow flex-col flex ${className}`}>
      <div className="flex flex-row">{header(local)}</div>
      {showResize ? (
        // Resize panels...
        <ResizablePanelGroup direction="vertical" className="rounded-lg border">
          <ResizablePanel className="border-none flex flex-col">
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
          <ResizablePanel className="border-t-2 flex flex-row flex-grow">
            {typeof onFooter === "function" ? onFooter(local) : null}
          </ResizablePanel>
        </ResizablePanelGroup>
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
          {typeof onFooter === "function" ? onFooter(local) : null}
        </>
      )}
    </div>
  );
};
