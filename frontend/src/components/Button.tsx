import { ReactElement } from "react";

const Button = ({
  btnCls,
  onClick,
  children,
}: {
  btnCls?: string;
  onClick?: () => void;
  children: ReactElement | string;
}) => {
  return (
    <button className={`btn ${btnCls ?? ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
