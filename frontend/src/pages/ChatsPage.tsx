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
    <AppLayout extraCls="gap-4">
      <>
        <div className="w-25 bg-secondary-variant-1">
          {chats.map((chat) => {
            return <div key={chat._id}>{chat.chatName}</div>;
          })}
        </div>
        <div className="w-75 bg-secondary">awd</div>
      </>
    </AppLayout>
  );
};

export default ChatsPage;
