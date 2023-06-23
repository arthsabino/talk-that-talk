import { LanguageCtx } from "@/hooks/context";
import english from "@/public/lang/en.json";
import { ReactElement, useEffect, useState } from "react";

const ProviderLayout = ({ children }: { children: ReactElement }) => {
  const [strings, setStrings] = useState(english);
  useEffect(() => {
    setStrings(english);
  }, []);

  return (
    <LanguageCtx.Provider value={strings}>{children}</LanguageCtx.Provider>
  );
};

export default ProviderLayout;
