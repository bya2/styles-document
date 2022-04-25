import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store"

// Type
interface ResizerStateMap {
  aside_posX__num: null | number;
  slice_posX__num: null | number;
}

// Value
const initResizerStateMap = {
  aside_pos__num: 300,
  slice_pos__num: 300,
};

const resizerAsidePos__name = "resizerAsidePos";
const resizerSlicePos__name = "resizerSlicePos";

const resizerAsidePos__json: string | null = window.localStorage.getItem(resizerAsidePos__name);
const resizerSlicePos__json: string | null = window.localStorage.getItem(resizerSlicePos__name);

const resizerAsidePos: number = resizerAsidePos__json ? JSON.parse(resizerAsidePos__json) * 1 : initResizerStateMap.aside_pos__num;
const resizerSlicePos: number = resizerSlicePos__json ? JSON.parse(resizerSlicePos__json) * 1 : initResizerStateMap.slice_pos__num;

// Slice Props
const name: string = "resizerPos";

const initialState: ResizerStateMap = {
  aside_posX__num: resizerAsidePos,
  slice_posX__num: resizerSlicePos,
}

export const resizerSlice = createSlice({
  name,
  initialState,
  reducers: {
    set_s__aside_posX__num: (state, action: PayloadAction<number>): void => {
      state.aside_posX__num = action.payload;
      window.localStorage.setItem(resizerAsidePos__name, action.payload + "");
    },
    set_s__slice_posX__num: (state, action: PayloadAction<number>): void => {
      state.slice_posX__num = action.payload;
      window.localStorage.setItem(resizerSlicePos__name, action.payload + "");
    },
  }
})

export const { set_s__aside_posX__num, set_s__slice_posX__num } = resizerSlice.actions;
export const selectResizerAsidePos = (state: RootState) => state.resizer.aside_posX__num;
export const selectResizerSlicePos = (state: RootState) => state.resizer.slice_posX__num;
export default resizerSlice.reducer;