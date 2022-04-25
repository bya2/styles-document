import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

import { fn_get__init_s__bool_map } from "@/logic/reusable";
import { layout_menu_items__arr, tool_items__arr } from "@/components/common/explorer/items";
import type { I_map } from "@models/reusables";
import type { expTree, expRoot, expNode, InputRefCurrentMap, expNodeRef } from "@/models/explorer";
import { createRef, Ref } from "react";

const ref__D_input_node = createRef<HTMLInputElement>();
const ref__F_input_node = createRef<HTMLInputElement>();

const init_s__exp_tools__cond_map = fn_get__init_s__bool_map(tool_items__arr);

// Type
interface RootListState {
  arr: expRoot[];
  is_active_root__map: I_map<boolean>;
}

interface MenuListState {
  is_click_item__map: I_map<boolean>;
}

interface ToolListState {
  is_click_item__map: I_map<boolean>;
}

interface NodeListState {
  n_arr: expNode[][];
  init_s__cond_map: I_map<boolean>;
  is_active_node__map: I_map<boolean>;
  is_fold_f_node__map: I_map<boolean>;
}

interface OpenNodeListState {
  arr: expNodeRef[];
  is_open_node__map: I_map<boolean>;
}

interface TreeListState {
  arr: expTree[];
}

interface InputRefMap {
  ref__D_input_node: Ref<HTMLInputElement>;
  ref__F_input_node: Ref<HTMLInputElement>;
}

interface ExpStateMap {
  is_mounted: boolean;
  roots: RootListState;
  menus: MenuListState;
  tools: ToolListState;
  nodes: NodeListState;
  open_nodes: OpenNodeListState;
  trees: TreeListState;
  cbs: I_map<any>;
  refs: InputRefMap;
}

// Slice
const name: string = "explorer";

const initialState: ExpStateMap = {
  is_mounted: false,

  roots: {
    arr: [],
    is_active_root__map: {},
  },

  nodes: {
    n_arr: [],
    init_s__cond_map: {},
    is_active_node__map: {},
    is_fold_f_node__map: {},
  },

  open_nodes: {
    arr: [],
    is_open_node__map: {},
  },

  menus: {
    is_click_item__map: fn_get__init_s__bool_map(layout_menu_items__arr),
  },

  tools: {
    is_click_item__map: init_s__exp_tools__cond_map,
  },

  trees: {
    arr: [],
  },

  cbs: {},

  refs: {
    ref__D_input_node,
    ref__F_input_node,
  },
};

export const Slice = createSlice({
  name,
  initialState,
  reducers: {
    // INIT
    set_s__exp__init_mount: (state): void => {
      state.is_mounted = true;
    },

    // ROOTS
    set_s__exp_roots__arr: (state, action: PayloadAction<expRoot[]>): void => {
      state.roots.arr = action.payload;
    },

    set_s__exp_roots__is_active_root__map: (state, action: PayloadAction<I_map<boolean>>): void => {
      state.roots.is_active_root__map = action.payload;
    },

    // NODES
    set_init_s__exp_nodes__cond__map: (state, action: PayloadAction<I_map<boolean>>): void => {
      state.nodes.init_s__cond_map = action.payload;
    },

    // -- ACTIVE
    set_s__exp_nodes__is_active_node__map: (state, action: PayloadAction<I_map<boolean>>): void => {
      state.nodes.is_active_node__map = action.payload;
    },

    set_s__exp_nodes__is_active_node: (state, action: PayloadAction<string>): void => {
      state.nodes.is_active_node__map = {
        ...state.nodes.init_s__cond_map,
        [action.payload]: true,
      };
    },

    // -- FOLD/UNFOLD
    set_s__exp_f_nodes__is_fold_node__map: (state, action: PayloadAction<I_map<boolean>>): void => {
      state.nodes.is_fold_f_node__map = action.payload;
    },

    set_s__exp_f_nodes__is_fold_node: (state, action: PayloadAction<string>): void => {
      state.nodes.is_fold_f_node__map = {
        ...state.nodes.is_fold_f_node__map,
        [action.payload]: true,
      };
    },

    set_s__exp_f_nodes__is_toogle_node: (state, action: PayloadAction<string>): void => {
      state.nodes.is_fold_f_node__map = {
        ...state.nodes.is_fold_f_node__map,
        [action.payload]: !state.nodes.is_fold_f_node__map[action.payload],
      };
    },

    // Exp Open Nodes
    add_s__exp_open_nodes__arr: (state, action: PayloadAction<expNodeRef>) => {
      const is_dupl__node_ref = state.open_nodes.arr.find((el) => el.id === action.payload.id);
      if (!is_dupl__node_ref) {
        state.open_nodes.arr = [...state.open_nodes.arr, action.payload];
      }
    },

    slice_s__exp_open_nodes__arr: (state, action: PayloadAction<string>) => {
      state.open_nodes.arr = state.open_nodes.arr.filter((node) => node.id !== action.payload);
    },

    set_s__exp_open_nodes__arr: (state, action: PayloadAction<expNode[]>) => {
      state.open_nodes.arr = action.payload;
    },

    set_s__exp_nodes__is_open_node: (state, action: PayloadAction<string>) => {
      state.open_nodes.is_open_node__map = {
        ...state.open_nodes.is_open_node__map,
        [action.payload]: true,
      };
    },

    set_s__exp_nodes__is_open_node__map: (state, action: PayloadAction<I_map<boolean>>) => {
      state.open_nodes.is_open_node__map = action.payload;
    },

    // EXP MENUS
    set_s__exp_menus__is_click_item__map: (state, action: PayloadAction<I_map<boolean>>): void => {
      state.menus.is_click_item__map = action.payload;
    },

    set_s__exp_menu_item__open_modal: (state): void => {
      state.menus.is_click_item__map = {
        ...state.menus.is_click_item__map,
        [layout_menu_items__arr[0].id]: true,
      };
    },

    set_s__exp_menu_item__close_modal: (state): void => {
      state.menus.is_click_item__map = {
        ...state.menus.is_click_item__map,
        [layout_menu_items__arr[0].id]: false,
      };
    },

    // ROOT TOOLS
    set_s__exp_tools__is_click_item: (state, action: PayloadAction<string>): void => {
      state.tools.is_click_item__map = {
        ...init_s__exp_tools__cond_map,
        [action.payload]: true,
      };
    },

    set_s__exp_tools__is_click_item__map: (state, action: PayloadAction<I_map<boolean>>): void => {
      state.tools.is_click_item__map = action.payload;
    },

    init_s__exp_tools__is_click_item__map: (state): void => {
      state.tools.is_click_item__map = init_s__exp_tools__cond_map;
    },

    // EXP TREES
    set_s__exp_trees__arr: (state, action: PayloadAction<expTree[]>): void => {
      state.trees.arr = action.payload;
    },
  },
});

export const {
  set_s__exp__init_mount,

  // ROOTS
  set_s__exp_roots__arr,
  set_s__exp_roots__is_active_root__map,

  // NODES
  set_init_s__exp_nodes__cond__map,
  // NODES - ACTIVE
  set_s__exp_nodes__is_active_node__map,
  set_s__exp_nodes__is_active_node,
  // NODES - FOLD/UNFOLD
  set_s__exp_f_nodes__is_fold_node__map,
  set_s__exp_f_nodes__is_fold_node,
  set_s__exp_f_nodes__is_toogle_node,

  // Open Nodes
  add_s__exp_open_nodes__arr,
  slice_s__exp_open_nodes__arr,
  set_s__exp_open_nodes__arr,
  set_s__exp_nodes__is_open_node,
  set_s__exp_nodes__is_open_node__map,

  // MENUS
  set_s__exp_menus__is_click_item__map,
  set_s__exp_menu_item__open_modal,
  set_s__exp_menu_item__close_modal,

  // TOOLS
  set_s__exp_tools__is_click_item,
  init_s__exp_tools__is_click_item__map,
  set_s__exp_trees__arr,
} = Slice.actions;
export const selectExplorer = (state: RootState) => state.explorer;
export default Slice.reducer;
