import { DEFAULT_PAGE_CATALOG } from './../../const';
import {createSlice} from '@reduxjs/toolkit';
import { GuitarsOperations } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: GuitarsOperations = {
  pickedId: 0,
  currentPageCatalog: DEFAULT_PAGE_CATALOG,
};

export const guitarsOperations = createSlice({
  name: NameSpace.guitars,
  initialState,
  reducers: {
    getCurrentPageCatalog: (state, action) => {
      state.currentPageCatalog = action.payload;
    },
    getIdGuitar: (state, action) => {
      state.pickedId = action.payload;
    },
  },
});

export const { getCurrentPageCatalog, getIdGuitar } = guitarsOperations.actions;
