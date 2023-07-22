import { ChildrenElement } from "@/models";
import { Dispatch, FC, SetStateAction } from "react";

const Modal: FC<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  header: string;
  children?: ChildrenElement;
  bodyCls?: string;
  contentCls?: string;
  onClose?: () => void;
}> = ({ show, setShow, header, bodyCls, contentCls, onClose, children }) => {
  const onCloseModal = () => {
    onClose?.();
    setShow(false);
  };
  return (
    <div
      className={`modal-container ${show ? "animate-show" : "animate-hide"}`}
    >
      <div className="modal-overlay" onClick={onCloseModal} />
      <div className={`modal-content ${contentCls ?? ""}`}>
        <div className="modal-header">
          <span>{header}</span>
          <span className="cross" onClick={onCloseModal}>
            X
          </span>
        </div>
        <div className={`modal-body ${bodyCls ?? ""}`}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
