'use client';

import { Card } from "@/app/components/card";

const HomePage = () => {
  return (
    <div className="px-4 pt-6">
      <div className="grid grid-cols-1 gap-6 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-4">
        <Card>
          <div className="flex items-center">
            <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg shadow-md shadow-gray-300">
              <i className="ni ni-money-coins text-lg" aria-hidden="true"></i>
            </div>
            <div className="flex-shrink-0 ml-3">
              <span className="text-2xl font-bold leading-none text-gray-900">
                $3,600
              </span>
              <h3 className="text-base font-normal text-gray-500">
                {"Today's Money"}
              </h3>
            </div>
            <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500">
              +16%
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
