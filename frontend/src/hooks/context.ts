import english from "@/public/lang/en.json";
import { createContext, useContext, useMemo, useState } from "react";

export type Strings = typeof english;
export const LanguageCtx = createContext(english);
export function useLanguage() {
  return useContext(LanguageCtx);
}

const userCtxDefaultVal = {
  val: null as any,
  setVal: null as any,
};

export const UserCtx = createContext(userCtxDefaultVal);

export function useUser() {
  return useContext(UserCtx);
}

export function useMemoState<T>(defaultVal: T) {
  const [val, setVal] = useState(defaultVal);
  const memoVal = useMemo(() => ({ val, setVal }), [val, setVal]);

  return memoVal;
}
