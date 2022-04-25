import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

import { tool_items__arr } from "@/components/common/activity/items";
import { fn_get__init_s__bool_map } from "@/logic/reusable";
import type { I_obj, I_map, I_cond_map } from "@/models/reusables";

interface ActivityStateMap {
  tools: {
    is_active_item__map: I_map<boolean>;
  };
  roots: {
    arr: I_obj[];
    dragged: string | null;
    is_mouse_down_root__map: I_map<boolean>;
  };
}

const init_s__act_tools__cond_map: I_cond_map = fn_get__init_s__bool_map(tool_items__arr);

const name: string = "explorer";

const initialState: ActivityStateMap = {
  tools: {
    is_active_item__map: {
      ...init_s__act_tools__cond_map,
      explorer: true,
    },
  },
  roots: {
    arr: [],
    dragged: null,
    is_mouse_down_root__map: {},
  },
};

export const Slice = createSlice({
  name,
  initialState,
  reducers: {
    set_s__tool__is_active_item__map: (state, action: PayloadAction<I_map<boolean>>): void => {
      state.tools.is_active_item__map = action.payload;
    },

    set_s__act_tool__is_active_item: (state, action: PayloadAction<string>) => {
      state.tools.is_active_item__map = {
        ...init_s__act_tools__cond_map,
        [action.payload]: true,
      }
    },

    set_s__act_roots__arr: (state, action: PayloadAction<I_obj[]>): void => {
      state.roots.arr = action.payload;
    },

    set_s__drageed_root__str: (state, action: PayloadAction<string>):void => {
      state.roots.dragged = action.payload;
    },

    init_s__act_roots__is_mouse_down_root__map: (state): void => {
      state.roots.is_mouse_down_root__map = fn_get__init_s__bool_map(state.roots.arr);
    },

    set_s__act_roots__is_mouse_down_root__map: (state, action: PayloadAction<I_map<boolean>>): void => {
      state.roots.is_mouse_down_root__map = action.payload;
    },
  },
});

export const {
  set_s__tool__is_active_item__map,
  set_s__act_tool__is_active_item,
  set_s__act_roots__arr,
  set_s__drageed_root__str,
  init_s__act_roots__is_mouse_down_root__map,
  set_s__act_roots__is_mouse_down_root__map,
} = Slice.actions;
export const selectActivity = (state: RootState) => state.activity;
export default Slice.reducer;
