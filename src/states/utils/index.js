import { useState } from "react";
import { handlerUrl } from "./handler-url";

export const useFetchApi = (url) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState();
  const [status, setStatus] = useState();

  const search = (params = null) => {
    setIsLoading(true);
    setResult(null);
    setStatus();

    return fetch(handlerUrl(url, params))
      .then((response) => {
        setStatus(response.status);
        setLastUpdated(new Date().getTime());
        return response.json();
      })
      .then((result) => {
        setIsLoading(false);
        setResult(result);
      })
      .catch((e) => {
        setStatus(e.status);
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { search, result, isLoading, lastUpdated, status };
};
