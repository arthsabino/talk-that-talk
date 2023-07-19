import { Dispatch, FC, SetStateAction } from "react";
import Modal from "../Modal";

export const ProfileModal: FC<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  name: string;
  imgSrc: string;
  email: string;
}> = ({ show, setShow, name, imgSrc, email }) => {
  return (
    <Modal show={show} setShow={setShow} header={name}>
      <img src={imgSrc} alt="avatar" className="avatar" />
      <span className="user-name">{name}</span>
      <span className="email-address">{email}</span>
    </Modal>
  );
};
