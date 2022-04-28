import { createReducer } from '@reduxjs/toolkit';
import { loadGuitars, loadGuitarById } from '../action';

const initialState = {
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
