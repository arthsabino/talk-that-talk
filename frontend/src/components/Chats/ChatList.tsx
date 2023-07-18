import { useChat, useChatList, useLanguage, useUser } from "@/hooks/context";
import { getChatName } from "@/util/chat";
import { FC, useState } from "react";
import Button from "../Button";
import Card from "../Card";
import { NewGroupModal } from "../Modals/NewGroupModal";

const ChatList: FC = () => {
  const { val: chats } = useChatList();
  const { val: user } = useUser();
  const { chats: chatStr } = useLanguage();
  const { val: chat } = useChat();
  const [show, setShow] = useState(false);
  return (
    <>
      <Card containerCls={`chat-list-container ${!chat ? "w-full" : ""}`}>
        <div className="chat-list-header">
          <h2>{chatStr.my_chats}</h2>
          <Button
            btnCls="btn--create-group"
            onClick={() => {
              setShow(true);
            }}
          >
            {chatStr.add_group}
          </Button>
        </div>
        <div className="chat-list-content">
          {chats &&
            chats.map((chat: any) => {
              return (
                <div key={chat._id} className="result-item chat-list-item">
                  <div className="info">
                    <span>{getChatName(user._id, chat)}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
      <NewGroupModal show={show} setShow={setShow} />
    </>
  );
};

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

export default ChatList;
