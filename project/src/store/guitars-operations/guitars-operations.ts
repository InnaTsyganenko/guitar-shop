import { InitialStateValues, DEFAULT_CATALOG_PAGE } from './../../const';
import {createSlice} from '@reduxjs/toolkit';
import { GuitarsOperations } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: GuitarsOperations = {
  pickedId: InitialStateValues.InitialTotalCountGuitars,
  currentPageCatalog: DEFAULT_CATALOG_PAGE,
  isModalOpen: false,
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
      state.isModalOpen = action.payload;
    },
  },
});

export const { setCurrentPageCatalog, getIdGuitar, setModalWindowState } = guitarsOperations.actions;
