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
      await onSubmit(local);
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
        <Loader2 className="h-4 w-4 animate-spin" />
        {"Loading..."}
      </>
    );
    const res = onLoad();
    if (res instanceof Promise) {
      res.then((data) => {
        local.ready = true;
        local.data = data;
        local.render(); // Panggil render setelah data diperbarui
        toast.dismiss();
        toast.success("Data Loaded Successfully!");
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
