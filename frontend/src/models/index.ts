import { ReactNode } from "react";

export type User = {
  name: string;
  email: string;
  pic: string;
  token: string;
  _id: string;
};
export type Chat = {
  isGroupChat: boolean;
  users: User[];
  _id: string;
  chatName: string;
};

export type ChildrenElement = ReactNode;
