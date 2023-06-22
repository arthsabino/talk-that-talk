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
    <div>
      {chats.map((chat) => {
        return <div key={chat._id}>{chat.chatName}</div>;
      })}
    </div>
  );
};

export default ChatsPage;
