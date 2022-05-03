import { Guitar } from './../../types/guitars';
import {createSlice} from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: GuitarsData = {
  guitars: [],
  guitarById: {} as Guitar,
  isDataLoaded: false,
};

export const guitarsData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
    loadGuitarById: (state, action) => {
      state.guitarById = action.payload;
    },
  },
});

export const {loadGuitars, loadGuitarById} = guitarsData.actions;
