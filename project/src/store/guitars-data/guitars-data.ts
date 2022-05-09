import { Guitar } from './../../types/guitars';
import { createSlice } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: GuitarsData = {
  guitarsTotalCount: 0,
  guitars: [],
  guitarById: {} as Guitar,
  guitarComments: [],
  isDataLoaded: false,
  isReviewNewPushed: false,
};

export const guitarsData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    getTotalCountGuitars: (state, action) => {
      state.guitarsTotalCount = action.payload;
    },
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
    loadGuitarById: (state, action) => {
      state.guitarById = action.payload;
    },
    setIsReviewNewPushed: (state) => {
      state.isReviewNewPushed = true;
    },
  },
});

export const {loadGuitars, loadGuitarById, getTotalCountGuitars, setIsReviewNewPushed} = guitarsData.actions;
