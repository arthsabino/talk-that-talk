import { useChat, useLanguage, useUser } from "@/hooks/context";
import { useUserInfo } from "@/hooks/user";
import { User } from "@/models";
import { API_URL } from "@/util/Consts";
import { fetcher } from "@/util/fetcher";
import axios from "axios";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import TextInput from "../FormElements/TextInput";
import LoadingView from "../Utility/LoadingView";

const Sidebar: FC<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setLoadChat: Dispatch<SetStateAction<boolean>>;
}> = ({ show, setShow, setLoadChat }) => {
  const { val: user } = useUser();
  const { messages } = useLanguage();
  const { chats: chatStr } = useLanguage();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const { setVal } = useChat();
  const { storeInfo } = useUserInfo();
  const accessChat = async (userId: string) => {
    try {
      setLoadChat(true);
      const { data } = await axios.post(
        API_URL.getChats,
        {
          userId,
        },
        {
          headers: {
            Authorization:
              storeInfo && storeInfo?._id ? "Bearer " + storeInfo.token : "",
          },
        }
      );
      setVal(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadChat(false);
    }
  };
  const handleSearch = async () => {
    if (!search) {
      toast.error(messages.fill_out_fields);
      return;
    }

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
  };
  return (
    <aside className={`${show ? "animate-show" : "animate-hide"}`}>
      <div className="aside-overlay" />
      <div className={`sidebar transition-all ${show ? "show" : "hide"}`}>
        <LoadingView show={loading} />
        <span className="header">{chatStr.search_user}</span>
        <Button
          btnCls="btn--cross"
          onClick={() => {
            setShow(false);
          }}
        >
          X
        </Button>
        <TextInput
          input={{
            placeholder: chatStr.enter_here,
            onChange: (e) => setSearch(e.target.value),
            value: search,
          }}
        />
        <Button btnCls="btn--search-user" onClick={handleSearch}>
          Search
        </Button>
        <div className="search-results">
          {users.map((u) => {
            return (
              <SearchResultItem
                key={u._id}
                user={u}
                onClick={() => {
                  accessChat(u._id);
                  setShow(false);
                }}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};

const SearchResultItem: FC<{ user: User; onClick: () => void }> = ({
  user,
  onClick,
}) => {
  return (
    <div className="result-item search-list-item" onClick={onClick}>
      <img src={user.picture} alt="avatar" />
      <div className="info">
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>
    </div>
  );
};

export default Sidebar;
