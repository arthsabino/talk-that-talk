import { useLanguage } from "@/hooks/context";
import { useUserInfo } from "@/hooks/user";
import svgs from "@/lib/Images";
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
  const { storeInfo } = useUserInfo();
  // const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history("/");
  };

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       const data = await fetcher(API_URL.notification, storeInfo?.token);
  //       setNotifications(data);
  //     } catch (error) {
  //       if (error instanceof AxiosError) {
  //         toast.error(error?.response?.data?.message);
  //       }
  //     }
  //   };

  //   if (storeInfo) {
  //     fetchChats();
  //   }
  // }, [storeInfo]);
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
          {/* <div className="relative">
            {!showNotifDropdown ? (
              <div className="notif-num">
                {notifications && notifications.length > 0
                  ? notifications.filter((n) => !n.isRead).length
                  : 0}
              </div>
            ) : null}
            <span
              onClick={() => setShowNotifDropdown((prev) => !prev)}
              className={`${showNotifDropdown ? "active" : ""}`}
            >
              {svgs.notification}
            </span>
            {showNotifDropdown && (
              <div className="user-dropdown notification">
                <ul className="user-dropdown-list">
                  {notifications && notifications.length > 0
                    ? notifications.map((notif) => (
                        <li key={notif?._id} className="notif-item">
                          <span
                            className={`name ${notif?.isRead ? "is-read" : ""}`}
                          >
                            {notif?.message.sender.name}
                          </span>
                          <span className="preview">
                            {notif?.content.length > 30
                              ? `${notif.content.substring(0, 30)}...`
                              : notif.content}
                          </span>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            )}
          </div> */}
          <div className="relative">
            <span
              onClick={() => setShowUserDropdown((prev) => !prev)}
              className={`${showUserDropdown ? "active" : ""}`}
            >
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
      <ProfileModal
        show={showModal}
        setShow={setShowModal}
        name={storeInfo && storeInfo.name ? storeInfo?.name : ""}
        imgSrc={storeInfo?.picture ? storeInfo?.picture : ""}
        email={storeInfo?.email ? storeInfo?.email : ""}
      />
    </nav>
  );
};

export default ChatNavbar;
