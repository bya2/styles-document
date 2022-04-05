import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store"
import type { expTree, expRoot } from "@/models/Explorer";
import type { cond } from "@models/reusables";

interface expRootListState {
  arr: expRoot[];
  cond: cond;
}

interface expTreeListState {
  arr: expTree[];
  cond: cond;
}

interface expRefListState {
  ref__input__new_document?: React.LegacyRef<any>;
  ref__input__new_folder?: React.LegacyRef<any>;
}

interface ExpState {
  roots: expRootListState;
  trees: expTreeListState;
  refs: expRefListState;
}

const name: string = "explorer";

const initialState: ExpState = {
  roots: {
    arr: [],
    cond: {},
  },
  trees : {
    arr: [],
    cond: {},
  },
  refs: {
    ref__input__new_document: undefined,
    ref__input__new_folder: undefined,
  },
};

export const Slice = createSlice({
  name,
  initialState,
  reducers: {
    set_s__exp_roots: (state, action: PayloadAction<expRootListState>): void => {
      state.roots = action.payload;
    },
    set_s__exp_trees: (state, action: PayloadAction<expTreeListState>): void => {
      state.trees = action.payload;
    },
    set_s__exp_refs: (state, action: PayloadAction<expRefListState>): void => {
      const { ref__input__new_document, ref__input__new_folder } = action.payload;
      if (ref__input__new_document || ref__input__new_folder) {
        state.refs = action.payload;
      }
    }
  }
});

export const { set_s__exp_roots, set_s__exp_trees, set_s__exp_refs } = Slice.actions;
export const selectExplorer = (state: RootState) => state.explorer;
export default Slice.reducer;