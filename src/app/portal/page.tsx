"use client";
import { Button, Footer, Label, Navbar, ToggleSwitch } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import { HiOutlineLogin } from "react-icons/hi";

function Portal() {
  return (
    <>
      <div className="dark:bg-gray-900">
        <div className="container mx-auto dark:bg-gray-900 lg:px-0">
          <section className="grid grid-cols-1 space-y-12 pt-9 lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 xl:gap-8">
            {/* <div className="flex flex-col rounded-lg bg-white p-6 shadow dark:bg-gray-800 xl:p-8">
              <div className="flex-1">
                <div className="mb-4 flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-5xl font-extrabold tracking-tight dark:text-white">
                    APP 1
                  </span>
                </div>
                <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  Great for personal use and for your side projects.
                </p>
              </div>
              <a
                href="#"
                className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Visit
              </a>
            </div> */}
            <AppCardList
              data={[
                {
                  name: "Management Users",
                  description:
                    "Great for personal use and for your side projects.",
                  url: "/d/dashboard",
                  access: true
                },
                {
                  name: "APP 1",
                  description:
                    "Great for personal use and for your side projects.",
                  url: "",
                },
                {
                  name: "APP 2",
                  description:
                    "Great for personal use and for your side projects.",
                  url: "/d/dashboard",
                },
                {
                  name: "APP 3",
                  description:
                    "Great for personal use and for your side projects.",
                  url: "/d/dashboard",
                },
                {
                  name: "APP 4",
                  description:
                    "Great for personal use and for your side projects.",
                  url: "/d/dashboard",
                },
              ]}
            />
          </section>
        </div>
      </div>
    </>
  );
}
interface AppData {
  name: string;
  description: string;
  url: string;
  access?: true | boolean;
}

interface AppCardListProps {
  data: AppData[];
}
const AppCardList: React.FC<AppCardListProps> = ({ data }) => {
  return (
    <>
      {data.map((app, index) => (
        <div
          key={index}
          className="flex flex-col rounded-lg bg-white p-6 shadow dark:bg-gray-800 xl:p-8 cursor-pointer hover:shadow-lg"
        >
          <div className="flex-1">
            <div className="mb-4 flex items-baseline text-gray-900 dark:text-white">
              <span className="text-5xl font-extrabold tracking-tight dark:text-white">
                {app.name}
              </span>
            </div>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
              {app.description}
            </p>
          </div>
          {app.access ? (
            <a
              href={app.url}
              className="rounded-lg bg-primary-700 mt-2 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Visit
            </a>
          ) : (
            <p
              className="rounded-lg  mt-2 px-5 py-2.5 text-center text-sm font-medium text-white  bg-gray-500"
            >
              No Available
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export default Portal;
