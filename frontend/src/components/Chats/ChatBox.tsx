import { useChat, useLanguage, useUser } from "@/hooks/context";
import { User } from "@/models";
import svgs from "@/util/Images";
import { getChatName, getOtherUser } from "@/util/chat";
import { FC, useMemo, useState } from "react";
import Card from "../Card";
import { GroupChatInfoModal } from "../Modals/GroupChatInfoModal";
import { ProfileModal } from "../Modals/ProfileModal";
import LoadingView from "../Utility/LoadingView";

const ChatBox: FC<{ loadChat: boolean }> = ({ loadChat }) => {
  const { chats: chatStr } = useLanguage();
  const { val: user } = useUser();
  const { val: currentChat, setVal: setCurrentChat } = useChat();
  const [showIndivModal, setShowIndivModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
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
        show={showIndivModal}
        setShow={setShowIndivModal}
        name={otherUser && otherUser.name ? otherUser?.name : ""}
        imgSrc={otherUser?.picture ? otherUser?.picture : ""}
        email={otherUser?.email ? otherUser?.email : ""}
      />
      <GroupChatInfoModal show={showGroupModal} setShow={setShowGroupModal}/>
    </>
  );
};

export default ChatBox;
