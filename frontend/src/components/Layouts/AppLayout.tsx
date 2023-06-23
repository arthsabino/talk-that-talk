import { ReactElement } from "react";

const AppLayout = ({ children }: { children: ReactElement }) => {
  return <div className="main-container content-container">{children}</div>;
};

export default AppLayout;
