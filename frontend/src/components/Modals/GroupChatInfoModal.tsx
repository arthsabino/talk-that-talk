import { useLanguage, useUser } from "@/hooks/context";
import { User } from "@/models";
import { API_URL } from "@/util/Consts";
import { fetcher } from "@/util/fetcher";
import { Dispatch, FC, SetStateAction, useState } from "react";
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
  const { chats: chatStr, placeholders } = useLanguage();
  const { val: user } = useUser();
  const [chatName, setChatName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<OptionProps[]>([]);
  const [loading, setLoading] = useState(false);

  // const { storeInfo } = useUserInfo();

  const debounce = <Params extends any[]>(
    cb: (...args: Params) => any,
    d: number
  ): ((...args: Params) => void) => {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;
    return function (...args: Params) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => cb(...args), d);
    };
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
      bodyCls="flex flex-col gap-4 w-full"
    >
      {loading ? <LoadingView show={loading} /> : null}
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
        onSelect={(n: OptionProps[]) => {
          setSelected(n);
        }}
        selected={selected}
        setSelected={setSelected}
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
        create
      </Button>
    </Modal>
  );
};
