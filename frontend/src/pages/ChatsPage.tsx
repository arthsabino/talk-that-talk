/* eslint-disable react-hooks/exhaustive-deps */
import Card from "@/components/Card";
import ChatList from "@/components/Chats/ChatList";
import Sidebar from "@/components/Chats/Sidebar";
import AppLayout from "@/components/Layouts/AppLayout";
import ChatNavbar from "@/components/Navigation/ChatNavbar";
import LoadingView from "@/components/Utility/LoadingView";
import { useChat, useUser } from "@/hooks/context";
import { Chat } from "@/models";
import { API_URL } from "@/util/Consts";
import { getChatName } from "@/util/chat";
import { fetcher } from "@/util/fetcher";
import { useEffect, useMemo, useState } from "react";
const ChatsPage = () => {
  const { val: user } = useUser();
  const { val: currentChat } = useChat();
  const [chats, setChats] = useState<Chat[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loadChat, setLoadChat] = useState(false);
  const chatName = useMemo(() => {
    return getChatName(user._id, currentChat);
  }, [currentChat]);
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
      <ChatNavbar setShow={setShowSidebar} />
      <Sidebar
        show={showSidebar}
        setShow={setShowSidebar}
        setLoadChat={setLoadChat}
      />
      {user && <ChatList chats={chats} />}
      <Card containerCls="chat-content-container relative">
        <LoadingView show={loadChat} />
        <div className="chat-content-header">
          <h2>{chatName}</h2>
          <span>awd</span>
        </div>
        <Card containerCls="chat-content">awd</Card>
      </Card>
    </AppLayout>
  );
};

export default ChatsPage;
