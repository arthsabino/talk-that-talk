import { User } from "@/models";
import { useEffect, useState } from "react";

export function useUserInfo() {
  const [storeInfo, setStoreInfo] = useState<null | {} | User>(null);

  useEffect(() => {
    const storageItem = localStorage.getItem("userInfo");
    setStoreInfo(storageItem ? JSON.parse(storageItem) : null);
  }, []);

  return {
    storeInfo,
  };
}
