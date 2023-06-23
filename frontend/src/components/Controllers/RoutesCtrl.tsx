import ChatsPage from "@/pages/ChatsPage";
import HomePage from "@/pages/HomePage";
import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
const RoutesCtrl = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chats" element={<ChatsPage />} />
    </Routes>
  );
};

export default RoutesCtrl;
