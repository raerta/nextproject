"use client";

import { getSingleUserById } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { formatDate } from "@/utils/formatDate";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import DialogButton from "../../_components/UI/DialogButton";
import { openModal } from "@/lib/features/modal/modalSlice";

export default function UserDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { user, loading, error } = useAppSelector((state) => state.users);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSingleUserById(id));
    }
    return () => {};
  }, [id]);

  const handleDeleteUser = () => {
    dispatch(
      openModal({
        modalText: "Are you sure?",
        modalType: "deleteUser",
        data: id,
      })
    );
  };

  const handleUpdateUser = () => {
    router.push(`/updateuser?id=${id}`);
  };
  const handleCreatePost = () => {
    router.push(`/createpost?id=${id}`);
  };

  return loading ? (
    <div>Loading..</div>
  ) : error ? (
    <div>{error.error}</div>
  ) : (
    user && (
      <div className="flex flex-col">
        <div className="md:flex">
          <div className="w-full md:w-2/12 ">
            <div className="bg-white p-3 border-t-4 border-indigo-400">
              <div className="image overflow-hidden">
                <img
                  className="h-28 w-auto mx-auto"
                  src={
                    user.picture ||
                    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                  }
                  alt={user.firstName}
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {user.firstName} {user.lastName}
              </h1>
              {user.registerDate && (
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Register Date</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span className="">{formatDate(user.registerDate)}</span>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="w-full md:w-9/12 mx-2">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-indigo-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">{user.firstName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">{user.lastName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Title</div>
                    <div className="px-4 py-2 capitalize">{user?.title}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">{user?.phone}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Country</div>
                    <div className="px-4 py-2">{user.location?.country}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">State</div>
                    <div className="px-4 py-2">{user.location?.state}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">City</div>
                    <div className="px-4 py-2">{user.location?.city}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Street</div>
                    <div className="px-4 py-2">{user.location?.street}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800 text-xs"
                        href={`mailto:${user.email}`}
                      >
                        {user.email}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    {user.dateOfBirth && (
                      <div className="px-4 py-2">
                        {formatDate(user.dateOfBirth)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mr-6 mt-6">
          <DialogButton handler={handleCreatePost}>Create Post</DialogButton>
          <DialogButton handler={handleDeleteUser}>Delete User</DialogButton>
          <DialogButton handler={handleUpdateUser}>Update User</DialogButton>
        </div>
      </div>
    )
  );
}
