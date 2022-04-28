import { createReducer } from '@reduxjs/toolkit';
import { getIdGuitar, resetState } from '../action';

const initialState = {
  pickedId: 0,
};

const guitarsOperations = createReducer(initialState, (builder) => {
  builder
    .addCase(getIdGuitar, (state, action) => {
      state.pickedId = action.payload;
    })
    .addCase(resetState, (state) => {
      state.type = initialState.type;
    });
});

export {guitarsOperations};
