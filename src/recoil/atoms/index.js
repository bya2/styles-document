import { atom } from "recoil";

// export const g_state__user = atom({
//   key: "g_state__user",
//   default: sessionStorage.getItem("ref_hashed_user"),
// });

export const g_state__user = atom({
  key: "g_state__user",
  default: {
    ref_user_id: sessionStorage.getItem("ref_user_id"),
    ref_hashed_user: sessionStorage.getItem("ref_hashed_user"),
  },
});

export const g_state__ref = atom({
  key: "g_state__ref",
  default: {
    ref_user_id: sessionStorage.getItem("ref_user_id"),
    ref_hashed_user: sessionStorage.getItem("ref_hashed_user"),
  },
});

export const g_state__user_valid = atom({
  key: "g_state__user_valid",
  default: false,
});
