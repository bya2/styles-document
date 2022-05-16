import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { I_doc__elem } from "@/models/document";
import { I_cond_map } from "@/models/reusables";
import { fn_get__cond_map_of_objs } from "@/logic/reusable";
import { uid__doc__add_el_thumb } from "@/config/document";

export interface I_doc_s_map {
  elem: {
    list: I_doc__elem[];
    init_cond_map: I_cond_map;
    is_click__cond_map: I_cond_map;
  };
}

const name: string = "document-reducer";
const initialState: I_doc_s_map = {
  elem: {
    list: [],
    init_cond_map: {},
    is_click__cond_map: {},
  },
};
export const Slice = createSlice({
  name,
  initialState,
  reducers: {
    // LIST
    set_s__doc_elems__arr: (state, action: PayloadAction<I_doc__elem[]>) => {
      state.elem.list = action.payload;
    },

    add_s__doc_elem__str: (state, action: PayloadAction<I_doc__elem>) => {
      state.elem.list = [...state.elem.list, action.payload];
    },

    del_s__doc_elem__str: (state, action: PayloadAction<I_doc__elem>) => {
      state.elem.list = state.elem.list.filter((item) => item.uid !== action.payload.uid);
    },

    // COND MAP
    init_s__doc_elems__cond_map: (state) => {
      const init_cond_map = fn_get__cond_map_of_objs(state.elem.list, "uid");

      state.elem.init_cond_map = {
        ...init_cond_map,
        [uid__doc__add_el_thumb]: false,
      };

      state.elem.is_click__cond_map = {
        ...init_cond_map,
        [uid__doc__add_el_thumb]: false,
      };
    },

    set_s__doc_elem__is_click: (state, action: PayloadAction<{ uid: string; cond: boolean }>) => {
      const { uid, cond } = action.payload;
      state.elem.is_click__cond_map = {
        ...state.elem.is_click__cond_map,
        [uid]: cond,
      };
    },
  },
});

export const {
  set_s__doc_elems__arr,
  add_s__doc_elem__str,
  del_s__doc_elem__str,

  init_s__doc_elems__cond_map,
  set_s__doc_elem__is_click,
} = Slice.actions;
// export const selectActivity = (state: RootState) => state.activity;
export default Slice.reducer;
