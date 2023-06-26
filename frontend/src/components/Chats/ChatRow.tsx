import { FC } from "react";
import Card from "../Card";

const ChatRow: FC<{ name: string; preview: string }> = ({ name, preview }) => {
  return (
    <Card containerCls="chat-row">
      <>
        <span className="font-bold">{name}</span>
        <span>{preview}</span>
      </>
    </Card>
  );
};

export default ChatRow;
