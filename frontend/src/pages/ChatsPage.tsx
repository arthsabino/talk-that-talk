/* eslint-disable react-hooks/exhaustive-deps */
import Card from "@/components/Card";
import ChatList from "@/components/Chats/ChatList";
import AppLayout from "@/components/Layouts/AppLayout";
import { useUser } from "@/hooks/context";
import { Chat } from "@/models";
import { API_URL } from "@/util/Consts";
import { fetcher } from "@/util/fetcher";
import { useEffect, useState } from "react";
const ChatsPage = () => {
  const { val: user } = useUser();
  const [chats, setChats] = useState<Chat[]>([]);
  useEffect(() => {
    const fetchChats = async () => {
      const data = await fetcher(API_URL.getChats, user.token);
      setChats(data);
    };

    if (user) {
      fetchChats();
    }
  }, [user]);
  return (
    <AppLayout extraCls="gap-4 items-start">
      {user && <ChatList chats={chats} />}
      <Card containerCls="chat-content-container">
        <div className="chat-content-header">
          <h2>awd</h2>
          <span>awd</span>
        </div>
        <Card containerCls="chat-content">awd</Card>
      </Card>
    </AppLayout>
  );
};

export default ChatsPage;
