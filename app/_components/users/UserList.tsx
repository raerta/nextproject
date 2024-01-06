"use client";

import { SetStateAction, useState } from "react";
import UserTable from "./UserTable";
import Link from "next/link";

export default function UserList() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="w-full pl-3 2xl:pl-0">
      <div className="flex flex-wrap items-center xl:justify-between pb-6 gap-y-6 gap-x-2 justify-center">
        <div className="flex items-center justify-between flex-1 gap-x-4">
          <h2 className="text-gray-600 font-semibold">User List</h2>
          <div className="flex bg-gray-50 items-center p-2 rounded-md flex-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="bg-gray-50 outline-none ml-1 block flex-1"
              type="text"
              name=""
              id=""
              value={searchQuery}
              onChange={handleSearch}
              placeholder="search..."
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-y-4 pr-3">
          <div className="space-x-8">
            <Link href={"/createuser"} className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
              Create
            </Link>
          </div>
        </div>
      </div>
      <UserTable searchQuery={searchQuery} />
    </div>
  );
}
