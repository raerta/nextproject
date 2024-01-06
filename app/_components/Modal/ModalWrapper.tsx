"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AproveModal from "./AproveModal";
import {
  closeModal,
  deletePostById,
  deleteUserById,
} from "@/lib/features/modal/modalSlice";
import InfoModal from "./InfoModal";
import { resetState } from "@/lib/features/user/userSlice";

const ModalWrapper = () => {
  const { modalIsOpen, modalText, modalType, data } = useAppSelector(
    (state) => state.modalSlice
  );
  const { success } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDeleteUser = () => {
    dispatch(deleteUserById(data));
    dispatch(closeModal());
    dispatch(resetState());
  };
  const handleDeletePost = () => {
    dispatch(deletePostById(data));
    dispatch(closeModal());
    dispatch(resetState());
  };

  useEffect(() => {
    if (success) {
      router.back();
    }
    return () => {};
  }, [success, router]);

  return modalIsOpen ? (
    <div className="h-screen w-screen bg-black/30 fixed inset-0">
      {modalType === "deleteUser" && (
        <AproveModal handler={handleDeleteUser} text={modalText} />
      )}
      {modalType === "deletePost" && (
        <AproveModal handler={handleDeletePost} text={modalText} />
      )}
      {modalType === "infoModal" && <InfoModal text={modalText} />}
    </div>
  ) : null;
};

export default ModalWrapper;
