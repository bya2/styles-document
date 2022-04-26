import { fn_handle__error__ctx } from "@/logic/reusable";

export const fn_wrap__fetch = (_url: string, _options: RequestInit, _cb?: () => Promise<any>): Promise<Response> => {
  return window
    .fetch(_url, _options)
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

export const fn_wrap__fb_GET = <I = any, O = any>(_cb: (_obj: I) => Promise<O>, _obj: I): Promise<O | null> => {
  return _cb(_obj).catch((err) => {
    if (err.response) {
      // code...
      console.log("e-res");
    } else {
      fn_handle__error__ctx(err, "fn_wrap__fb_GET");
    }

    return null;
  });
};

export const fn_wrap__fb_POST = <I = any>(_cb: (_obj: I) => Promise<boolean>, _obj: I): Promise<boolean> => {
  return _cb(_obj).catch((err) => {
    if (err.response) {
      // code...
      console.log("e-res");
    } else {
      fn_handle__error__ctx(err, "fn_wrap__fb_POST");
    }

    return false;
  });
};

export const fn_wrap__fb_PATCH = <T = any>(_cb: () => Promise<T>): Promise<T | boolean> => {
  return _cb().catch((err) => {
    if (err.response) {
      // code...
    } else {
      fn_handle__error__ctx(err, "fn_wrap__fb_PATCH");
    }

    return false;
  });
};

export const fn_wrap__fb_DELETE = (_cb: () => Promise<boolean>): Promise<boolean> => {
  return _cb().catch((err) => {
    if (err.response) {
      // code...
    } else {
      fn_handle__error__ctx(err, "fn_wrap__fb_DELETE");
    }

    return false;
  });
};

export const fn_get__url_query = (_url_params: any): string => {
  const url_query: string = Object.keys(_url_params)
    .map((k: any): string => `${encodeURIComponent(k)}=${encodeURIComponent(_url_params[k])}`)
    .join("&");

  return url_query;
};
