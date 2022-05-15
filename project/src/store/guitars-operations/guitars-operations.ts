import { ValuesForInitialState, DEFAULT_CATALOG_PAGE } from './../../const';
import {createSlice} from '@reduxjs/toolkit';
import { GuitarsOperations } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: GuitarsOperations = {
  pickedId: ValuesForInitialState.InitialTotalCountGuitars,
  currentPageCatalog: DEFAULT_CATALOG_PAGE,
  isModalClose: true,
};

export const guitarsOperations = createSlice({
  name: NameSpace.guitars,
  initialState,
  reducers: {
    setCurrentPageCatalog: (state, action) => {
      state.currentPageCatalog = action.payload;
    },
    getIdGuitar: (state, action) => {
      state.pickedId = action.payload;
    },
    setModalWindowState: (state, action) => {
      state.isModalClose = action.payload;
    },
  },
});

export const { setCurrentPageCatalog, getIdGuitar, setModalWindowState } = guitarsOperations.actions;
