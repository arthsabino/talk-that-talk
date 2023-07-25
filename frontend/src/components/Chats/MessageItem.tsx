import { useUserInfo } from "@/hooks/user";
import { Message } from "@/models";
import { FC } from "react";

const MessageItem: FC<{ msg: Message }> = ({ msg }) => {
  const { storeInfo } = useUserInfo();
  return (
    <div
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
