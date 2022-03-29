import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@src/store"

interface resizerPosState {
  value__num: number;
}

const initialState: resizerPosState = {
  value__num: 300,
}

export const resizerPosSlice = createSlice({
  name: "resizerPos",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>): void => {
      state.value__num = action.payload;
    }
  }
})

export const { incrementByAmount } = resizerPosSlice.actions;
export const selectResizerPos = (state: RootState) => state.resizerPos.value__num;
export default resizerPosSlice.reducer;