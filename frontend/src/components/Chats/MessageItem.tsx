import { useUserInfo } from "@/hooks/user";
import { Message } from "@/models";
import { FC, RefObject } from "react";

const MessageItem: FC<{
  msg: Message;
  wrapperRef?: RefObject<HTMLDivElement> | null;
}> = ({ msg, wrapperRef }) => {
  const { storeInfo } = useUserInfo();
  return (
    <div
      ref={wrapperRef}
      className={`message-item ${
        storeInfo?._id === msg.sender._id ? "self" : ""
      }`}
    >
      <img src={msg.sender.picture} alt={msg.sender.name} />
      <p>{msg.content}</p>
    </div>
  );
};

export default MessageItem;
