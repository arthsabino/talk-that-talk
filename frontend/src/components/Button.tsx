import { ChildrenElement } from "@/models";
import { FC } from "react";

const Button: FC<{
  type?: "button" | "submit" | "reset" | undefined;
  btnCls?: string;
  onClick?: () => void;
  children?: ChildrenElement | string;
}> = ({ type = "button", btnCls, onClick, children }) => {
  return (
    <button type={type} className={`btn ${btnCls ?? ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
