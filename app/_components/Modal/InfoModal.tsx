"use client";

import React, { useEffect } from "react";
import DialogButton from "../UI/DialogButton";
import { closeModal } from "@/lib/features/modal/modalSlice";
import { useAppDispatch } from "@/lib/hooks";

interface IProps {
  text: string;
}

const InfoModal = ({ text }: IProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(closeModal());
    }, 2000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  return (
    <div className="flex w-ful h-full justify-center items-center">
      <div className="bg-white p-6 flex flex-col gap-y-5 rounded-lg">
        <p>{text}</p>
        <div className="flex justify-center gap-3">
          <DialogButton handler={() => dispatch(closeModal())}>Ok</DialogButton>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
