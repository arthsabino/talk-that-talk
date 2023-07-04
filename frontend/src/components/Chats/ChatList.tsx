import { useUser } from "@/hooks/context";
import { Chat } from "@/models";
import { getChatName } from "@/util/chat";
import { FC } from "react";
import Card from "../Card";

const ChatList: FC<{ chats: Chat[] }> = ({ chats }) => {
  const { val: user } = useUser();
  return (
    <Card containerCls="chat-list-container">
      {chats &&
        chats.map((chat) => {
          return <div key={chat._id}>{getChatName(user._id, chat)}</div>;
        })}
    </Card>
  );
};

export default ChatList;
