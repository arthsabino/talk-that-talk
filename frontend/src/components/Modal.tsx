import { ChildrenElement } from "@/models";
import { Dispatch, FC, SetStateAction } from "react";

const Modal: FC<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  header: string;
  children?: ChildrenElement;
}> = ({ show, setShow, header, children }) => {
  const onClose = () => {
    setShow(false);
  };
  return (
    <div
      className={`modal-container ${show ? "animate-show" : "animate-hide"}`}
    >
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <span>{header}</span>
          <span className="cross" onClick={onClose}>
            X
          </span>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
