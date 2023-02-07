import { useState } from "react";
import { handlerUrl } from "./handler-url";

export const useFetchApi = (url) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdatedDate, setLastUpdatedDate] = useState(null);
  const [status, setStatus] = useState(null);

  const search = (params = null) => {
    setIsLoading(true);
    setResult(null);
    setStatus();

    return fetch(handlerUrl(url, params))
      .then((response) => {
        setStatus(response.status);
        return response.json();
      })
      .then((result) => {
        setIsLoading(false);
        setResult(result);
        setLastUpdatedDate(Date.now());
      })
      .catch((e) => {
        setStatus(e.status);
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { search, result, isLoading, lastUpdatedDate, status };
};
