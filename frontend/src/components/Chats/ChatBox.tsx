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
import Card from "../Card";
import TextInput from "../FormElements/TextInput";
import { GroupChatInfoModal } from "../Modals/GroupChatInfoModal";
import { ProfileModal } from "../Modals/ProfileModal";
import LoadingView from "../Utility/LoadingView";

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
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [msg, setMsg] = useState("");
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
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  }, [currentChat?._id, storeInfo]);
  const handleSendMessage = async (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && msg) {
      setMsg("");
      try {
        await axios.post(
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
        await fetchMessages();
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
  };

  useEffect(() => {
    if (currentChat && storeInfo && fetchMessages) {
      fetchMessages();
    }
  }, [currentChat, fetchMessages, storeInfo]);
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
                {loading ? (
                  <LoadingView show={loading} />
                ) : (
                  <>
                    {messages.map((m, index) => (
                      <span key={index}>{m.content}</span>
                    ))}
                  </>
                )}
              </div>
              <TextInput
                input={{
                  value: msg,
                  onChange: (e) => handleTypeMessage(e),
                  onKeyDown: (e) => handleSendMessage(e),
                  placeholder: placeholders[2],
                }}
                inputCls="square"
                containerCls="w-full"
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
