import axios from "axios";

export const fetcher = async (url: string, token?: string) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res?.data;
};
