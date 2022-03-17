// URL
const url__base = "";
const url__sign_in = `${url__base}`;
const url__sign_up = `${url__base}`;

// OPTIONS
const options__base = {
  headers: {
    "content-type": "application/json", // or "application/x-www-form-urlencoded"
  },
  mode: "cors", // (default: "same-origin")
  credentials: "same-origin", // or "include" (default: "same-origin")
  cache: "default", // no-cache (default: "default")
};

// GET
export function fn_GET__auth__sign_in() {
  const options = {
    ...options__base,
  };

  return fetch(url__sign_in, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((json) => {
      const res = JSON.stringify(json);
      return res;
    })
    .catch((err) => {
      console.log("!ERR\nLoc:api/auth/fn_GET__auth__sign_in");
      console.error(err);
      if (err.response) {
        const {} = err.response;
      }
    });
}

// POST
export function fn_POST__auth__sign_up(_d__obj) {
  const options = {
    ...options__base,
    method: "POST",
    body: JSON.stringify(_d__obj),
  };

  return fetch(url__sign_up, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {})
    .catch((err) => {
      console.log("!ERR\nLoc:api/auth/fn_GET__auth__sign_up");
      console.error(err);
      if (err.response) {
        const {} = err.response;
      }
    });
}
// PATCH
// DELETE
