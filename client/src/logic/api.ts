export const fn_wrap__fetch = (_url: string, _options: RequestInit, _cb?: () => Promise<any>): Promise<Response> => {
  return window.fetch(_url, _options)
    .then(
      _cb === undefined
        ? (res) => {
            if (!res.ok) {
              throw new Error("Network error.");
            }
            return res.json();
          }
        : _cb
    )
    .catch((err) => {
      console.log("fn_wrap__fetch");
      if (err.response) {
        // code...
      } else {
        console.error(err.message);
      }

      return err.response.json();
    });
};

export const fn_get__url_query = (_url_params: any): string => {
  const url_query: string = Object.keys(_url_params)
    .map((k: any): string => `${encodeURIComponent(k)}=${encodeURIComponent(_url_params[k])}`)
    .join("&");

  return url_query;
}