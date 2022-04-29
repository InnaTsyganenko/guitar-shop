import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { loadGuitars, loadGuitarById } from '../action';

const initialState: GuitarsData = {
  guitars: [],
  guitarById: {},
  isDataLoaded: false,
};


const guitarsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadGuitarById, (state, action) => {
      state.guitarById = action.payload;
    });
});

export {guitarsData};
