import { useChat, useChatList, useLanguage, useUser } from "@/hooks/context";
import { useUserInfo } from "@/hooks/user";
import { API_URL } from "@/lib/consts";
import debounce from "@/lib/debounce";
import { fetcher } from "@/lib/fetcher";
import { Chat, User } from "@/models";
import axios, { AxiosError } from "axios";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import { AddedNameItem } from "../Chats/ChatList";
import MultiSelectDropdown from "../FormElements/MultiSelectDropdown";
import TextInput from "../FormElements/TextInput";
import { OptionProps } from "../FormElements/props";
import Modal from "../Modal";
import LoadingView from "../Utility/LoadingView";

export const GroupChatInfoModal: FC<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}> = ({ show, setShow }) => {
  const {
    chats: chatStr,
    placeholders,
    messages,
    actions: actStr,
  } = useLanguage();
  const { val: user } = useUser();
  const { setVal: setChats } = useChatList();
  const {
    val: chat,
    setVal: setChat,
  }: { val: Chat; setVal: Dispatch<SetStateAction<Chat>> } = useChat();
  const [chatName, setChatName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<OptionProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { storeInfo } = useUserInfo();

  const handleSearch = debounce(async (search: string) => {
    try {
      setLoading(true);
      const data = await fetcher(
        `${API_URL.searchUser}?search=${search}`,
        user.token
      );
      if (data && data.length > 0) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured");
    } finally {
      setLoading(false);
    }
  }, 1000);

  const handleChatName = async () => {
    if (!chatName) {
      toast.warning(messages.fill_out_fields);
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.put(
        API_URL.renameGroupChat,
        {
          chatId: chat._id,
          chatName,
        },
        {
          headers: {
            Authorization:
              storeInfo && storeInfo?._id ? "Bearer " + storeInfo.token : "",
            "Content-Type": "application/json",
          },
        }
      );
      setChat(data);
      const chatList = await fetcher(API_URL.getChats, user.token);
      setChats(chatList);
      toast.success(messages.chat_name_updated);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (op: OptionProps) => {
    if (chat.users.find((u) => u._id === op.id)) {
      toast.error(messages.user_in_group);
      return;
    }
    if (chat.groupAdmin?._id !== user._id) {
      toast.error(messages.only_admins_add);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.put(
        API_URL.addUser,
        {
          chatId: chat._id,
          userId: op.id,
        },
        {
          headers: {
            Authorization:
              storeInfo && storeInfo?._id ? "Bearer " + storeInfo.token : "",
            "Content-Type": "application/json",
          },
        }
      );
      setChat(data);
      const chatList = await fetcher(API_URL.getChats, user.token);
      setChats(chatList);
      toast.success(messages.user_added);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (op: OptionProps) => {
    if (chat.groupAdmin?._id !== user._id && op.id !== user._id) {
      toast.error(messages.only_admins_remove);
      return
    }
    try {
      setLoading(true);
      const { data } = await axios.put(
        API_URL.removeUser,
        {
          chatId: chat._id,
          userId: op.id,
        },
        {
          headers: {
            Authorization:
              storeInfo && storeInfo?._id ? "Bearer " + storeInfo.token : "",
            "Content-Type": "application/json",
          },
        }
      );
      setChat(data);
      const chatList = await fetcher(API_URL.getChats, user.token);
      setChats(chatList);
      toast.success(messages.user_removed);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chat && show && user) {
      setChatName(chat.chatName);
      setSelected(
        chat.users
          .filter((u: User) => u._id !== user._id)
          .map((c) => {
            return { id: c._id, text: c.name };
          })
      );
    }
  }, [chat, show, user]);
  return (
    <Modal
      show={show}
      setShow={setShow}
      onClose={() => {
        setSelected([]);
        setChatName("");
      }}
      header={chat && chat.chatName ? chat.chatName : ""}
      bodyCls="flex flex-col gap-4 w-full"
      contentCls="lg"
    >
      {loading ? <LoadingView show={loading} /> : null}
      <div className="added-name-container">
        {selected.length > 0 ? (
          selected.map((n) => {
            return (
              <AddedNameItem
                key={n.id}
                name={n.text}
                onRemove={() =>
                  handleRemove(n)
                }
              />
            );
          })
        ) : (
          <div className="no-user-selected">{chatStr.no_user_selected}</div>
        )}
      </div>
      <div className="update-chat-name-container">
        <TextInput
          input={{
            placeholder: placeholders[1],
            value: chatName,
            onChange: (e) => setChatName(e.target.value),
          }}
          containerCls="w-full"
          inputCls="square"
        />
        <Button type="button" btnCls="btn--primary" onClick={handleChatName}>
          {actStr[1]}
        </Button>
      </div>
      <MultiSelectDropdown
        options={users
          .filter((u: User) => u._id !== user._id)
          .map((u: User) => {
            return { id: u._id, text: u.name };
          })}
        onSelect={handleAddUser}
        input={{
          placeholder: placeholders[0],
          onChange: (e) => handleSearch(e.target.value),
        }}
        inputCls="square"
      />
      <Button type="button" btnCls="btn--error">
        {actStr[3]}
      </Button>
    </Modal>
  );
};
