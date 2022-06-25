import { InitialStateValues, DEFAULT_CATALOG_PAGE } from './../../const';
import {createSlice} from '@reduxjs/toolkit';
import { GuitarsOperations } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: GuitarsOperations = {
  pickedId: InitialStateValues.InitialPickedId,
  currentPageCatalog: DEFAULT_CATALOG_PAGE,
  isModalOpen: false,
  guitarsInCart: [],
  isGuitarAddedInCart: false,
};

export const guitarsOperations = createSlice({
  name: NameSpace.guitars,
  initialState,
  reducers: {
    setCurrentPageCatalog: (state, action) => {
      state.currentPageCatalog = action.payload;
      // state.guitarsInCart = [];
    },
    setGuitarId: (state, action) => {
      state.pickedId = action.payload;
    },
    setModalWindowState: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setGuitarInCart: (state, action) => {
      state.guitarsInCart = state.guitarsInCart.some((obj) => obj.id === action.payload.id)
        ? state.guitarsInCart.map((item) => (item.id === action.payload.id) ? action.payload : item)
        : [...state.guitarsInCart, action.payload];
    },
    setGuitarInCartState: (state, action) => {
      state.isGuitarAddedInCart = action.payload;
    },
    deleteGuitarFromCart: (state, action) => {
      state.guitarsInCart = [...state.guitarsInCart].filter((item) => item.id !== action.payload);
    },
    increaseGuitarCartQt: (state, action) => {
      state.guitarsInCart.find((item) => item.id === action.payload).guitarQt++;
    },
    decreaseGuitarCartQt: (state, action) => {
      state.guitarsInCart.find((item) => item.id === action.payload).guitarQt--;
    },
  },
});

export const {
  setCurrentPageCatalog,
  setGuitarId,
  setModalWindowState,
  setGuitarInCart,
  setGuitarInCartState,
  deleteGuitarFromCart,
  increaseGuitarCartQt,
  decreaseGuitarCartQt,
} = guitarsOperations.actions;
