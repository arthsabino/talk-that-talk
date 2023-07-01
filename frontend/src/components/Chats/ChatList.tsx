import { Chat } from "@/models";
import { FC } from "react";
import Card from "../Card";

const ChatList: FC<{ chats: Chat[] }> = ({ chats }) => {
  return (
    <Card containerCls="chat-list-container">
      {chats &&
        chats.map((chat) => {
          return <div key={chat._id}>{chat._id}</div>;
        })}
    </Card>
  );
};

export default ChatList;
