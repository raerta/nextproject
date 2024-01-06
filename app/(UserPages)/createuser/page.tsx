"use client";

import React, { useEffect, useReducer } from "react";
import { addUser, resetState } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Form from "@components/Form/Form";
import Input from "@components/Form/Input";
import { openModal } from "@/lib/features/modal/modalSlice";

export interface IForm {
  email: string;
  firstName: string;
  lastName: string;
}

const CreateUser = () => {
  const { userAdded } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const initialForm: IForm = {
    email: "",
    firstName: "",
    lastName: "",
  };

  const [state, dispatcher] = useReducer(
    (state: IForm, updates: any) => ({ ...state, ...updates }),
    initialForm
  );
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatcher({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addUser(state));
  };

  useEffect(() => {
    if (userAdded) {
      dispatch(openModal({ modalText: "User Added", modalType: "infoModal" }));
    }
    return () => {
      dispatch(resetState());
    };
  }, [userAdded, dispatch]);

  return (
    <div className="max-w-md w-full space-y-8 p-10 mt-10 bg-white rounded-xl shadow-lg z-10 mx-auto">
      <div className="grid  gap-8 grid-cols-1">
        <div className="flex flex-col ">
          <div className="flex flex-col sm:flex-row items-center">
            <h2 className="font-semibold text-lg mr-auto">Create User</h2>
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
              <div className="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">
                  E-Mail <abbr title="required">*</abbr>
                </label>
                <Input
                  handleChange={handleChange}
                  name="email"
                  type="email"
                  value={state.email}
                  placeHolder="Your Email"
                  required={true}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
