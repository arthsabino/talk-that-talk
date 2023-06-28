import { FC, ReactElement } from "react";

const Button: FC<{
  type?: "button" | "submit" | "reset" | undefined;
  btnCls?: string;
  onClick?: () => void;
  children: ReactElement | string;
}> = ({ type = "button", btnCls, onClick, children }) => {
  return (
    <button type={type} className={`btn ${btnCls ?? ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
