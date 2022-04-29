import { createReducer } from '@reduxjs/toolkit';
import { getIdGuitar } from '../action';
import { GuitarsOperations } from '../../types/state';

const initialState: GuitarsOperations = {
  pickedId: '0',
};

const guitarsOperations = createReducer(initialState, (builder) => {
  builder
    .addCase(getIdGuitar, (state, action) => {
      state.pickedId = action.payload;
    });
});

export {guitarsOperations};
