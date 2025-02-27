"use client";
import { TableUI } from "@/lib/components/tablelist/TableUI";
import { events } from "@/lib/utils/event";
import { getValue } from "@/lib/utils/getValue";
import { useLocal } from "@/lib/utils/use-local";
import { useEffect } from "react";
import { access } from "@/lib/utils/getAccess";
import { apix } from "@/lib/utils/apix";
import { getNumber } from "@/lib/utils/getNumber";
import { ButtonBetter } from "@/lib/components/ui/button";
import { actionToast } from "@/lib/utils/action";
import { IoSync } from "react-icons/io5";

function Page() {
  const local = useLocal({
    ready: true,
    sync: false,
  });
  useEffect(() => {
    const run = async () => {
      const sync = access("sync-job");
      local.sync = sync;
      local.render();
    };
    run();
  }, []);
  return (
    <TableUI
      title="Jobs"
      name="Job"
      header={{
        sideLeft: (data: any) => {
          if (!local.sync) return <></>;
          return (
            <div className="flex flex-row items-center gap-x-2">
              <ButtonBetter
                onClick={async () => {
                  local.ready = false;
                  local.render();
                  await actionToast({
                    task: async () => {
                      await apix({
                        port: "mpp",
                        path: `/api/job-plafons/sync`,
                        method: "get",
                      });
                    },
                    after: () => {
                      window.location.reload();
                      local.ready = true;
                      local.render();
                    },
                    msg_load: "Synchronization ",
                    msg_error: "Synchronization failed ",
                    msg_succes: "Synchronization success ",
                  });
                }}
              >
                <IoSync className={cx(!local.ready ? "animate-spin" : "")} />{" "}
                Synchronization
              </ButtonBetter>
            </div>
          );
        },
      }}
      column={[
        {
          name: "organization_name",
          header: "Organization",
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "name",
          header: "Name",
          width: 300,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
        {
          name: "parent.name",
          header: "Parent",
          width: 300,
          renderCell: ({ row, name, cell }: any) => {
            return <>{getValue(row, name)}</>;
          },
        },
      ]}
      onLoad={async (param: any) => {
        const params = await events("onload-param", param);
        const result: any = await apix({
          port: "portal",
          value: "data.data.jobs",
          path: `/api/jobs${params}`,
          validate: "array",
        });
        return result;
      }}
      onInit={async (list: any) => {}}
      onCount={async () => {
        const result: any = await apix({
          port: "portal",
          value: "data.data.total",
          path: `/api/jobs?page=1&page_size=1`,
          validate: "object",
        });
        return getNumber(result);
      }}
    />
  );
}

export default Page;
