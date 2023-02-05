import { useState } from "react";

export const useFetchApi = (url) => {
  const [result, setResult] = useState([]);
  const [lastUpdated, setLastUpdated] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState();

  const search = (id) => {
    setIsLoading(true);
    setResult([]);
    setStatus();

    return fetch(id != null ? url + "/" + id : url)
      .then((response) => {
        setStatus(response.status);
        setLastUpdated(new Date().getTime());
        return response.json();
      })
      .then((result) => {
        setIsLoading(false);
        setResult(result.feed.entry);
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
