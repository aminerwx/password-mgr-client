import { createContext, useContext } from "react";

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface userState {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const CredentialContext = createContext<userState | null>(null);

export function useCredentialContext() {
  const ctx = useContext(CredentialContext);
  if (ctx == null) {
    throw new Error("Cannot use CredentialContext");
  }
  return ctx;
}
