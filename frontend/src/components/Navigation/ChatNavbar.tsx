import { useLanguage } from "@/hooks/context";
import svgs from "@/util/Images";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { ProfileModal } from "../Modals/ProfileModal";

const ChatNavbar: FC<{ setShow: Dispatch<SetStateAction<boolean>> }> = ({
  setShow,
}) => {
  const {
    app_name,
    chats: { user_dropdown },
  } = useLanguage();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history("/");
  };
  return (
    <nav className="chat-navbar">
      <div className="main-container nav-container chat-container">
        <Button
          btnCls="btn--search"
          onClick={() => {
            setShow(true);
          }}
        >
          <span>{svgs.search}</span>
        </Button>
        <div className="header">
          <span>{app_name}</span>
        </div>
        <div className="account-options">
          <span>{svgs.notification}</span>
          <div className="relative">
            <span onClick={() => setShowUserDropdown((prev) => !prev)}>
              {svgs.user}
            </span>
            {showUserDropdown && (
              <div className="user-dropdown">
                <ul className="user-dropdown-list">
                  <li
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    {user_dropdown[0]}
                  </li>
                  <li onClick={logoutHandler}>{user_dropdown[1]}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProfileModal show={showModal} setShow={setShowModal} />
    </nav>
  );
};

export default ChatNavbar;
