import { atom } from "recoil";

export const g_state__user = atom({
  key: "g_state__user",
  default: sessionStorage.getItem("ref_hashed_user"),
});

export const g_state__user_valid = atom({
  key: "g_state__user_valid",
  default: false,
});
