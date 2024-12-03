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
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiHome,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import classNames from "classnames";
import { useLocal } from "@/lib/use-local";
import { debouncedHandler } from "@/lib/debounceHandler";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";

import Link from "next/link";
import { init_column } from "./lib/column";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";

export const TableList: React.FC<any> = ({
  name,
  column,
  onLoad,
  take = 20,
  header,
}) => {
  const sideRight =
    typeof header?.sideRight === "function" ? header.sideRight : null;
  type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    status: string;
    progress: number;
  }; 
  const [data, setData] = useState<any[]>([]);
  const local = useLocal({
    table: null as any,
    data: [] as any[],
    sort: {} as any,
    search: null as any,
    addRow: (row: any) => {
      setData((prev) => [...prev, row]);
      local.data.push(row)
    },
    reload: async () => {
      console.log("HALOOO DEK")
      if (Array.isArray(onLoad)) {
        local.data = onLoad;
        local.render();
      } else {
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
      }
      console.log(local.data)
    },
  });
  useEffect(() => {
    toast.info(
      <>
        <Loader2 className="h-4 w-4 animate-spin" />
        {"Loading..."}
      </>
    );
    if (Array.isArray(onLoad)) {
      local.data = onLoad;
      local.render();
    } else {
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
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      } else {
        local.data = res;
        local.render();
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
      }
    }
  }, []);
  const defaultColumns: ColumnDef<Person>[] = init_column(column);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);
  const [columnResizeMode, setColumnResizeMode] =
    React.useState<ColumnResizeMode>("onChange");

  const [columnResizeDirection, setColumnResizeDirection] =
    React.useState<ColumnResizeDirection>("ltr");
  // Create the table and pass your options
  useEffect(() => {
    setData(local.data);
    console.log("AYO INI BERUBAH")
  }, [local.data]);
  const table = useReactTable({
    data: data,
    columnResizeMode,
    columnResizeDirection,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: take,
      },
      sorting,
    },
  });
  local.table = table;

  // Manage your own state
  const [state, setState] = React.useState(table.initialState);

  // Override the state managers for the table to your own
  table.setOptions((prev) => ({
    ...prev,
    state,
    onStateChange: setState,
    debugTable: state.pagination.pageIndex > 2,
  }));
  const addRow = () => {
    const newRow = { id: data.length + 1, name: "New User", age: 20 };
    setData((prev) => [...prev, newRow]);
  };
  return (
    <>
      <div className="tbl-wrapper p-2 flex flex-grow flex-col">
        <div className="head-tbl-list block items-end justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="">
            <div className="sm:flex flex flex-col space-y-2">
              {name ? (
                <div className="mb-4">
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    All{" "}
                    <span className="capitalize">{name ? `${name}s` : ``}</span>
                  </h1>
                </div>
              ) : (
                <></>
              )}
              <div className="tbl-search mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
                <form
                  className="lg:pr-3"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await local.reload();
                  }}
                >
                  <Label htmlFor="users-search" className="sr-only">
                    Search
                  </Label>
                  <div className="relative mt-1 lg:w-64 xl:w-96">
                    <TextInput
                      id="users-search"
                      name="users-search"
                      placeholder={`Search for ${name ? `${name}s` : ``}`}
                      onChange={(e) => {
                        const value = e.target.value;
                        local.search = value;
                        local.render();
                        debouncedHandler(() => {
                          local.reload();
                        }, 1500);
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
            <div className="flex">
              {sideRight ? (
                sideRight(local)
              ) : (
                <>
                  <Link href={"/d/tablelist/new"}>
                    <Button className="bg-primary-500">
                      <div className="flex items-center gap-x-3">
                        <HiPlus className="text-xl" />
                        <span className="capitalize">Add {name}</span>
                      </div>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="overflow-auto relative flex-grow flex-row">
            <div className="tbl absolute top-0 left-0 inline-block flex-grow w-full h-full align-middle">
              <div className="shadow ">
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-100 dark:bg-gray-700 group/head text-xs uppercase text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-700">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={`${headerGroup.id}`} className={headerGroup.id}>
                        {headerGroup.headers.map((header, index) => {
                          const name = header.column.id;
                          const col = column.find((e: any) => e?.name === name);
                          const isSort =
                            typeof col?.sortable === "boolean"
                              ? col.sortable
                              : true;
                          return (
                            <th
                              {...{
                                style: {
                                  width:
                                    col?.width && header.getSize() < col?.width
                                      ? col?.width
                                      : header.getSize(),
                                },
                              }}
                              key={header.id}
                              colSpan={header.colSpan}
                              className="relative bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700"
                            >
                              <div
                                key={`${header.id}-label`}
                                onClick={() => {
                                  if (isSort) {
                                    const sort = local?.sort?.[name];
                                    const mode =
                                      sort === "desc"
                                        ? null
                                        : sort === "asc"
                                        ? "desc"
                                        : "asc";
                                    local.sort = mode
                                      ? {
                                          [name]: mode,
                                        }
                                      : {};
                                    local.render();
                                  }
                                }}
                                className={cx(
                                  "flex flex-grow flex-row  select-none items-center flex-row",
                                  isSort ? " cursor-pointer" : ""
                                )}
                              >
                                <div className="flex flex-row items-center">
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                </div>
                                <div className="flex flex-row items-center">
                                  {local?.sort?.[name] === "asc" ? (
                                    <FaArrowUp className="px-0.5 mx-1" />
                                  ) : local?.sort?.[name] === "desc" ? (
                                    <FaArrowDownLong className="px-0.5 mx-1" />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              {headerGroup.headers.length !== index + 1 ? (
                                <div
                                  key={`${header.id}-resizer`} // Tambahkan key unik
                                  {...{
                                    onDoubleClick: () =>
                                      header.column.resetSize(),
                                    onMouseDown: header.getResizeHandler(),
                                    onTouchStart: header.getResizeHandler(),
                                    className: `resizer w-0.5 bg-gray-300 ${
                                      table.options.columnResizeDirection
                                    } ${
                                      header.column.getIsResizing()
                                        ? "isResizing"
                                        : ""
                                    }`,
                                    style: {
                                      transform:
                                        columnResizeMode === "onEnd" &&
                                        header.column.getIsResizing()
                                          ? `translateX(${
                                              (table.options
                                                .columnResizeDirection === "rtl"
                                                ? -1
                                                : 1) *
                                              (table.getState().columnSizingInfo
                                                .deltaOffset ?? 0)
                                            }px)`
                                          : "",
                                    },
                                  }}
                                ></div>
                              ) : null}
                            </th>
                          );
                        })}
                      </tr>
                    ))}
                  </thead>

                  <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {table.getRowModel().rows.map((row) => (
                      <Table.Row
                        key={row.id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {row.getVisibleCells().map((cell) => {
                          const ctx = cell.getContext();
                          const param = {
                            row: row.original,
                            name: ctx.column.id,
                            cell,
                          };
                          const head = column.find(
                            (e: any) => e?.name === ctx.column.id
                          );
                          const renderData =
                            typeof head?.renderCell === "function"
                              ? head.renderCell(param)
                              : flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                );
                          return (
                            <Table.Cell
                              className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white"
                              key={cell.id}
                            >
                              {renderData}
                            </Table.Cell>
                          );
                        })}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          onNextPage={() => table.nextPage()}
          onPrevPage={() => table.previousPage()}
          disabledNextPage={!table.getCanNextPage()}
          disabledPrevPage={!table.getCanPreviousPage()}
          page={table.getState().pagination.pageIndex + 1}
          countPage={table.getPageCount()}
          countData={local.data.length}
          take={take}
          onChangePage={(page: number) => {
            table.setPageIndex(page);
          }}
        />
      </div>
    </>
  );
};

export const Pagination: React.FC<any> = ({
  onNextPage,
  onPrevPage,
  disabledNextPage,
  disabledPrevPage,
  page,
  countPage,
  countData,
  take,
  onChangePage,
}) => {
  const local = useLocal({
    page: 1 as any,
  });
  useEffect(() => {
    local.page = page;
    local.render();
  }, [page]);
  return (
    <div className="tbl-pagination sticky bottom-0 right-0 w-full items-center justify-end border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
      <div className="mb-4 flex items-center sm:mb-0">
        <div
          onClick={() => {
            if (!disabledPrevPage) {
              onPrevPage();
            }
          }}
          className={classNames(
            "inline-flex  justify-center rounded p-1 ",
            disabledPrevPage
              ? "text-gray-200"
              : "cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          )}
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </div>
        <div
          onClick={() => {
            if (!disabledNextPage) {
              onNextPage();
            }
          }}
          className={classNames(
            "inline-flex  justify-center rounded p-1 ",
            disabledNextPage
              ? "text-gray-200"
              : "cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          )}
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </div>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Page&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {page}
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {countPage}
          </span>
        </span>

        <span className="flex items-center pl-2">
          | Go to page:
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const page = Number(local.page);
              if (!page) {
                local.page = 0;
              } else if (page > countPage) {
                local.page = countPage;
              }
              local.render();
              onChangePage(local.page - 1);
            }}
          >
            <input
              type="number"
              min="1"
              max={countPage}
              value={local.page}
              onChange={(e) => {
                local.page = e.target.value;
                local.render();
                debouncedHandler(() => {
                  const page = Number(local.page);
                  if (!page) {
                    local.page = 0;
                  } else if (page > countPage) {
                    local.page = countPage;
                  }
                  local.render();
                  onChangePage(local.page - 1);
                }, 1500);
              }}
              className="block  ml-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </form>
        </span>
      </div>
      <div className="flex items-center space-x-3 hidden">
        {!disabledPrevPage ? (
          <>
            <div
              onClick={() => {
                if (!disabledPrevPage) {
                  onPrevPage();
                }
              }}
              className={classNames(
                "cursor-pointer inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              )}
            >
              <HiChevronLeft className="mr-1 text-base" />
              Previous
            </div>
          </>
        ) : (
          <></>
        )}
        {!disabledNextPage ? (
          <>
            <div
              onClick={() => {
                if (!disabledNextPage) {
                  onNextPage();
                }
              }}
              className={classNames(
                "cursor-pointer inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              )}
            >
              Next
              <HiChevronRight className="ml-1 text-base" />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
