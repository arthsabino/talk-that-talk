import english from "@/public/lang/en.json";
import { createContext, useContext, useMemo, useState } from "react";

export type Strings = typeof english;
export const LanguageCtx = createContext(english);
export function useLanguage() {
  return useContext(LanguageCtx);
}

export function useMemoState<T>(defaultVal: T) {
  const [val, setVal] = useState(defaultVal);
  const memoVal = useMemo(() => ({ val, setVal }), [val, setVal]);

  return memoVal;
}
