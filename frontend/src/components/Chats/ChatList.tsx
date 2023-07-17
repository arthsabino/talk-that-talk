import { useChat, useChatList, useLanguage, useUser } from "@/hooks/context";
import { useUserInfo } from "@/hooks/user";
import { getChatName } from "@/util/chat";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import Card from "../Card";
import MultiSelectDropdown from "../FormElements/MultiSelectDropdown";
import TextInput from "../FormElements/TextInput";
import Modal from "../Modal";
import LoadingView from "../Utility/LoadingView";

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

const NewGroupModal: FC<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}> = ({ show, setShow }) => {
  const { chats: chatStr, messages, placeholders } = useLanguage();
  const { storeInfo } = useUserInfo();
  const { val: chats } = useChatList();
  const [chatName, setChatName] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatName || selected.length <= 0) {
      toast.error(messages.fill_out_fields);
      return;
    }
    setLoading(true);
  };
  useEffect(() => {
    if (chats && chats.length > 0 && storeInfo && storeInfo?._id) {
      setNames(
        chats.map((chat: any) => getChatName(storeInfo?._id as string, chat))
      );
    }
  }, [chats, storeInfo, storeInfo?._id]);
  return (
    <Modal
      show={show}
      setShow={setShow}
      onClose={() => {
        setSelected([]);
        setChatName("");
      }}
      header={chatStr.create_new_gc}
    >
      {loading ? <LoadingView show={loading} /> : null}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <TextInput
          input={{
            placeholder: placeholders[1],
            value: chatName,
            onChange: (e) => setChatName(e.target.value),
          }}
          containerCls="w-full"
        />
        <MultiSelectDropdown
          options={names}
          onSelect={(n: string[]) => {
            setSelected(n);
          }}
          selected={selected}
          setSelected={setSelected}
          input={{
            placeholder: placeholders[0],
          }}
        />
        <div className="added-name-container">
          {selected.length > 0 ? (
            selected.map((n) => {
              return (
                <AddedNameItem
                  key={n}
                  name={n}
                  onRemove={() =>
                    setSelected((prev) => prev.filter((x) => x !== n))
                  }
                />
              );
            })
          ) : (
            <div className="no-user-selected">{chatStr.no_user_selected}</div>
          )}
        </div>
        <Button type="submit" btnCls="btn--primary">
          create
        </Button>
      </form>
    </Modal>
  );
};

const AddedNameItem: FC<{ name: string; onRemove: () => void }> = ({
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
