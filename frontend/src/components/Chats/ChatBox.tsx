import { useChat, useLanguage, useUser } from "@/hooks/context";
import { useUserInfo } from "@/hooks/user";
import { Chat, Message, User } from "@/models";
import { API_URL } from "@/util/Consts";
import svgs from "@/util/Images";
import { getChatName, getOtherUser } from "@/util/chat";
import axios, { AxiosError } from "axios";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { Socket, io } from "socket.io-client";
import Card from "../Card";
import TextInput from "../FormElements/TextInput";
import { GroupChatInfoModal } from "../Modals/GroupChatInfoModal";
import { ProfileModal } from "../Modals/ProfileModal";
import LoadingView from "../Utility/LoadingView";
import TypingAnimation from "../Utility/TypingAnimation";
import MessageItem from "./MessageItem";

let socket: Socket, currentChatCmp: Chat;
const ChatBox: FC<{ loadChat: boolean }> = ({ loadChat }) => {
  const { chats: chatStr, placeholders } = useLanguage();
  const { val: user } = useUser();
  const {
    val: currentChat,
    setVal: setCurrentChat,
  }: { val: Chat | null; setVal: Dispatch<SetStateAction<Chat | null>> } =
    useChat();
  const [showIndivModal, setShowIndivModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [otherUser, setOtherUser] = useState<User | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [msg, setMsg] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const { storeInfo } = useUserInfo();
  const chatName = useMemo(() => {
    if (user && currentChat) return getChatName(user._id, currentChat);
  }, [user, currentChat]);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL.message}/${currentChat?._id}`,
        {},
        {
          headers: {
            Authorization:
              storeInfo && storeInfo?._id ? "Bearer " + storeInfo.token : "",
          },
        }
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", currentChat?._id);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    }
  }, [currentChat?._id, storeInfo]);
  const handleSendMessage = async (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && msg) {
      socket.emit("stop typing", currentChat?._id);
      setMsg("");
      try {
        const { data } = await axios.post(
          API_URL.message,
          {
            content: msg,
            chatId: currentChat?._id,
          },
          {
            headers: {
              Authorization:
                storeInfo && storeInfo?._id ? "Bearer " + storeInfo.token : "",
            },
          }
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
        }
      }
    }
  };
  const handleTypeMessage = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setMsg(e.target.value);

    if (!socketConnected) {
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit("typing", currentChat?._id);
    }

    let lastTypingTime = new Date().getTime();
    var timeLen = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timeLen && typing) {
        socket.emit("stopTyping", currentChat?._id);
        setTyping(false);
      }
    }, timeLen);
  };

  useEffect(() => {
    if (user) {
      const endpoint = process.env.REACT_APP_ENDPOINT || "";
      socket = io(endpoint);
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }
  }, [user]);

  useEffect(() => {
    if (currentChat && storeInfo && fetchMessages) {
      fetchMessages();
      currentChatCmp = currentChat;
    }
  }, [currentChat, fetchMessages, storeInfo]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !currentChatCmp ||
        currentChatCmp._id !== newMessageReceived.chat._id
      ) {
        //notify
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });
  return (
    <>
      <Card
        containerCls={`chat-content-container relative ${
          currentChat ? "active" : ""
        }`}
      >
        <LoadingView show={loadChat} />
        {currentChat ? (
          <>
            <div className="chat-content-header">
              <span className="arrow" onClick={() => setCurrentChat(null)}>
                {svgs.arrow_left}
              </span>
              <h2>{chatName}</h2>
              <span
                className="eye"
                onClick={() => {
                  if (currentChat.isGroupChat) {
                    setShowGroupModal(true);
                  } else {
                    setOtherUser(getOtherUser(user._id, currentChat));
                    setShowIndivModal(true);
                  }
                }}
              >
                {svgs.eye}
              </span>
            </div>
            <Card containerCls="chat-content">
              <div className="message-list-container">
                <LoadingView show={loading} />
                {messages.length > 0 ? (
                  <>
                    {messages.map((m, index) => (
                      <MessageItem key={index} msg={m} />
                    ))}
                  </>
                ) : (
                  <div className="no-messages">{chatStr.type_new_message}</div>
                )}
              </div>
              {isTyping ? <TypingAnimation /> : <></>}
              <TextInput
                input={{
                  value: msg,
                  onChange: (e) => handleTypeMessage(e),
                  onKeyDown: (e) => handleSendMessage(e),
                  placeholder: placeholders[2],
                }}
                inputCls="square chat-input"
                containerCls="w-full mt-auto"
              />
            </Card>
          </>
        ) : (
          <div className="no-chat-content">
            <span className="arrow">{svgs.arrow_left}</span>
            {chatStr.select_chat}
          </div>
        )}
      </Card>
      <ProfileModal
        show={showIndivModal}
        setShow={setShowIndivModal}
        name={otherUser && otherUser.name ? otherUser?.name : ""}
        imgSrc={otherUser?.picture ? otherUser?.picture : ""}
        email={otherUser?.email ? otherUser?.email : ""}
      />
      <GroupChatInfoModal show={showGroupModal} setShow={setShowGroupModal} />
    </>
  );
};

export default ChatBox;
