"use client";
import { makeData } from "@/lib/makeData";
import {
  ColumnDef,
  ColumnResizeDirection,
  ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import { useLocal } from "@/lib/use-local";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";

import { init_column } from "../tablelist/lib/column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TabSlider from "../ui/tabslider";

export const Tablist: React.FC<any> = ({
  name,
  column,
  onLabel,
  onValue,
  onLoad,
  take = 20,
  header,
  tabContent,
  disabledPagination,
  onChange,
  value,hiddenHeaderTab
}) => {
  const sideRight =
    typeof header?.sideRight === "function" ? header.sideRight : null;
  const local = useLocal({
    data: [] as any[],
    sort: {} as any,
    search: null as any,
    select: null as any,
    reload: async () => {
      const res: any = onLoad({
        search: local.search,
        sort: local.sort,
        take,
        paging: 1,
      });
      if (res instanceof Promise) {
        res.then((e) => {
          local.data = e;
          local.render();
        });
      } else {
        local.data = res;
        local.render();
      }
    },
  });
  useEffect(() => {
    if (typeof onLoad === "function") {
      const res: any = onLoad({
        search: local.search,
        sort: local.sort,
        take: 10,
        paging: 1,
      });
      if (res instanceof Promise) {
        res.then((e) => {
          local.data = e;
          local.render();
          local.select = onValue(local.data?.[0])
        });
      } else {
        local.data = res;
        local.render();
        local.select = onValue(local.data?.[0])
      }
    } else {
      local.data = onLoad;
      local.render();
      local.select = onValue(local.data?.[0])
    }
  }, []);
  useEffect(() => {
    local.select = value;
    local.render();
  }, [value]);
  if (!local.data?.length) return <></>;
  return (
    <div className="flex flex-row w-full">
      <Tabs
        className="flex flex-col w-full"
        defaultValue={onValue(local.data?.[0])}
        value={local.select}
      >
        <TabsList className={cx("flex flex-row relative w-full bg-gray-50 p-0 rounded-none", hiddenHeaderTab ? "hidden" : "")}>
          <TabSlider className=" " disabledPagination={disabledPagination}>
            {local.data.map((e, idx) => {
              return (
                <TabsTrigger
                  value={onValue(e)}
                  onClick={() => {
                    if (typeof onChange === "function") {
                      onChange(e);
                    }
                  }}
                  className={cx(
                    "p-1.5 px-4 border text-sm",
                    css`
                      z-index: -1;
                    `,
                    !idx ? "ml-1.5" : idx++ === local.data.length ? "mr-2" : ""
                  )}
                  key={onValue(e)}
                >
                  {onLabel(e)}
                </TabsTrigger>
              );
            })}
          </TabSlider>
        </TabsList>
        {local.data.map((e) => {
          return (
            <TabsContent value={onValue(e)} key={onValue(e) + "_tabcontent"}>
              <div className="flex flex-row flex-grow w-full h-full">
                {tabContent(e)}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
