import { ReactElement } from "react";

const Card = ({
  containerCls,
  children,
}: {
  containerCls?: string;
  children: ReactElement;
}) => {
  return <div className={`card ${containerCls ?? ""}`}>{children}</div>;
};

export default Card;
