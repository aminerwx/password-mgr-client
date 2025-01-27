import { FC, useState } from "react";
import TableRow from "./TableRow";
import { PropsWithChildren } from "react";

const TableHeader: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <>
      <div {...props}>{children}</div>
    </>
  );
};

export default TableHeader;
