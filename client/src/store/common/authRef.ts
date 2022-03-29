import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@src/store"

type authRefValue = {
  id: string | null,
  hashed: string | null,
};

interface authRefState {
  value__obj: authRefValue;
}

const initialState: authRefState = {
  value__obj: {
    id: null,
    hashed: null,
  },
}

export const authRefSlice = createSlice({
  name: "authRef",
  initialState,
  reducers: {
    assignRef: (state, action: PayloadAction<authRefValue>): void => {
      state.value__obj = action.payload;
    }
  }
})

export const { assignRef } = authRefSlice.actions;
export const selectAuthRef = (state: RootState) => state.authRef.value__obj;
export default authRefSlice.reducer;