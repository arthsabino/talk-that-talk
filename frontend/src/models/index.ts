export type User = {
  name: string;
  email: string;
};
export type Chats = {
  isGroupChat: boolean;
  users: User[];
  _id: string;
  chatName: string;
};
