import {createSlice} from '@reduxjs/toolkit';
import { GuitarsOperations } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: GuitarsOperations = {
  pickedId: 0,
};

export const guitarsOperations = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    getIdGuitar: (state, action) => {
      state.pickedId = action.payload;
    },
  },
});

export const {getIdGuitar} = guitarsOperations.actions;
