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
  filterGuitarTypes: [],
  filterStringCount: [],
  discountFromCoupon: 0,
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
    resetSearch: (state) => {
      state.search = initialState.search;
      state.searchResults = initialState.searchResults;
    },
    loadGuitarsSortFilter: (state, action) => {
      state.guitars = action.payload;
      state.isGuitarsSortFilterLoaded = true;
    },
    setGuitarsMinPrice: (state, action) => {
      state.guitarsMinPrice = action.payload;
    },
    setGuitarsMaxPrice: (state, action) => {
      state.guitarsMaxPrice = action.payload;
    },
    setLoadGuitarsSortFilter: (state, action) => {
      state.isGuitarsSortFilterLoaded = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
    resetSort: (state) => {
      state.sortType = initialState.sortType;
      state.sortDirection = initialState.sortDirection;
    },
    setFilterMinPrice: (state, action) => {
      state.filterMinPrice = action.payload;
    },
    setFilterMaxPrice: (state, action) => {
      state.filterMaxPrice = action.payload;
    },
    setFilterGuitarType: (state, action) => {
      state.filterGuitarTypes = action.payload;
    },
    setFilterStringCount: (state, action) => {
      state.filterStringCount = action.payload;
    },
    resetFilters: (state) => {
      state.filterMinPrice = initialState.filterMinPrice;
      state.filterMaxPrice = initialState.filterMaxPrice;
      state.filterGuitarTypes = initialState.filterGuitarTypes;
      state.filterStringCount = initialState.filterStringCount;
    },
    setDiscountFromCoupon: (state, action) => {
      state.discountFromCoupon = action.payload;
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
  resetSort,
  setFilterMinPrice,
  setFilterMaxPrice,
  setFilterGuitarType,
  setFilterStringCount,
  resetFilters,
  setGuitarsMinPrice,
  setGuitarsMaxPrice,
  setDiscountFromCoupon,
} = guitarsData.actions;
