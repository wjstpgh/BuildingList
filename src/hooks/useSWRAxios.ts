import useSWR from "swr";
import axios from "axios";

interface UseSWRProps {
  url: string;
}

export default function useSWRAxios<T>({ url }: UseSWRProps) {
  const fetcher = async (url: string) => {
    const { data, status } = await axios.get(url);
    if (status === 200) {
      return data as T;
    } else {
      throw new Error(data?.result);
    }
  };

  return useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
    onErrorRetry: (error, _key, _config, _revalidate, { retryCount }) => {
      if (retryCount >= 5) return;
      if (error.status === 401 || error.status === 404) return;
      else console.log(`undefined Error Type: ${error}`);
    },
  });
}
