import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store"

type TAuthRef = {
  id: string | null;
  hashed: string | null;
};

interface IAuthState {
  ref: TAuthRef
}

const name = "authRef";
const initialState: IAuthState = {
  ref: {
    id: null,
    hashed: null,
  }
}

export const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    assignRef: (state, action: PayloadAction<TAuthRef>): void => {
      state.ref = action.payload;
    }
  }
})

export const { assignRef } = authSlice.actions;
export const selectAuthRef = (state: RootState) => state.auth.ref;
export default authSlice.reducer;