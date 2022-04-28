import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { fn_get__init_s__bool_map } from "@/logic/reusable";
import { layout_menu_items__arr, tool_items__arr } from "@/components/common/explorer/items";
import type { I_cond_map } from "@models/reusables";
import type { expNode, I_exp_node_ref, I_exp_r_node, I_exp_node } from "@/models/explorer";
import { FOLDER_TYPE } from "@/config/explorer";

const init_s__exp_tools__cond_map = fn_get__init_s__bool_map(tool_items__arr);

// Type
interface I_s__roots {
  arr: I_exp_r_node[];
  is_active__cond_map: I_cond_map;
}

interface I_s__menus {
  is_click__cond_map: I_cond_map;
}

interface I_s__tools {
  is_click__cond_map: I_cond_map;
}

interface I_s__nodes {
  n_arr: expNode[][];
  arr: I_exp_node[];
  init_s__cond_map: I_cond_map;
  is_active__cond_map: I_cond_map;
  is_fold__cond_map: I_cond_map;
}

interface I_s__o_nodes {
  arr: I_exp_node[];
  is_open__cond_map: I_cond_map;
}

interface I_s__trees {
  arr: I_exp_r_node[];
}

interface I_exp_state_map {
  is_mounted: boolean;
  r_nodes: I_s__roots;
  menus: I_s__menus;
  tools: I_s__tools;
  nodes: I_s__nodes;
  o_nodes: I_s__o_nodes;
  trees: I_s__trees;
}

// Slice
const name: string = "explorer";

const initialState: I_exp_state_map = {
  is_mounted: false,

  r_nodes: {
    arr: [],
    is_active__cond_map: {},
  },

  nodes: {
    n_arr: [],
    arr: [],
    init_s__cond_map: {},
    is_active__cond_map: {},
    is_fold__cond_map: {},
  },

  o_nodes: {
    arr: [],
    is_open__cond_map: {},
  },

  menus: {
    is_click__cond_map: fn_get__init_s__bool_map(layout_menu_items__arr),
  },

  tools: {
    is_click__cond_map: init_s__exp_tools__cond_map,
  },

  trees: {
    arr: [],
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
    // -- LIST
    set_s__exp_r_nodes__arr: (state, action: PayloadAction<I_exp_r_node[]>) => {
      state.r_nodes.arr = action.payload;
    },
    add_s__exp_r_node__obj: (state, action: PayloadAction<I_exp_r_node>) => {
      state.r_nodes.arr = [...state.r_nodes.arr, action.payload];
    },
    del_s__exp_r_node__obj: (state, action: PayloadAction<I_exp_r_node>) => {
      state.r_nodes.arr = state.r_nodes.arr.filter((r_node) => r_node.uid !== action.payload.uid);
    },

    // -- ACTIVE
    set_s__exp_r_nodes__is_active__cond_map: (state, action: PayloadAction<I_cond_map>): void => {
      state.r_nodes.is_active__cond_map = action.payload;
    },
    set_s__exp_r_node__is_active: (state, action: PayloadAction<{ uid: string; cond: boolean }>) => {
      state.r_nodes.is_active__cond_map = {
        ...state.r_nodes.is_active__cond_map,
        [action.payload.uid]: action.payload.cond,
      };
    },

    // NODES
    // -- INIT
    set_s__exp_nodes__init_cond_map: (state, action: PayloadAction<I_cond_map>): void => {
      state.nodes.init_s__cond_map = action.payload;
    },

    // -- ACTIVE
    set_s__exp_nodes__is_active__cond_map: (state, action: PayloadAction<I_cond_map>): void => {
      state.nodes.is_active__cond_map = action.payload;
    },

    set_s__exp_node__is_active: (state, action: PayloadAction<{ uid: string; cond: boolean }>): void => {
      state.nodes.is_active__cond_map = {
        ...state.nodes.init_s__cond_map,
        [action.payload.uid]: action.payload.cond,
      };
    },

    // -- FOLD
    set_s__exp_f_nodes__is_fold__cond_map: (state, action: PayloadAction<I_cond_map>): void => {
      state.nodes.is_fold__cond_map = action.payload;
    },
    set_s__exp_f_node__is_fold: (state, action: PayloadAction<{ uid: string; cond: boolean }>): void => {
      state.nodes.is_fold__cond_map = {
        ...state.nodes.is_fold__cond_map,
        [action.payload.uid]: action.payload.cond,
      };
    },
    set_s__exp_f_node__is_toggle: (state, action: PayloadAction<{ uid: string }>): void => {
      state.nodes.is_fold__cond_map = {
        ...state.nodes.is_fold__cond_map,
        [action.payload.uid]: !state.nodes.is_fold__cond_map[action.payload.uid],
      };
    },

    // -- INIT, ACTIVE, FOLD
    add_s__exp_node__init_conds: (state, action: PayloadAction<I_exp_node>) => {
      state.nodes.init_s__cond_map = {
        ...state.nodes.init_s__cond_map,
        [action.payload.uid]: false,
      };

      state.nodes.is_active__cond_map = {
        ...state.nodes.is_active__cond_map,
        [action.payload.uid]: false,
      };

      if (action.payload.type === FOLDER_TYPE) {
        state.nodes.is_fold__cond_map = {
          ...state.nodes.is_fold__cond_map,
          [action.payload.uid]: false,
        };
      }
    },
    del_s__exp_node__init_conds: (state, action: PayloadAction<string>) => {
      delete state.nodes.init_s__cond_map[action.payload];
      delete state.nodes.is_active__cond_map[action.payload];
      delete state.nodes.is_fold__cond_map[action.payload];
    },

    // O NODE
    // -- ARR
    set_s__exp_o_nodes__arr: (state, action: PayloadAction<I_exp_node[]>) => {
      state.o_nodes.arr = action.payload;
    },
    add_s__exp_o_node__obj: (state, action: PayloadAction<{ uid: string }>) => {
      const is_dupl__node_ref = state.o_nodes.arr.find((el) => el.uid === action.payload.uid);
      if (!is_dupl__node_ref) {
        const discovered = state.nodes.arr.find((node) => node.uid === action.payload.uid);
        if (discovered) {
          state.o_nodes.arr = [...state.o_nodes.arr, discovered];
        }
      }
    },
    del_s__exp_o_node__uid: (state, action: PayloadAction<I_exp_node_ref>) => {
      state.o_nodes.arr = state.o_nodes.arr.filter((node) => node.uid !== action.payload.uid);
    },

    // -- OPEN
    set_s__exp_o_node__is_open: (state, action: PayloadAction<{ uid: string; cond: boolean }>) => {
      state.o_nodes.is_open__cond_map = {
        ...state.o_nodes.is_open__cond_map,
        [action.payload.uid]: action.payload.cond,
      };
    },
    set_s__exp_o_nodes__is_open__cond_map: (state, action: PayloadAction<I_cond_map>) => {
      state.o_nodes.is_open__cond_map = action.payload;
    },

    // MENUS
    // -- CLICK
    set_s__exp_menus__is_click__cond_map: (state, action: PayloadAction<I_cond_map>): void => {
      state.menus.is_click__cond_map = action.payload;
    },
    set_s__exp_menu__is_click: (state, action: PayloadAction<{ uid: string; cond: boolean }>) => {
      state.menus.is_click__cond_map = {
        ...state.menus.is_click__cond_map,
        [action.payload.uid]: action.payload.cond,
      };
    },
    set_s__exp_menu_item__open_modal: (state): void => {
      state.menus.is_click__cond_map = {
        ...state.menus.is_click__cond_map,
        [layout_menu_items__arr[0].id]: true,
      };
    },

    set_s__exp_menu_item__close_modal: (state): void => {
      state.menus.is_click__cond_map = {
        ...state.menus.is_click__cond_map,
        [layout_menu_items__arr[0].id]: false,
      };
    },

    // TOOLS
    // -- CLICK
    set_s__exp_tools__is_click__cond_map: (state, action: PayloadAction<I_cond_map>): void => {
      state.tools.is_click__cond_map = action.payload;
    },
    set_s__exp_tool__is_click: (state, action: PayloadAction<{ uid: string; cond: boolean }>): void => {
      state.tools.is_click__cond_map = {
        ...init_s__exp_tools__cond_map,
        [action.payload.uid]: action.payload.cond,
      };
    },
    init_s__exp_tools__is_click__cond_map: (state): void => {
      state.tools.is_click__cond_map = init_s__exp_tools__cond_map;
    },

    // TREES
    // -- LIST
    set_s__exp_trees__arr: (state, action: PayloadAction<I_exp_r_node[]>): void => {
      state.trees.arr = action.payload;
    },
    add_s__exp_tree__obj: (state, action: PayloadAction<I_exp_r_node>) => {
      state.trees.arr = [...state.trees.arr, action.payload];
    },
    del_s__exp_tree__obj: (state, action: PayloadAction<I_exp_r_node>) => {
      state.trees.arr = state.trees.arr.filter((tree) => tree.uid !== action.payload.uid);
    },
  },
});

export const {
  set_s__exp__init_mount,

  // ROOTS
  set_s__exp_r_nodes__arr,
  add_s__exp_r_node__obj,
  del_s__exp_r_node__obj,
  set_s__exp_r_nodes__is_active__cond_map,
  set_s__exp_r_node__is_active,

  // NODES
  // -- INIT MAP
  set_s__exp_nodes__init_cond_map,
  // -- ACTIVE MAP
  set_s__exp_nodes__is_active__cond_map,
  set_s__exp_node__is_active,
  // -- FOLD/UNFOLD MAP
  set_s__exp_f_nodes__is_fold__cond_map,
  set_s__exp_f_node__is_fold,
  set_s__exp_f_node__is_toggle,
  // -- INIT, ACTIVE, FOLD MAP
  add_s__exp_node__init_conds,
  del_s__exp_node__init_conds,

  // Open Nodes
  set_s__exp_o_nodes__arr,
  add_s__exp_o_node__obj,
  del_s__exp_o_node__uid,
  set_s__exp_o_nodes__is_open__cond_map,
  set_s__exp_o_node__is_open,

  // MENUS
  set_s__exp_menus__is_click__cond_map,
  set_s__exp_menu__is_click,
  set_s__exp_menu_item__open_modal,
  set_s__exp_menu_item__close_modal,

  // TOOLS
  set_s__exp_tools__is_click__cond_map,
  set_s__exp_tool__is_click,
  init_s__exp_tools__is_click__cond_map,

  // TREE
  set_s__exp_trees__arr,
  add_s__exp_tree__obj,
  del_s__exp_tree__obj,
} = Slice.actions;
export const selectExplorer = (state: RootState) => state.explorer;
export default Slice.reducer;
