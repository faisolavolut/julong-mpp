"use client";
import React, { FC } from "react";
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Label,
  Navbar,
  TextInput,
} from "flowbite-react";
import {
  HiArchive,
  HiBell,
  HiCog,
  HiCurrencyDollar,
  HiEye,
  HiInbox,
  HiLogout,
  HiMenuAlt1,
  HiOutlineTicket,
  HiSearch,
  HiShoppingBag,
  HiUserCircle,
  HiUsers,
  HiViewGrid,
  HiX,
} from "react-icons/hi";
import { siteurl } from "@/lib/siteurl";
import { get_user } from "@/lib/get_user";
import api from "@/lib/axios";
const NavFlow: React.FC<any> = ({ minimaze }) => {
  return (
    <Navbar fluid>
      <div className="w-full p-1 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {true && (
              <button
                onClick={minimaze}
                className="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:inline"
              >
                <span className="sr-only">Toggle sidebar</span>
                <HiMenuAlt1 className="h-6 w-6" />
              </button>
            )}
            <Navbar.Brand href="/">
              <img
                alt=""
                src={siteurl("/julong.png")}
                className="mr-3 h-6 sm:h-8"
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-black">
                Man Power Management
              </span>
            </Navbar.Brand>
          </div>

          <div className="flex items-center lg:gap-3">
            <div className="flex items-center">
              <NotificationBellDropdown />
            </div>
            <div className="hidden lg:block">
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

const NotificationBellDropdown: FC = function () {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="rounded-lg p-2 hover:bg-gray-100 ">
          <span className="sr-only">Notifications</span>
          <HiBell className="text-2xl text-gray-500 hover:text-gray-900  " />
        </span>
      }
    >
      <div className="max-w-[24rem]">
        <div className="block rounded-t-xl bg-gray-50 py-2 px-4 text-center text-base font-medium text-gray-700">
          Notifications
        </div>
        <div>
          <a
            href="#"
            className="flex border-y py-3 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <div className="shrink-0">
              <img
                alt=""
                src={siteurl("/dog.jpg")}
                className="h-11 w-11 rounded-full"
              />
              <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-primary dark:border-gray-700">
                <NewMessageIcon />
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="mb-1.5 text-md font-normal text-gray-500 ">
                New message from&nbsp;
                <span className="font-semibold text-gray-900 ">
                  Bonnie Green
                </span>
                : "Hey, what's up? All set for the presentation?"
              </div>
              <div className="text-md font-medium text-primary-700 ">
                a few moments ago
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex border-b py-3 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <div className="shrink-0">
              <img
                alt=""
                src={siteurl("/dog.jpg")}
                className="h-11 w-11 rounded-full"
              />
              <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-gray-900 dark:border-gray-700">
                <NewFollowIcon />
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="mb-1.5 text-md font-normal text-gray-500 ">
                <span className="font-semibold text-gray-900 ">Jese Leos</span>
                &nbsp;and&nbsp;
                <span className="font-medium text-gray-900 ">5 others</span>
                &nbsp;started following you.
              </div>
              <div className="text-md font-medium text-primary-700 ">
                10 minutes ago
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex border-b py-3 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <div className="shrink-0">
              <img
                alt=""
                src={siteurl("/dog.jpg")}
                className="h-11 w-11 rounded-full"
              />
              <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-600 dark:border-gray-700">
                <NewLoveIcon />
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="mb-1.5 text-md font-normal text-gray-500 ">
                <span className="font-semibold text-gray-900 ">
                  Joseph Mcfall
                </span>
                &nbsp;and&nbsp;
                <span className="font-medium text-gray-900 ">141 others</span>
                &nbsp;love your story. See it and view more stories.
              </div>
              <div className="text-md font-medium text-primary-700 ">
                44 minutes ago
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex border-b py-3 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <div className="shrink-0">
              <img
                alt=""
                src={siteurl("/dog.jpg")}
                className="h-11 w-11 rounded-full"
              />
              <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-green-400 dark:border-gray-700">
                <NewMentionIcon />
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="mb-1.5 text-md font-normal text-gray-500 ">
                <span className="font-semibold text-gray-900 ">
                  Leslie Livingston
                </span>
                &nbsp;mentioned you in a comment:&nbsp;
                <span className="font-medium text-primary-700 ">
                  @bonnie.green
                </span>
                &nbsp;what do you say?
              </div>
              <div className="text-md font-medium text-primary-700 ">
                1 hour ago
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <div className="shrink-0">
              <img
                alt=""
                src={siteurl("/dog.jpg")}
                className="h-11 w-11 rounded-full"
              />
              <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-purple-500 dark:border-gray-700">
                <NewVideoIcon />
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="mb-1.5 text-md font-normal text-gray-500 ">
                <span className="font-semibold text-gray-900 ">
                  Robert Brown
                </span>
                &nbsp;posted a new video: Glassmorphism - learn how to implement
                the new design trend.
              </div>
              <div className="text-md font-medium text-primary-700 ">
                3 hours ago
              </div>
            </div>
          </a>
        </div>
        <a
          href="#"
          className="block rounded-b-xl bg-gray-50 py-2 text-center text-base font-normal text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:hover:underline"
        >
          <div className="inline-flex items-center gap-x-2">
            <HiEye className="h-6 w-6" />
            <span>View all</span>
          </div>
        </a>
      </div>
    </Dropdown>
  );
};

const NewMessageIcon: FC = function () {
  return (
    <svg
      className="h-3 w-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
    </svg>
  );
};

const NewFollowIcon: FC = function () {
  return (
    <svg
      className="h-3 w-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
    </svg>
  );
};

const NewLoveIcon: FC = function () {
  return (
    <svg
      className="h-3 w-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const NewMentionIcon: FC = function () {
  return (
    <svg
      className="h-3 w-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const NewVideoIcon: FC = function () {
  return (
    <svg
      className="h-3 w-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
    </svg>
  );
};

const AppDrawerDropdown: FC = function () {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="sr-only">Apps</span>
          <HiViewGrid className="text-2xl text-gray-500 hover:text-gray-900  dark:hover:text-white" />
        </span>
      }
    >
      <div className="block rounded-t-lg border-b bg-gray-50 py-2 px-4 text-center text-base font-medium text-gray-700 dark:border-b-gray-600 dark:bg-gray-700 ">
        Apps
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiShoppingBag className="mx-auto mb-1 h-7 w-7 text-gray-500 " />
          <div className="text-md font-medium text-gray-900 ">Sales</div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiUsers className="mx-auto mb-1 h-7 w-7 text-gray-500 " />
          <div className="text-md font-medium text-gray-900 ">Users</div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiInbox className="mx-auto mb-1 h-7 w-7 text-gray-500 " />
          <div className="text-md font-medium text-gray-900 ">Inbox</div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiUserCircle className="mx-auto mb-1 h-7 w-7 text-gray-500 " />
          <div className="text-md font-medium text-gray-900 ">Profile</div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiCog className="mx-auto mb-1 h-7 w-7 text-gray-500 " />
          <div className="text-md font-medium text-gray-900 ">Settings</div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiArchive className="mx-auto mb-1 h-7 w-7 text-gray-500 " />
          <div className="text-md font-medium text-gray-900 ">Products</div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiCurrencyDollar className="mx-auto mb-1 h-7 w-7 text-gray-500 " />
          <div className="text-md font-medium text-gray-900 ">Pricing</div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiOutlineTicket className="mx-auto mb-1 h-7 w-7 text-gray-500 " />
          <div className="text-md font-medium text-gray-900 ">Billing</div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiLogout className="mx-auto mb-1 h-7 w-7 text-gray-500 " />
          <div className="text-md font-medium text-gray-900 ">Logout</div>
        </a>
      </div>
    </Dropdown>
  );
};

const UserDropdown: FC = function () {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span>
          <span className="sr-only">User menu</span>
          <Avatar alt="" img={siteurl("/dog.jpg")} rounded size="sm" />
        </span>
      }
    >
      <Dropdown.Header>
        <span className="block text-md">
          {get_user("employee.name") ? get_user("employee.name") : "-"}
        </span>
        <span className="block truncate text-md font-medium">
          {get_user("employee.email") ? get_user("employee.email") : "-"}
        </span>
      </Dropdown.Header>
      <Dropdown.Item
        onClick={() => {
          if (typeof window === "object")
            navigate(
              `${process.env.NEXT_PUBLIC_API_PORTAL}/choose-roles?state=manpower`
            );
        }}
      >
        Switch Role
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={async () => {
          await api.delete(process.env.NEXT_PUBLIC_BASE_URL + "/api/destroy-cookies");
          localStorage.removeItem('user');
          if (typeof window === "object")
            navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/logout`);
        }}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};

export default NavFlow;
