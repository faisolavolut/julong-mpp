"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
import { useLocal } from "@/lib/use-local";
import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { IoMdSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function Page() {
  const local = useLocal({
    data: null as any,
  });
  return (
    <div className="w-full flex flex-row flex-grow">
      <div className="flex flex-grow flex-col">
        <Form
        onSubmit={async() => {
          console.log("HALOOO???")
        }}
        onLoad={async () => {
return {}
        }}
          header={(fm: any) => {
            return (
              <>
                <div className="flex flex-row flex-grow px-4 py-4 border-b border-gray-300	items-center">
                  <div className="flex-grow flex flex-row">
                    <Breadcrumb className="breadcrumb">
                      <Breadcrumb.Item href="/d/tablelist">
                        Users
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <Button className="bg-primary" onClick={() => {}}>
                      <div className="flex items-center gap-x-0.5">
                        <IoMdSave className="text-xl" />
                        Save
                      </div>
                    </Button>
                  </div>
                </div>
              </>
            );
          }}
          children={(fm: any) => {
            return (
              <>
                <div className={cx("flex flex-col flex-wrap px-4 py-2")}>
                  <h2 className="mb-4 text-xl font-semibold leading-none text-gray-900 dark:text-white">
                    General Information
                  </h2>
                  <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
                    <div className="sm:col-span-2">
                      <Label
                        htmlFor="file_input"
                        className="block mb-2 dark:text-white"
                      >
                        Upload avatar
                      </Label>
                      <div className="items-center w-full sm:flex">
                        <Avatar
                          alt="Helene avatar"
                          img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                          rounded
                          size="lg"
                          className="[&_img]:max-w-none mb-4 sm:mr-4 sm:mb-0"
                        />
                        <div className="w-full">
                          <FileInput
                            aria-describedby="file_input_help"
                            id="file_input"
                            name="file_input"
                            className="w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          />
                          <Label
                            htmlFor="file_input"
                            className="mt-1 text-md font-normal text-gray-500 dark:text-gray-300"
                          >
                            SVG, PNG, JPG or GIF (MAX. 800x400px).
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="first-name"
                        className="block mb-2 dark:text-white"
                      >
                        First Name
                      </Label>
                      <TextInput
                        id="first-name"
                        name="first-name"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="last-name"
                        className="block mb-2 dark:text-white"
                      >
                        Last Name
                      </Label>
                      <TextInput
                        id="last-name"
                        name="last-name"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="block mb-2 dark:text-white"
                      >
                        Email
                      </Label>
                      <TextInput
                        id="email"
                        name="email"
                        placeholder="name@company.com"
                        required
                        type="email"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="user-permissions"
                        className="inline-flex items-center mb-2 text-md font-medium text-gray-900 dark:text-white"
                      >
                        User Permissions
                        <Tooltip content="User permissions, part of the overall user management process, are access granted to users to specific resources such as files, applications, networks, or devices.">
                          <button className="ml-1">
                            <svg
                              aria-hidden
                              className="w-4 h-4 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="sr-only">Show information</span>
                          </button>
                        </Tooltip>
                      </Label>
                      <Select id="user-permissions" name="user-permissions">
                        <option selected>Operational</option>
                        <option value="NO">Non Operational</option>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="email-status"
                        className="inline-flex items-center mb-2 text-md font-medium text-gray-900 dark:text-white"
                      >
                        Email Status
                        <Tooltip content="As an administrator, you can view the status of a user's email. The status indicates whether a user's email is verified or not.">
                          <button className="ml-1">
                            <svg
                              aria-hidden
                              className="w-4 h-4 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="sr-only">Show information</span>
                          </button>
                        </Tooltip>
                      </Label>
                      <Select id="email-status" name="email-status">
                        <option selected>Not verified</option>
                        <option value="VE">Verified</option>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="job-title"
                        className="block mb-2 dark:text-white"
                      >
                        Job Title
                      </Label>
                      <TextInput
                        id="job-title"
                        name="job-title"
                        placeholder="e.g React Native Developer"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="user-role"
                        className="inline-flex items-center mb-2 text-md font-medium text-gray-900 dark:text-white"
                      >
                        User Role
                        <Tooltip content="Flowbite provides 7 predefined roles: Owner, Admin, Editor, Contributor and Viewer. Assign the most suitable role to each user, giving them the most appropriate level of control.">
                          <button className="ml-1">
                            <svg
                              aria-hidden
                              className="w-4 h-4 text-gray-400 hover:text-gray-900 dark:hover:text-white dark:text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="sr-only">Show information</span>
                          </button>
                        </Tooltip>
                      </Label>
                      <Select id="user-role" name="user-role">
                        <option selected>Owner</option>
                        <option value="AD">Admin</option>
                        <option value="ED">Editor</option>
                        <option value="CO">Contributor</option>
                        <option value="VI">Viewer</option>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="account"
                        className="inline-flex items-center mb-2 text-md font-medium text-gray-900 dark:text-white"
                      >
                        Account
                        <Tooltip content="Choose here your account type.">
                          <button className="ml-1">
                            <svg
                              aria-hidden
                              className="w-4 h-4 text-gray-400 hover:text-gray-900 dark:hover:text-white dark:text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="sr-only">Show information</span>
                          </button>
                        </Tooltip>
                      </Label>
                      <Select id="account" name="account">
                        <option selected>Choose account type</option>
                        <option value="DF">Default Account</option>
                        <option value="PRO">PRO Account</option>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="password"
                        className="block mb-2 dark:text-white"
                      >
                        Password
                      </Label>
                      <TextInput
                        id="password"
                        name="password"
                        placeholder="•••••••••"
                        required
                        type="password"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="confirm-password"
                        className="block mb-2 dark:text-white"
                      >
                        Confirm password
                      </Label>
                      <TextInput
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="•••••••••"
                        required
                        type="password"
                      />
                    </div>
                    <div>
                      <p className="block mb-2 dark:text-white">Assign Role</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Checkbox
                            id="inline-checkbox"
                            name="inline-checkbox"
                          />
                          <Label
                            htmlFor="inline-checkbox"
                            className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                          >
                            Administrator
                          </Label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox
                            id="inline-2-checkbox"
                            name="inline-2-checkbox"
                          />
                          <Label
                            htmlFor="inline-2-checkbox"
                            className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                          >
                            Member
                          </Label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox
                            id="inline-3-checked-checkbox"
                            name="inline-3-checked-checkbox"
                          />
                          <Label
                            htmlFor="inline-3-checked-checkbox"
                            className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                          >
                            Viewer
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="mb-4 text-xl font-semibold leading-none text-gray-900 dark:text-white">
                    Additional Information
                  </h2>
                  <div className="grid gap-4 mb-4 md:gap-6 md:grid-cols-2 sm:mb-8">
                    <div>
                      <Label
                        htmlFor="country"
                        className="block mb-2 dark:text-white"
                      >
                        Country
                      </Label>
                      <Select id="country" name="country">
                        <option selected>United States</option>
                        <option value="NO">Australia</option>
                        <option value="NO">United Kingdom</option>
                        <option value="NO">Italy</option>
                        <option value="NO">Germany</option>
                        <option value="NO">Spain</option>
                        <option value="NO">France</option>
                        <option value="NO">Canada</option>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="city"
                        className="block mb-2 dark:text-white"
                      >
                        City
                      </Label>
                      <Select id="city" name="city">
                        <option selected>San Francisco</option>
                        <option value="WA">Washington</option>
                        <option value="NW">New York</option>
                        <option value="SA">Sacramento</option>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="address"
                        className="block mb-2 dark:text-white"
                      >
                        Address
                      </Label>
                      <TextInput
                        id="adress"
                        name="address"
                        placeholder="Your Location"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="zip"
                        className="block mb-2 dark:text-white"
                      >
                        ZIP
                      </Label>
                      <TextInput
                        id="zip"
                        name="zip"
                        placeholder="Your Location"
                        required
                        type="number"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="timezone"
                        className="block mb-2 dark:text-white"
                      >
                        Timezone
                      </Label>
                      <TextInput
                        id="timezone"
                        name="timezone"
                        placeholder="e.g GMT -6"
                        required
                        type="text"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="phone-number"
                        className="block mb-2 dark:text-white"
                      >
                        Phone Number
                      </Label>
                      <TextInput
                        id="phone-number"
                        name="phone-number"
                        placeholder="Add a phone number"
                        required
                        type="number"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="linkedin"
                        className="block mb-2 dark:text-white"
                      >
                        Linkedin URL
                      </Label>
                      <TextInput
                        id="linkedin"
                        name="linkedin"
                        placeholder="Linkedin URL"
                        required
                        type="url"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="facebook"
                        className="block mb-2 dark:text-white"
                      >
                        Facebook
                      </Label>
                      <TextInput
                        id="facebook"
                        name="facebook"
                        placeholder="Facebook Profile"
                        required
                        type="url"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="github"
                        className="block mb-2 dark:text-white"
                      >
                        Github
                      </Label>
                      <TextInput
                        id="github"
                        name="github"
                        placeholder="Github Username"
                        required
                        type="url"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="dribbble"
                        className="block mb-2 dark:text-white"
                      >
                        Dribbble
                      </Label>
                      <TextInput
                        id="dribbble"
                        name="dribbble"
                        placeholder="Dribbble Username"
                        required
                        type="url"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="instagram"
                        className="block mb-2 dark:text-white"
                      >
                        Instagram
                      </Label>
                      <TextInput
                        id="instagram"
                        name="instagram"
                        placeholder="Instagram Username"
                        required
                        type="url"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="personal-website"
                        className="block mb-2 dark:text-white"
                      >
                        Personal Website
                      </Label>
                      <TextInput
                        id="personal-website"
                        name="personal-website"
                        placeholder="http://www.example.com"
                        required
                        type="url"
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}

export default Page;
