import { baseURL } from "@/config/api";
import { fn_wrap__fetch, fn_get__url_query } from "@/logic/api";
import type { I_sign_in_keys, I_sign_up_keys, I_sign_in_params, I_sign_up_body } from "@/models/common";

const options__based: RequestInit = {
  headers: {
    "content-type": "application/json",
  },
  mode: "cors", // (default: "same-origin")
  credentials: "include", // or "include" (default: "same-origin")
  cache: "reload", // no-cache (default: "default")
};

export const fn_GET__auth__sign_in = ({ sign_in_item__id, sign_in_item__password }: I_sign_in_keys): Promise<any> => {
  const url_path__auth__sign_in: string = "/auth/sign_in";

  const url_params: I_sign_in_params = {
    id: sign_in_item__id,
    password: sign_in_item__password,
  };

  const url_query: string = fn_get__url_query(url_params);

  const _url: string = `${baseURL}${url_path__auth__sign_in}?${url_query}`;

  const options: RequestInit = {
    ...options__based,
  };

  console.log("URL:", _url);

  return fn_wrap__fetch(_url, options)
    .then((json) => {
      const data = JSON.stringify(json);
      console.log("SignIn:", data);
      return data;
    })
    .catch((err) => {
      console.log("fn_GET__auth__sign_in");
      console.error(err);
    });
};

export const fn_POST__auth__sign_up = ({ sign_up_item__id, sign_up_item__password, sign_up_item__email }: I_sign_up_keys): Promise<any> => {
  const url_path__auth__sign_up: string = `${baseURL}/auth/sign_up`;

  const _url: string = url_path__auth__sign_up;

  const options: RequestInit = {
    ...options__based,
    method: "POST",
    body: JSON.stringify({
      id: sign_up_item__id,
      password: sign_up_item__password,
      email: sign_up_item__email,
    }),
  };

  return fn_wrap__fetch(_url, options)
    .then((json) => {
      const data = JSON.stringify(json);
      console.log(data);
    })
    .catch((err) => {
      console.log("fn_POST__auth__sign_up");
      console.error(err);
    });
};
