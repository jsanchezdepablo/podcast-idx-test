const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

export const handlerUrl = (url, params) => {
  let processedUrl = PROXY_URL + url;

  if (params !== null) {
    let queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    processedUrl = `${processedUrl}?${queryString}`;
  }

  return processedUrl;
};
