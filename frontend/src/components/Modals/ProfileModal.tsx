import { useUserInfo } from "@/hooks/user";
import { Dispatch, FC, SetStateAction } from "react";
import Modal from "../Modal";

export const ProfileModal: FC<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}> = ({ show, setShow }) => {
  const { storeInfo } = useUserInfo();
  return (
    <Modal
      show={show}
      setShow={setShow}
      header={storeInfo && storeInfo.name ? storeInfo?.name : ""}
    >
      <img
        src={storeInfo?.picture ? storeInfo?.picture : ""}
        alt="avatar"
        className="avatar"
      />
      <span className="user-name">{storeInfo?.name}</span>
      <span className="email-address">{storeInfo?.email}</span>
    </Modal>
  );
};
