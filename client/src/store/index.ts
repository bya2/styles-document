import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import explorerReducer from "./common/explorer";
import activityReducer from "./common/activity";
import bookmarkReducer from "./common/bookmark";
import authReducer from "./common/auth";
import resizerReducer from "./reusable/resizer";
import modalReducer from "./reusable/modal";

// STORE
export const store = configureStore({
  reducer: {
    explorer: explorerReducer,
    activity: activityReducer,
    bookmark: bookmarkReducer,
    auth: authReducer,
    resizer: resizerReducer,
    modal: modalReducer,
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
