import { useChat, useLanguage, useUser } from "@/hooks/context";
import { useUserInfo } from "@/hooks/user";
import { Chat } from "@/models";
import { getChatName } from "@/util/chat";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "../Button";
import Card from "../Card";
import TextInput from "../FormElements/TextInput";
import Modal from "../Modal";

const ChatList: FC<{
  chats: Chat[];
  setLoadChat: Dispatch<SetStateAction<boolean>>;
}> = ({ chats, setLoadChat }) => {
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
            chats.map((chat) => {
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

const NewGroupModal: FC<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}> = ({ show, setShow }) => {
  const { storeInfo } = useUserInfo();
  return (
    <Modal
      show={show}
      setShow={setShow}
      header={"Create new group chat"}
      bodyCls="flex flex-col gap-4 w-full"
    >
      <TextInput
        input={{ placeholder: "Enter name here" }}
        containerCls="w-full"
      />
      <TextInput input={{ placeholder: "Members" }} containerCls="w-full" />
    </Modal>
  );
};

export default ChatList;
