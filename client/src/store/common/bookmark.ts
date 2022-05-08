import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

interface I_bm_s_map {
  items: any[];
}

const name: string = "bookmark";

const initialState: I_bm_s_map = {
  items: [],
};

export const Slice = createSlice({
  name,
  initialState,
  reducers: {
    set_s__bm__items__arr: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },

    add_s__bm__item__str: (state, action: PayloadAction<string>) => {
      state.items = [...state.items, action.payload];
    },

    del_s__bm__item__str: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
  },
});

export const { set_s__bm__items__arr, add_s__bm__item__str, del_s__bm__item__str } = Slice.actions;
export const selectActivity = (state: RootState) => state.activity;
export default Slice.reducer;
