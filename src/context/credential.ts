import { createContext, useContext } from "react";

export interface Credential {
  id: number;
  title: string;
  folder: string;
  username: string;
  password: string;
  url: string;
  note: string;
}

export interface credentialState {
  credentials: Credential[];
  setCredentials: (credentials: Credential[]) => void;
}

export const CredentialContext = createContext<credentialState | null>(null);

export function useCredentialContext() {
  const ctx = useContext(CredentialContext);
  if (ctx == null) {
    throw new Error("Cannot use CredentialContext");
  }
  return ctx;
}
