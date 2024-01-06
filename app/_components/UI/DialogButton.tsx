import React from "react";

interface IProps {
  handler: () => void;
  children: React.ReactNode;
}

const DialogButton = ({ handler, children }: IProps) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handler();
      }}
      className="bg-indigo-500 text-white px-3 py-2 rounded-lg"
    >
      {children}
    </button>
  );
};

export default DialogButton;
