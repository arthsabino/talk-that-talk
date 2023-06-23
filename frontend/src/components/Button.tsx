import { ReactElement } from "react";

const Button = ({
  btnCls,
  onClick,
  children,
}: {
  btnCls?: string;
  onClick?: () => void;
  children: ReactElement;
}) => {
  return (
    <button className={`btn ${btnCls ?? ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
