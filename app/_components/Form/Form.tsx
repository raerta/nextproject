import React from "react";

interface IProps {
  handleSubmit: any;
  children: React.ReactNode;
}

const Form = ({ handleSubmit, children }: IProps) => {
  return (
    <form onSubmit={handleSubmit}>
      {children}

      <p className="text-xs text-red-500 text-right my-3">
        Required fields are marked with an asterisk{" "}
        <abbr title="Required field">*</abbr>
      </p>
      <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
        <button
          type="submit"
          className="mb-2 md:mb-0 bg-indigo-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;
