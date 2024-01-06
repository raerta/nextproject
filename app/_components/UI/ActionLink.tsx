import React, { HTMLProps } from "react";
import Link from "next/link";
import classNames from "classnames";

interface ILinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ActionLink = ({
  href,
  children,
  className,
}: ILinkProps & HTMLProps<HTMLAnchorElement>) => {
  return (
    <Link
      href={href}
      passHref={true}
      className={classNames(
        className,
        "bg-indigo-600 p-2 w-max rounded-lg font-semibold text-white"
      )}
    >
      {children}
    </Link>
  );
};

export default ActionLink;
