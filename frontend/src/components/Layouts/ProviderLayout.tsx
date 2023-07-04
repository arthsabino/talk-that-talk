/* eslint-disable react-hooks/exhaustive-deps */
import { ChatCtx, LanguageCtx, UserCtx, useMemoState } from "@/hooks/context";
import { useUserInfo } from "@/hooks/user";
import { Chat, ChildrenElement, User } from "@/models";
import english from "@/public/lang/en.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProviderLayout = ({ children }: { children?: ChildrenElement }) => {
  const [strings, setStrings] = useState(english);
  const userCtx = useMemoState<User | null | {}>(null);
  const chatCtx = useMemoState<Chat | null | {}>(null);
  const history = useNavigate();
  const { storeInfo } = useUserInfo();
  useEffect(() => {
    setStrings(english);
    if (!storeInfo) {
      history("/");
    } else {
      userCtx.setVal(storeInfo);
    }
  }, [storeInfo]);

  return (
    <UserCtx.Provider value={userCtx}>
      <ChatCtx.Provider value={chatCtx}>
        <LanguageCtx.Provider value={strings}>{children}</LanguageCtx.Provider>
      </ChatCtx.Provider>
    </UserCtx.Provider>
  );
};

export default ProviderLayout;
