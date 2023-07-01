import { ChildrenElement } from "@/models";
import { FC } from "react";

const AppLayout: FC<{
  extraCls?: string;
  children?: ChildrenElement;
}> = ({ extraCls, children }) => {
  return (
    <div className={`main-container content-container ${extraCls ?? ""}`}>
      {children}
    </div>
  );
};

export default AppLayout;
