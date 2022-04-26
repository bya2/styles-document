import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

import { status_items__at_sign_in__arr, status_items__at_sign_out__arr } from "@/components/common/status/items";
import { fn_get__init_s__bool_map } from "@/logic/reusable";
import type { I_cond_map } from "@/models/reusables";
import { session_storage_keys__map } from "@/config/storage";

// TYPE
interface I_auth_ref {
  id: string | null;
  hashed: string | null;
}

interface I_auth_status {
  is_click_item__map: I_cond_map;
}

interface I_state__auth {
  ref: I_auth_ref;
  status: I_auth_status;
}

// CONSTANT
const cached__auth_ref = window.sessionStorage.getItem(session_storage_keys__map.ss__sds__auth_ref);
const no__auth_ref = {
  id: null,
  hashed: null,
};

let init_s__auth_ref = cached__auth_ref ? (JSON.parse(cached__auth_ref) as I_auth_ref) : no__auth_ref;

console.log(init_s__auth_ref);

const init_s__status__cond_map = fn_get__init_s__bool_map([...status_items__at_sign_in__arr, ...status_items__at_sign_out__arr]);

// CONTEXT
const name = "authRef";
const initialState: I_state__auth = {
  ref: init_s__auth_ref,
  status: {
    is_click_item__map: init_s__status__cond_map,
  },
};

export const Slice = createSlice({
  name,
  initialState,
  reducers: {
    assignRef: (state, action: PayloadAction<I_auth_ref>): void => {
      state.ref = action.payload;
    }, // 삭제 예정

    set_s__auth_ref: (state, action: PayloadAction<I_auth_ref>) => {
      state.ref = action.payload;
    },

    del_s__auth_ref: (state) => {
      state.ref = no__auth_ref;
    },

    set_s__auth_status__is_click__map: (state, action: PayloadAction<string>) => {
      state.status.is_click_item__map = {
        ...state.status.is_click_item__map,
        [action.payload]: true,
      };
    },

    init_s__auth_status__is_click__map: (state) => {
      state.status.is_click_item__map = init_s__status__cond_map;
    },
  },
});

export const {
  assignRef,
  set_s__auth_ref,
  del_s__auth_ref,
  set_s__auth_status__is_click__map,
  init_s__auth_status__is_click__map,
} = Slice.actions;
export const selectAuthRef = (state: RootState) => state.auth.ref;
export default Slice.reducer;
