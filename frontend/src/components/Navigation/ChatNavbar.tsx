import svgs from "@/util/Images";
import { Dispatch, FC, SetStateAction } from "react";
import Button from "../Button";

const ChatNavbar: FC<{ setShow: Dispatch<SetStateAction<boolean>> }> = ({
  setShow,
}) => {
  return (
    <nav className="chat-navbar">
      <div className="main-container nav-container">
        <Button
          btnCls="btn--search"
          onClick={() => {
            setShow(true);
          }}
        >
          <span>{svgs.search}</span>
        </Button>
      </div>
    </nav>
  );
};

export default ChatNavbar;
