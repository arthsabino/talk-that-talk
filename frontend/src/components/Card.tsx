import { ChildrenElement } from "@/models";

const Card = ({
  containerCls,
  children,
}: {
  containerCls?: string;
  children?: ChildrenElement;
}) => {
  return <div className={`card ${containerCls ?? ""}`}>{children}</div>;
};

export default Card;
