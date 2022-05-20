import { Guitar } from './../../types/guitars';
import { createSlice } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { NameSpace, InitialStateValues } from '../../const';

const initialState: GuitarsData = {
  guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
  guitars: [],
  guitarById: {} as Guitar,
  guitarComments: [],
  isGuitarsLoaded: true,
  isGuitarLoaded: true,
  isCommentPushed: false,
  search: '',
  searchResults: [],
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
    },
    setGuitarsLoadStatus: (state, action) => {
      state.isGuitarsLoaded = action.payload;
    },
    loadGuitarById: (state, action) => {
      state.guitarById = action.payload;
    },
    setGuitarLoadStatus: (state, action) => {
      state.isGuitarLoaded = action.payload;
    },
    setIsNewCommentPush: (state, action) => {
      state.isCommentPushed = action.payload;
    },
    setSearchRequest: (state, action) => {
      state.search = action.payload;
    },
    loadSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { loadGuitars, loadGuitarById, setTotalCountGuitarsFromResponse, setIsNewCommentPush, setGuitarsLoadStatus, setGuitarLoadStatus, setSearchRequest, loadSearchResults } = guitarsData.actions;
