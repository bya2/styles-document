import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authRefReducer from "./common/authRef";
import resizerPosReducer from "./reusable/resizerPos";

// STORE
export const store = configureStore({
  reducer: {
    authRef: authRefReducer,
    resizerPos: resizerPosReducer,
  }
})

// ROOT STATE, DISPATCH TYPE
export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch;

// HOOKS TYPE
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
