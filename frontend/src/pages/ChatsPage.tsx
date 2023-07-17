/* eslint-disable react-hooks/exhaustive-deps */
import Card from "@/components/Card";
import ChatList from "@/components/Chats/ChatList";
import Sidebar from "@/components/Chats/Sidebar";
import AppLayout from "@/components/Layouts/AppLayout";
import ChatNavbar from "@/components/Navigation/ChatNavbar";
import LoadingView from "@/components/Utility/LoadingView";
import { useChat, useChatList, useUser } from "@/hooks/context";
import { API_URL } from "@/util/Consts";
import { getChatName } from "@/util/chat";
import { fetcher } from "@/util/fetcher";
import { useEffect, useMemo, useState } from "react";
const ChatsPage = () => {
  const { val: user } = useUser();
  const { val: currentChat } = useChat();
  const { setVal: setChats } = useChatList();
  const [showSidebar, setShowSidebar] = useState(false);
  const [loadChat, setLoadChat] = useState(false);
  const chatName = useMemo(() => {
    if (user && currentChat) return getChatName(user._id, currentChat);
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
    <AppLayout>
      <ChatNavbar setShow={setShowSidebar} />
      <Sidebar
        show={showSidebar}
        setShow={setShowSidebar}
        setLoadChat={setLoadChat}
      />
      <div className="chats-page-container">
        {user && <ChatList />}
        {currentChat && (
          <Card containerCls="chat-content-container relative">
            <LoadingView show={loadChat} />
            <div className="chat-content-header">
              <h2>{chatName}</h2>
              <span>awd</span>
            </div>
            <Card containerCls="chat-content">awd</Card>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default ChatsPage;
