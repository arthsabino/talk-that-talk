import { useChatList, useLanguage, useUser } from "@/hooks/context";
import { useUserInfo } from "@/hooks/user";
import { User } from "@/models";
import { API_URL } from "@/util/Consts";
import debounce from "@/util/debounce";
import { fetcher } from "@/util/fetcher";
import axios, { AxiosError } from "axios";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import { AddedNameItem } from "../Chats/ChatList";
import MultiSelectDropdown from "../FormElements/MultiSelectDropdown";
import TextInput from "../FormElements/TextInput";
import { OptionProps } from "../FormElements/props";
import Modal from "../Modal";
import LoadingView from "../Utility/LoadingView";

export const NewGroupModal: FC<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}> = ({ show, setShow }) => {
  const {
    chats: chatStr,
    messages,
    placeholders,
    actions: actStr,
  } = useLanguage();
  const { val: user } = useUser();
  const { setVal: setChats } = useChatList();
  const [chatName, setChatName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<OptionProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { storeInfo } = useUserInfo();

  const handleSelect = (op: OptionProps) => {
    const i = selected.findIndex((x) => x.id === op.id);
    if (i >= 0) {
      setSelected((prev) => prev.filter((x) => x.id !== op.id));
    } else {
      setSelected(Array.from(new Set([...selected, op])));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatName || selected.length <= 1) {
      toast.error(messages.fill_out_fields);
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        API_URL.groupChat,
        {
          chatName,
          userIds: JSON.stringify(selected.map((s) => s.id)),
        },
        {
          headers: {
            Authorization:
              storeInfo && storeInfo?._id ? "Bearer " + storeInfo.token : "",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await fetcher(API_URL.getChats, user.token);
      setChats(data);
      setShow(false);
      toast.success("Successfully created chat!");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };
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
          options={users.map((u: User) => {
            return { id: u._id, text: u.name };
          })}
          onSelect={handleSelect}
          input={{
            placeholder: placeholders[0],
            onChange: (e) => handleSearch(e.target.value),
          }}
        />
        <div className="added-name-container">
          {selected.length > 0 ? (
            selected.map((n) => {
              return (
                <AddedNameItem
                  key={n.id}
                  name={n.text}
                  onRemove={() =>
                    setSelected((prev) => prev.filter((x) => x.id !== n.id))
                  }
                />
              );
            })
          ) : (
            <div className="no-user-selected">{chatStr.no_user_selected}</div>
          )}
        </div>
        <Button type="submit" btnCls="btn--primary">
          {actStr[0]}
        </Button>
      </form>
    </Modal>
  );
};
