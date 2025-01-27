import { PropsWithChildren, FC } from "react";

const TableBody: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default TableBody;
