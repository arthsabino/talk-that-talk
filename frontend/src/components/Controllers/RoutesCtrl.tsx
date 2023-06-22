import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import ChatsPage from "../../pages/ChatsPage";
import HomePage from "../../pages/HomePage";
const RoutesCtrl = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chats" element={<ChatsPage />} />
    </Routes>
  );
};

export default RoutesCtrl;
