import React from "react";

interface IProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  type: string;
  name: string;
  placeHolder: string;
  required: boolean;
}

const Input = ({
  handleChange,
  value,
  type,
  name,
  placeHolder,
  required,
}: IProps) => {
  return (
    <input
      onChange={handleChange}
      value={value}
      placeholder={placeHolder}
      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 outline-none focus:ring-2 ring-indigo-600 p-4"
      required={required}
      type={type}
      name={name}
    />
  );
};

export default Input;
