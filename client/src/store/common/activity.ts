import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { tool_items__arr } from "@/components/common/activity/items";
import { fn_get__init_s__bool_map } from "@/logic/reusable";
import type { I_cond_map } from "@/models/reusables";

interface ActivityStateMap {
  tools: {
    is_active__cond_map: I_cond_map;
  };
  r_nodes: {
    arr: I_act_r_node[];
    dragged: string | null;
    is_mouse_down__cond_map: I_cond_map;
  };
}

const init_s__act_tools__cond_map: I_cond_map = fn_get__init_s__bool_map(tool_items__arr);

const name: string = "explorer";

const initialState: ActivityStateMap = {
  tools: {
    is_active__cond_map: {
      ...init_s__act_tools__cond_map,
      explorer: true,
    },
  },
  r_nodes: {
    arr: [],
    dragged: null,
    is_mouse_down__cond_map: {},
  },
};

export const Slice = createSlice({
  name,
  initialState,
  reducers: {
    // TOOL
    // -- ACTIVE
    set_s__act_tools__is_active__cond_map: (state, action: PayloadAction<I_cond_map>): void => {
      state.tools.is_active__cond_map = action.payload;
    },
    set_s__act_tool__is_active: (state, action: PayloadAction<{ id: string; cond: boolean }>) => {
      state.tools.is_active__cond_map = {
        ...init_s__act_tools__cond_map,
        [action.payload.id]: action.payload.cond,
      };
    },

    // ROOT
    // -- LIST
    set_s__act_r_nodes__arr: (state, action: PayloadAction<I_act_r_node[]>): void => {
      state.r_nodes.arr = action.payload;
    },
    add_s__act_r_node__obj: (state, action: PayloadAction<I_act_r_node>) => {
      state.r_nodes.arr = [...state.r_nodes.arr, action.payload];
    },
    del_s__act_r_node__obj: (state, action: PayloadAction<{ id: string }>) => {
      state.r_nodes.arr = state.r_nodes.arr.filter((r_node) => r_node.id !== action.payload.id);
    },

    // -- DRAG
    set_s__drageed_root__str: (state, action: PayloadAction<{ id: string }>): void => {
      state.r_nodes.dragged = action.payload.id;
    },

    // -- MOUSE DOWN
    init_s__act_r_nodes__is_mouse_down__cond_map: (state): void => {
      state.r_nodes.is_mouse_down__cond_map = state.r_nodes.arr.reduce((obj: I_cond_map, r_node) => {
        obj[r_node.id] = false;
        return obj;
      }, {});
    },
    set_s__act_r_nodes__is_mouse_down__cond_map: (state, action: PayloadAction<I_cond_map>): void => {
      state.r_nodes.is_mouse_down__cond_map = action.payload;
    },
    set_s__act_r_node__is_mouse_down: (state, action: PayloadAction<{ id: string; cond: boolean }>) => {
      state.r_nodes.is_mouse_down__cond_map = {
        ...state.r_nodes.is_mouse_down__cond_map,
        [action.payload.id]: action.payload.cond,
      };
    },
  },
});

export const {
  set_s__act_tools__is_active__cond_map,
  set_s__act_tool__is_active,
  set_s__act_r_nodes__arr,
  set_s__drageed_root__str,
  init_s__act_r_nodes__is_mouse_down__cond_map,
  set_s__act_r_nodes__is_mouse_down__cond_map,
  set_s__act_r_node__is_mouse_down,
} = Slice.actions;
export const selectActivity = (state: RootState) => state.activity;
export default Slice.reducer;
