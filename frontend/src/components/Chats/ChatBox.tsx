import { useChat, useLanguage, useUser } from "@/hooks/context";
import { User } from "@/models";
import svgs from "@/util/Images";
import { getChatName, getOtherUser } from "@/util/chat";
import { FC, useMemo, useState } from "react";
import Card from "../Card";
import { ProfileModal } from "../Modals/ProfileModal";
import LoadingView from "../Utility/LoadingView";

const ChatBox: FC<{ loadChat: boolean }> = ({ loadChat }) => {
  const { chats: chatStr } = useLanguage();
  const { val: user } = useUser();
  const { val: currentChat, setVal: setCurrentChat } = useChat();
  const [showModal, setShowModal] = useState(false);
  const [otherUser, setOtherUser] = useState<User | undefined>(undefined);
  // const [loading, setLoading] = useState(false);
  const chatName = useMemo(() => {
    if (user && currentChat) return getChatName(user._id, currentChat);
  }, [user, currentChat]);
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
              {!currentChat.isGroupChat && (
                <span
                  className="eye"
                  onClick={() => {
                    setOtherUser(getOtherUser(user._id, currentChat));
                    setShowModal(true);
                  }}
                >
                  {svgs.eye}
                </span>
              )}
            </div>
            <Card containerCls="chat-content">awd</Card>
          </>
        ) : (
          <div className="no-chat-content">
            <span className="arrow">{svgs.arrow_left}</span>
            {chatStr.select_chat}
          </div>
        )}
      </Card>
      <ProfileModal
        show={showModal}
        setShow={setShowModal}
        name={otherUser && otherUser.name ? otherUser?.name : ""}
        imgSrc={otherUser?.picture ? otherUser?.picture : ""}
        email={otherUser?.email ? otherUser?.email : ""}
      />
    </>
  );
};

export default ChatBox;
