import { Guitar } from './../../types/guitars';
import { createSlice } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { NameSpace, InitialStateValues } from '../../const';

const initialState: GuitarsData = {
  guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
  guitars: [],
  guitarById: {} as Guitar,
  guitarComments: [],
  isDataLoaded: false,
  isCommentPushed: false,
};

export const guitarsData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    setTotalCountGuitarsFromResponse: (state, action) => {
      state.guitarsTotalCount = action.payload;
    },
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
    loadGuitarById: (state, action) => {
      state.guitarById = action.payload;
    },
    setIsNewCommentPush: (state, action) => {
      state.isCommentPushed = action.payload;
    },
  },
});

export const { loadGuitars, loadGuitarById, setTotalCountGuitarsFromResponse, setIsNewCommentPush } = guitarsData.actions;
