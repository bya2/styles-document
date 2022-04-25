import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

import { status_items__at_sign_in__arr, status_items__at_sign_out__arr } from "@/components/common/auth/items";
import { fn_get__init_s__bool_map } from "@/logic/reusable";
import type { I_cond_map } from "@/models/reusables";

type T_auth_ref = {
  id: string | null;
  hashed: string | null;
};

interface I_auth_state {
  ref: T_auth_ref;
  status: {
    is_click_item__map: I_cond_map;
  };
}

const init_s__status__cond_map = fn_get__init_s__bool_map([...status_items__at_sign_in__arr, ...status_items__at_sign_out__arr]);

const name = "authRef";
const initialState: I_auth_state = {
  ref: {
    id: null,
    hashed: null,
  },
  status: {
    is_click_item__map: init_s__status__cond_map,
  },
};

export const Slice = createSlice({
  name,
  initialState,
  reducers: {
    assignRef: (state, action: PayloadAction<T_auth_ref>): void => {
      state.ref = action.payload;
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

export const { assignRef } = Slice.actions;
export const selectAuthRef = (state: RootState) => state.auth.ref;
export default Slice.reducer;
