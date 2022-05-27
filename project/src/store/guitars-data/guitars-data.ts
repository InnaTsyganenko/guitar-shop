import { Guitar } from './../../types/guitars';
import { createSlice } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { NameSpace, InitialStateValues } from '../../const';

const initialState: GuitarsData = {
  guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
  guitars: [],
  guitarsMinPrice: 0,
  guitarsMaxPrice: 0,
  guitarById: {} as Guitar,
  guitarComments: [],
  isGuitarsLoaded: true,
  isGuitarLoaded: true,
  isCommentPushed: false,
  isGuitarsSortFilterLoaded: true,
  search: '',
  searchResults: [],
  sortType: '',
  sortDirection: '',
  filterMinPrice: 0,
  filterMaxPrice: 0,
  filterGuitarType: '',
  filterStringCount: '',
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
      state.guitarsMinPrice = Math.min(...state.guitars.map((item) => item.price));
      state.guitarsMaxPrice = Math.max(...state.guitars.map((item) => item.price));
      state.filterMinPrice = state.guitarsMinPrice;
      state.filterMaxPrice = state.guitarsMaxPrice;
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
    resetSearch: (state) => {
      state.search = initialState.search;
      state.searchResults = initialState.searchResults;
    },
    loadGuitarsSortFilter: (state, action) => {
      state.guitars = action.payload;
      state.isGuitarsSortFilterLoaded = true;
    },
    setLoadGuitarsSortFilter: (state, action) => {
      state.isGuitarsSortFilterLoaded= action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
    setFilterMinPrice: (state, action) => {
      state.filterMinPrice = action.payload;
    },
    setFilterMaxPrice: (state, action) => {
      state.filterMaxPrice = action.payload;
    },
    setFilterGuitarType: (state, action) => {
      state.filterGuitarType = action.payload;
    },
    setFilterStringCount: (state, action) => {
      state.filterStringCount = action.payload;
    },
    resetFilters: (state) => {
      state.filterMinPrice = initialState.filterMinPrice;
      state.filterMaxPrice = initialState.filterMaxPrice;
      state.filterGuitarType = initialState.filterGuitarType;
      state.filterStringCount = initialState.filterStringCount;
    },
  },
});

export const {
  loadGuitars,
  loadGuitarById,
  setTotalCountGuitarsFromResponse,
  setIsNewCommentPush,
  setGuitarsLoadStatus,
  setGuitarLoadStatus,
  setSearchRequest,
  loadSearchResults,
  resetSearch,
  loadGuitarsSortFilter,
  setLoadGuitarsSortFilter,
  setSortType,
  setSortDirection,
  setFilterMinPrice,
  setFilterMaxPrice,
  setFilterGuitarType,
  setFilterStringCount,
  resetFilters,
} = guitarsData.actions;
