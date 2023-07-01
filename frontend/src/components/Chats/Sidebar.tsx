import { useLanguage } from "@/hooks/context";
import { Dispatch, FC, SetStateAction } from "react";
import Button from "../Button";
import TextInput from "../FormElements/TextInput";

const Sidebar: FC<{ setShow: Dispatch<SetStateAction<boolean>> }> = ({
  setShow,
}) => {
  const { chats: chatStr } = useLanguage();
  return (
    <aside>
      <div className="aside-overlay" />
      <div className="sidebar">
        <span className="header">{chatStr.search_user}</span>
        <Button
          btnCls="btn--cross"
          onClick={() => {
            setShow(false);
          }}
        >
          X
        </Button>
        <TextInput input={{ placeholder: chatStr.enter_here }} />
      </div>
    </aside>
  );
};

export default Sidebar;
