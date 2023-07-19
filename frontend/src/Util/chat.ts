import { Chat, User } from "@/models";

export const getOtherUser = (userId: string, chat: Chat): User | undefined => {
  const otherUser = chat?.users.find((u: User) => u._id !== userId);
  return otherUser;
};
export const getChatName = (userId: string, chat: Chat): string => {
  if (!chat) return "";
  else if (Boolean(chat.isGroupChat)) {
    return chat.chatName;
  } else {
    const otherUser = getOtherUser(userId, chat);
    return otherUser ? otherUser.name : "";
  }
};
