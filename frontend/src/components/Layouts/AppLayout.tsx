import { FC, ReactElement } from "react";

const AppLayout: FC<{ extraCls?: string; children: ReactElement }> = ({
  extraCls,
  children,
}) => {
  return (
    <div className={`main-container content-container ${extraCls ?? ""}`}>
      {children}
    </div>
  );
};

export default AppLayout;
