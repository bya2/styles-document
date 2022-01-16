const COMMON_SCHEME = process.env.REACT_APP__COMMON_SCHEME || "http";
const COMMON_HOST = process.env.REACT_APP__COMMON_HOST || "localhost";
const COMMON_PORT = process.env.REACT_APP__COMMON_PORT || 8080;

const COMMON_URL = `${COMMON_SCHEME}://${COMMON_HOST}:${COMMON_PORT}`;

const SIGN_UP_ENDPOINT =
  process.env.REACT_APP__SIGN_UP_ENDPOINT || "/api/signup";
const SIGN_IN_ENDPOINT =
  process.env.REACT_APP__SIGN_IN_ENDPOINT || "/api/signin";

export const config__sign_up = {
  SCHEME: COMMON_SCHEME,
  HOST: COMMON_HOST,
  PORT: COMMON_PORT,
  ENDPOINT: process.env.REACT_APP__SIGN_UP_ENDPOINT || "/api/signup",
};
export const URL__SIGN_UP = `${COMMON_URL}${SIGN_UP_ENDPOINT}`;

export const config__sign_in = {
  SCHEME: COMMON_SCHEME,
  HOST: COMMON_HOST,
  PORT: COMMON_PORT,
  ENDPOINT: process.env.REACT_APP__SIGN_IN_ENDPOINT || "/api/signin",
};
export const URL__SIGN_IN = `${COMMON_URL}${SIGN_IN_ENDPOINT}`;
