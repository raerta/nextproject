"use client";

import React, { useEffect, useReducer } from "react";
import { resetState, updateUsers } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Form from "@components/Form/Form";
import Input from "@components/Form/Input";
import { openModal } from "@/lib/features/modal/modalSlice";
import { useSearchParams } from "next/navigation";

export interface IForm {
  firstName: string;
  lastName: string;
  id: string;
}

const UpdateUser = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { userUpdated } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const initialForm: IForm = {
    firstName: "",
    lastName: "",
    id: id || "",
  };

  const [state, dispatcher] = useReducer(
    (state: IForm, updates: any) => ({ ...state, ...updates }),
    initialForm
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatcher({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUsers(state));
  };

  useEffect(() => {
    if (userUpdated) {
      dispatch(
        openModal({ modalText: "User Updated", modalType: "infoModal" })
      );
    }
    return () => {
      dispatch(resetState());
    };
  }, [userUpdated, dispatch]);

  return (
    <div className="max-w-md w-full space-y-8 p-10 mt-10 bg-white rounded-xl shadow-lg z-10 mx-auto">
      <div className="grid  gap-8 grid-cols-1">
        <div className="flex flex-col ">
          <div className="flex flex-col sm:flex-row items-center">
            <h2 className="font-semibold text-lg mr-auto">Update User</h2>
            <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
          </div>
          <div className="mt-5 flex w-full justify-center">
            <Form handleSubmit={handleSubmit}>
              <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label className="font-semibold text-gray-600 py-2">
                    First Name <abbr title="required">*</abbr>
                  </label>
                  <Input
                    handleChange={handleChange}
                    name="firstName"
                    type="text"
                    value={state.firstName}
                    placeHolder="Your First Name"
                    required={true}
                  />
                </div>
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label className="font-semibold text-gray-600 py-2">
                    Last Name <abbr title="required">*</abbr>
                  </label>
                  <Input
                    handleChange={handleChange}
                    name="lastName"
                    type="text"
                    value={state.lastName}
                    placeHolder="Your Last Name"
                    required={true}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
