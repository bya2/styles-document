const COMMON_SCHEME = process.env.REACT_APP__COMMON_SCHEME || "http";
const COMMON_HOST = process.env.REACT_APP__COMMON_HOST || "localhost";
const COMMON_PORT = process.env.REACT_APP__COMMON_PORT || 8080;

const COMMON_URL = `${COMMON_SCHEME}://${COMMON_HOST}:${COMMON_PORT}`;

/**
 * GET
 */
const ENDPOINT__SIGN_IN =
  process.env.REACT_APP__ENDPOINT__SIGN_IN || "/api/sign_in";

const ENDPOINT__USR__DOC_LIST =
  process.env.REACT_APP__ENDPOINT__USR_DOC_LIST || "/api/usr__doc_list";

const ENDPOINT__USR_DOC__ELEM_LIST =
  process.env.REACT_APP__ENDPOINT__USR_DOC || "/api/usr_doc__elem_list";

/**
 * POST
 */
const ENDPOINT__SIGN_UP =
  process.env.REACT_APP__ENDPOINT__SIGN_UP || "/api/sign_up";

const ENDPOINT__ADD_DOC = process.env.ENDPOINT__ADD_DOC || "/api/add_doc";
// r__id__doc.editor: 문서 내 엘리먼트 생성
const ENDPOINT__ADD_DOC_ELEM =
  process.env.REACT_APP__ENDPOINT__ADD_DOC_ELEM || "/api/add_doc_elem";

export const URL__SIGN_UP = `${COMMON_URL}${ENDPOINT__SIGN_UP}`;
export const config__sign_up = {
  SCHEME: COMMON_SCHEME,
  HOST: COMMON_HOST,
  PORT: COMMON_PORT,
  ENDPOINT: ENDPOINT__SIGN_UP,
};

export const URL__SIGN_IN = `${COMMON_URL}${ENDPOINT__SIGN_IN}`;
export const config__sign_in = {
  SCHEME: COMMON_SCHEME,
  HOST: COMMON_HOST,
  PORT: COMMON_PORT,
  ENDPOINT: ENDPOINT__SIGN_IN,
};

export const URL__USR__DOC_LIST = `${COMMON_URL}${ENDPOINT__USR__DOC_LIST}`;
export const config__usr_doc_list = {
  SCHEME: COMMON_SCHEME,
  HOST: COMMON_HOST,
  PORT: COMMON_PORT,
  ENDPOINT: ENDPOINT__USR__DOC_LIST,
};

export const URL__ADD_DOC = `${COMMON_URL}${ENDPOINT__ADD_DOC}`;
export const config__add_doc = {
  SCHEME: COMMON_SCHEME,
  HOST: COMMON_HOST,
  PORT: COMMON_PORT,
  ENDPOINT: ENDPOINT__ADD_DOC,
};

export const URL__USR_DOC__ELEM_LIST = `${COMMON_URL}${ENDPOINT__USR_DOC__ELEM_LIST}`;
export const config__usr_doc = {
  SCHEME: COMMON_SCHEME,
  HOST: COMMON_HOST,
  PORT: COMMON_PORT,
  ENDPOINT: ENDPOINT__USR_DOC__ELEM_LIST,
};

export const URL__ADD_DOC_ELEM = `${COMMON_URL}${ENDPOINT__ADD_DOC_ELEM}`;
export const config__add_doc_elem = {
  SCHEME: COMMON_SCHEME,
  HOST: COMMON_HOST,
  PORT: COMMON_PORT,
  ENDPOINT: ENDPOINT__ADD_DOC_ELEM,
};
