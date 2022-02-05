import { URL__prefix } from "../common/endpoint";

// Auth
const ENDPOINT__AUTH__SIGN_IN = "/api/auth/sign_in";
const ENDPOINT__AUTH__VALIDATION = "/api/auth/validation";
export const URL__AUTH__SIGN_IN = `${URL__prefix}${ENDPOINT__AUTH__SIGN_IN}`;
export const URL__AUTH__VALIDATION = `${URL__prefix}${ENDPOINT__AUTH__VALIDATION}`;

// Explorer
const ENDPOINT__EXP__NODE_LIST = "/api/exp/node_list";
export const URL__EXP__NODE_LIST = `${URL__prefix}${ENDPOINT__EXP__NODE_LIST}`;

//
const ENDPOINT__EXP__LOAD_GROUP_LIST = "/api/exp/load_group_list";
const ENDPOINT__EXP__LOAD_DOC_LIST = "/api/doc/load_list";

const ENDPOINT__EXP__LOAD_ELEM_LIST = "/api/elem/load_list";

export const URL__EXP__LOAD_GROUP_LIST = `${URL__prefix}${ENDPOINT__EXP__LOAD_GROUP_LIST}`;
export const URL__EXP__LOAD_DOC_LIST = `${URL__prefix}${ENDPOINT__EXP__LOAD_DOC_LIST}`;
export const URL__ELEM__LOAD_LIST = `${URL__prefix}${ENDPOINT__EXP__LOAD_ELEM_LIST}`;
