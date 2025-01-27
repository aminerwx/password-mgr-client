import { FC, useState } from "react";

import { PropsWithChildren } from "react";
const TableRow: FC<PropsWithChildren> = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="border border-solid p-4">A</div>
        <div className="border border-solid p-4">B</div>
        <div className="border border-solid p-4">C</div>
      </div>
    </>
  );
};

export default TableRow;
