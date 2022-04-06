import { baseURL } from "@/config/api";
import { fn_wrap__fetch, fn_get__url_query } from "@/logic/api/common";
import type { ISignInKeys, ISignUpKeys, ISignInParams, ISignUpBody } from "@/models/Common";

const options__based: RequestInit = {
  headers: {
    "content-type": "application/json",
  },
  mode: "cors", // (default: "same-origin")
  credentials: "include", // or "include" (default: "same-origin")
  cache: "reload", // no-cache (default: "default")
};

// GET
// 200
export const fn_GET__exp__nodes = (_root_name: string): Promise<any> => {
  const url_path__exp__user_storage: string = "/exp/user_storage";

  const url_params = {
    id: _root_name,
  };

  const url_query: string = fn_get__url_query(url_params);

  const _url: string = `${baseURL}${url_path__exp__user_storage}?${url_query}`;

  const options = {
    ...options__based,
  };

  return fn_wrap__fetch(_url, options)
    .then((json) => {
      const data = JSON.stringify(json);
      return data;
    })
    .catch((err) => {
      if (err.response.data) {
        console.log("fn_GET__exp__user_storage");
        console.error(err);
      }
    });
};

// POST
// 201
export const fn_POST__exp__new_node = ({ _user, _type, _content, _pnode_id }: any): Promise<any> => {
  const url_path__exp__new_node: string = "/exp/new_node";
  const _url = `${baseURL}${url_path__exp__new_node}`;

  const options = {
    ...options__based,
    method: "POST",
    body: JSON.stringify({
      user: _user,
      type: _type,
      content: _content,
      pnode_id: _pnode_id,
    }),
  }

  return fn_wrap__fetch(_url, options)
    .then(json => {
      const data = JSON.stringify(json);
      return data;
    })
    .catch(err => {
      console.log("fn_POST__exp__new_document");
      console.error(err);
    })
}
