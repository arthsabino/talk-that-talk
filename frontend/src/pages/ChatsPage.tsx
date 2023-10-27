/* eslint-disable react-hooks/exhaustive-deps */
import ChatBox from "@/components/Chats/ChatBox";
import ChatList from "@/components/Chats/ChatList";
import Sidebar from "@/components/Chats/Sidebar";
import AppLayout from "@/components/Layouts/AppLayout";
import ChatNavbar from "@/components/Navigation/ChatNavbar";
import LoadingView from "@/components/Utility/LoadingView";
import { useChatList } from "@/hooks/context";
import { useUserInfo } from "@/hooks/user";
import { API_URL } from "@/lib/consts";
import { fetcher } from "@/lib/fetcher";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ChatsPage = () => {
  const { storeInfo: user } = useUserInfo();
  const { setVal: setChats } = useChatList();
  const [showSidebar, setShowSidebar] = useState(false);
  const [loadChat, setLoadChat] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const data = await fetcher(API_URL.getChats, user?.token);
        setChats(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [user]);
  return (
    <AppLayout>
      <LoadingView show={loading} />
      <ChatNavbar setShow={setShowSidebar} />
      <Sidebar
        show={showSidebar}
        setShow={setShowSidebar}
        setLoadChat={setLoadChat}
      />
      <div className="chats-page-container">
        {user && (
          <>
            <ChatList setShow={setShowSidebar} />
            <ChatBox loadChat={loadChat} />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default ChatsPage;
