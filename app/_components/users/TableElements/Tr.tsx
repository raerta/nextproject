import classNames from "classnames";
import React from "react";
import ActionLink from "../../UI/ActionLink";

interface IProps {
  name: string;
  id: string;
  title: string;
  imageUrl: string;
}

const Tr = ({ name, id, title, imageUrl }: IProps) => {
  const femaleTitleList = ["mrs", "ms", "miss"];
  return (
    <tr className="hover:bg-gray-300 border-b border-gray-200 ">
      <td className="px-5 py-5 text-sm">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={imageUrl}
              alt={name}
            />
          </div>
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className={classNames(
                "absolute inset-0 opacity-50 rounded-full",
                {
                  "bg-blue-300": !femaleTitleList.includes(title),
                  "bg-red-300": femaleTitleList.includes(title),
                }
              )}
            ></span>
            <span className="relative capitalize">{title}</span>
          </span>

          <p className="text-gray-900 whitespace-no-wrap">{name}</p>
        </div>
      </td>

      <td className="px-5 py-5 text-sm hidden lg:flex">
        <p className="text-gray-900 leading-9">{id}</p>
      </td>
      <td className="px-5 py-5 text-sm">
        <div className="flex">
          <ActionLink href={"/userdetails?id=" + id}>Details</ActionLink>
        </div>
      </td>
    </tr>
  );
};

export default Tr;
