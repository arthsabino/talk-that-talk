import AuthCard from "@/components/Auth/AuthCard";
import AppLayout from "@/components/Layouts/AppLayout";
import { useUserInfo } from "@/hooks/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const history = useNavigate();
  const { storeInfo } = useUserInfo();
  useEffect(() => {
    if (storeInfo) {
      history("/chats");
    }
  }, [history, storeInfo]);
  return (
    Boolean(history) && (
      <AppLayout>
        <AuthCard />
      </AppLayout>
    )
  );
};

export default HomePage;
