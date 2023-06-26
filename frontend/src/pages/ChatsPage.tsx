import Card from "@/components/Card";
import ChatRow from "@/components/Chats/ChatRow";
import AppLayout from "@/components/Layouts/AppLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../Util/Consts";
import { Chats } from "../models";
const ChatsPage = () => {
  const [chats, setChats] = useState<Chats[]>([]);
  const fetchChats = async () => {
    const { data } = await axios.get(API_URL.getChats);
    if (data && data.length > 0) {
      setChats(data);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <AppLayout extraCls="gap-4 items-start">
      <>
        <Card containerCls="chat-list-container">
          <>
            {chats.map((chat) => {
              return <ChatRow name={chat.chatName} preview={chat.chatName} />;
            })}
          </>
        </Card>
        <Card containerCls="chat-content-container">
          <>
            <div className="chat-content-header">
              <h2>awd</h2>
              <span>awd</span>
            </div>
            <Card containerCls="chat-content">
              <>awd</>
            </Card>
          </>
        </Card>
      </>
    </AppLayout>
  );
};

export default ChatsPage;
