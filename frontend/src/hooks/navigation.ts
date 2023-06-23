import { useSearchParams } from "react-router-dom";

export function useTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const setTab = (tab?: string) => {
    if (tab) {
      setSearchParams((prev) => ({
        ...prev,
        tab,
      }));
    } else {
      searchParams.delete("tab");
      setSearchParams(searchParams);
    }
  };

  return {
    tab,
    setTab,
  };
}
