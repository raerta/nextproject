import React, { useEffect, useState } from "react";
import Thead from "./TableElements/Thead";
import Tr from "./TableElements/Tr";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IUser } from "@/consts/types/userTypes";
import { compareString } from "@/utils/sortByName";
import { getUsers } from "@/lib/features/user/userSlice";
import classNames from "classnames";

const UserTable = ({ searchQuery }: { searchQuery: string }) => {
  const limit = 20;
  const [page, setPage] = useState(0);

  const { users, loading, error, success } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers({ limit: limit, page: page }));
    return () => {};
  }, [dispatch, limit, page]);

  const handleFilter = (item: IUser) => {
    const searchTerm = searchQuery.toLowerCase();
    const name = (item.firstName + " " + item.lastName).toLowerCase();

    const titleSearch =
      searchTerm === "mr"
        ? item.title === "mr"
        : item.title.includes(searchTerm);

    return (
      name.includes(searchTerm) ||
      item.id.toLowerCase().includes(searchTerm) ||
      titleSearch
    );
  };

  const filteredUsers = searchQuery.length
    ? users?.data
        .filter(handleFilter)
        .sort((a: IUser, b: IUser) => compareString(a.firstName, b.firstName))
    : users &&
      [...users.data].sort((a: IUser, b: IUser) =>
        compareString(a.firstName, b.firstName)
      );

  const maximumPage = users?.total && Math.floor(users.total / limit);

  const handlePrev = () => {
    if (page === 0) return;
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (page === maximumPage) return;
    setPage((prev) => prev + 1);
  };

  const showingFromItems = page !== 0 ? page * limit : "1";
  const showingToItems = page !== 0 ? (page + 1) * limit : limit;
  const showingItemsMax =
    users?.total && users?.total > showingToItems
      ? showingToItems
      : users?.total;

  return loading ? (
    <div>Loading..</div>
  ) : error?.length ? (
    <div>{error}</div>
  ) : (
    success && (
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <Thead />
          <tbody>
            {filteredUsers?.map((item) => (
              <Tr
                title={item.title}
                id={item.id}
                imageUrl={item.picture}
                name={item.firstName + " " + item.lastName}
                key={item.id}
              />
            ))}
          </tbody>
        </table>
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
          <span className="text-xs xs:text-sm text-gray-900">
            Showing {showingFromItems} to {showingItemsMax} of {users?.total}{" "}
            Entries
          </span>
          <div className="inline-flex gap-2 mt-2 xs:mt-0">
            <button
              disabled={page === 0}
              onClick={handlePrev}
              className={classNames(
                "text-sm text-indigo-50 transition duration-150 font-semibold py-2 px-4 rounded-l",
                { "bg-black": page === 0 },
                { "bg-indigo-600": page !== 0 },
                { "hover:bg-indigo-500": page !== 0 }
              )}
            >
              Prev
            </button>
            <button
              disabled={page === maximumPage}
              onClick={handleNext}
              className={classNames(
                "text-sm text-indigo-50 transition duration-150 font-semibold py-2 px-4 rounded-r",
                { "bg-black": page === maximumPage },
                { "bg-indigo-600": page !== maximumPage },
                { "hover:bg-indigo-500": page !== maximumPage }
              )}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserTable;
