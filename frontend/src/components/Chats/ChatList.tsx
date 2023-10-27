import { useChat, useChatList, useLanguage } from "@/hooks/context";
import { useUserInfo } from "@/hooks/user";
import svgs from "@/lib/Images";
import { getChatName } from "@/lib/chat";
import { Chat } from "@/models";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "../Button";
import Card from "../Card";
import { NewGroupModal } from "../Modals/NewGroupModal";

interface ChatListProps {
  setShow: Dispatch<SetStateAction<boolean>>;
}
export default function ChatList({ setShow: setSidebarShow }: ChatListProps) {
  const { val: chats } = useChatList();
  const { storeInfo } = useUserInfo();
  const { chats: chatStr } = useLanguage();
  const { val: currentChat, setVal: setCurrentChat } = useChat();
  const [show, setShow] = useState(false);
  return (
    <>
      <Card
        containerCls={`chat-list-container ${
          !currentChat ? "w-full active" : ""
        }`}
      >
        <div className="chat-list-header">
          <h2>{chatStr.my_chats}</h2>
          {/* <Button
            btnCls="btn--create-group"
            onClick={() => {
              setShow(true);
            }}
          >
            {chatStr.add_group}
          </Button> */}
        </div>

        {chats && chats.length > 0 ? (
          <div className="chat-list-content">
            {chats.map((chat: Chat) => {
              return (
                <div
                  key={chat?._id}
                  className={`result-item chat-list-item ${
                    chat?._id === currentChat?._id ? "active" : ""
                  }`}
                  onClick={() => {
                    if (chat?._id !== currentChat?._id) setCurrentChat(chat);
                  }}
                >
                  <div className="info">
                    <span>{getChatName(storeInfo?._id as string, chat)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-chat-content chat-list">
            {chatStr.no_chat[0]}
            <Button
              btnCls="btn--search"
              onClick={() => {
                setSidebarShow(true);
              }}
            >
              <span>{svgs.search}</span>
            </Button>
            {chatStr.no_chat[1]}
          </div>
        )}
      </Card>
      <NewGroupModal show={show} setShow={setShow} />
    </>
  );
}

export const AddedNameItem: FC<{ name: string; onRemove: () => void }> = ({
  name,
  onRemove,
}) => {
  return (
    <div className="added-name-item">
      {name}
      <span className="cross" onClick={onRemove}>
        X
      </span>
    </div>
  );
};
