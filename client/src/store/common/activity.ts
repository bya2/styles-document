import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

import { tool_items__arr } from "@/components/common/activity/items";
import { fn_get__init_s__bool_map } from "@/logic/common";
import type { map } from "@/models/reusables";

interface ActivityStateMap {
  tools: {
    is_active_item__map: map<boolean>;
  };
}

const name: string = "explorer";

const initialState: ActivityStateMap = {
  tools: {
    is_active_item__map: fn_get__init_s__bool_map(tool_items__arr),
  },
};

export const Slice = createSlice({
  name,
  initialState,
  reducers: {
    set_s__tool__is_active_item__map: (state, action: PayloadAction<map<boolean>>): void => {
      state.tools.is_active_item__map = action.payload;
    },
  },
});

export const { set_s__tool__is_active_item__map } = Slice.actions;
export const selectActivity = (state: RootState) => state.activity;
export default Slice.reducer;
