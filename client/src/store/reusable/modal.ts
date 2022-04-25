import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { fn_get__init_s__bool_map } from "@/logic/reusable";
import type { I_obj, I_map, I_cond_map } from "@/models/reusables";
import { status_items__at_sign_out__arr } from "@/components/common/status/items";

interface ModalStateMap {
  status: {
    is_open__map: I_cond_map;
  }
}

const init_s__status_items__cond_map: I_cond_map = fn_get__init_s__bool_map(status_items__at_sign_out__arr);

const name: string = "modal";

const initialState: ModalStateMap = {
  status: {
    is_open__map: init_s__status_items__cond_map,
  }
};

export const Slice = createSlice({
  name,
  initialState,
  reducers: {
    set_s__status__open_modal: (state, action: PayloadAction<string>) => {
      state.status.is_open__map = {
        ...state.status.is_open__map,
        [action.payload]: true,
      };
    },
    set_s__status__close_modal: (state, action: PayloadAction<string>) => {
      state.status.is_open__map = {
        ...state.status.is_open__map,
        [action.payload]: false,
      };
    },
    init_s__status__is_open__map: (state) => {
      state.status.is_open__map = init_s__status_items__cond_map;
    }
  },
});

export const {set_s__status__open_modal,set_s__status__close_modal} = Slice.actions;
// export const selectActivity = (state: RootState) => state.activity;
export default Slice.reducer;
