import React from "react";
import DialogButton from "../UI/DialogButton";
import { closeModal } from "@/lib/features/modal/modalSlice";
import { useAppDispatch } from "@/lib/hooks";

interface IProps {
  text: string;
  handler: () => void;
}

const AproveModal = ({ text, handler }: IProps) => {
  const dispatch = useAppDispatch()
  return (
    <div className="flex w-ful h-full justify-center items-center">
      <div className="bg-white p-6 flex flex-col gap-y-5 rounded-lg">
        <p>{text}</p>
        <div className="flex gap-3">
          <DialogButton handler={handler}>Confirm</DialogButton>
          <DialogButton handler={()=> dispatch(closeModal())}>Cancel</DialogButton>
        </div>
      </div>
    </div>
  );
};

export default AproveModal;
