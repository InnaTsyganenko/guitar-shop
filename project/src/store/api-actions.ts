import { DEFAULT_CATALOG_PAGE, AppRoute } from './../const';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadGuitars, loadGuitarById, setTotalCountGuitarsFromResponse, setIsNewCommentPush, setGuitarLoadStatus, setGuitarsLoadStatus, loadSearchResults, loadGuitarsSortFilter, setLoadGuitarsSortFilter } from './guitars-data/guitars-data';
import { setCurrentPageCatalog, setModalWindowState } from './guitars-operations/guitars-operations';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state.js';
import { Guitars, PickedId, GuitarById, CommentPost, Guitar, FilterAndSortOptions } from '../types/guitars';
import { errorHandle  } from '../services/error-handle';
import browserHistory from '../browser-history';

const history = browserHistory;

export const fetchGuitarsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/fetchGuitars',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const response = await api.get<Guitars>(`${APIRoute.Guitars}?_embed=comments`);

      const filtredGuitars = response.data.filter((item: Guitar) => item.name);
      dispatch(setGuitarsLoadStatus(true));
      dispatch(setTotalCountGuitarsFromResponse(filtredGuitars.length));
      dispatch(loadGuitars(filtredGuitars));

    } catch (error) {
      dispatch(setGuitarsLoadStatus(false));
      errorHandle(error);
    }
  },
);

export const fetchGuitarsSortFilterAction = createAsyncThunk<void, FilterAndSortOptions, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/fetchGuitarsSortFilter',
  async ({sortType, sortDirection, filterMinPrice, filterMaxPrice, filterGuitarType, filterStringCount}, {dispatch, extra: api}) => {
    try {
      const response = await api.get<Guitars>(`${APIRoute.Guitars}?_embed=comments${sortType !== '' ? `&_sort=${sortType}&_order=${sortDirection}` : ''}${(filterMinPrice > 0) && (filterMaxPrice > 0) ? `&price_gte=${filterMinPrice}&price_lte=${filterMaxPrice}` : ''}${filterGuitarType !== '' ? `&_type=${filterGuitarType}` : ''}`);

      const filtredGuitars = response.data.filter((item: Guitar) => item.name);

      dispatch(setLoadGuitarsSortFilter(true));
      dispatch(setTotalCountGuitarsFromResponse(filtredGuitars.length));
      dispatch(loadGuitarsSortFilter(filtredGuitars));
      dispatch(setCurrentPageCatalog(DEFAULT_CATALOG_PAGE));
      history.push(`${AppRoute.Catalog}${DEFAULT_CATALOG_PAGE}`);

    } catch (error) {
      dispatch(setGuitarsLoadStatus(false));
      errorHandle(error);
    }
  },
);

export const fetchGuitarByIdAction = createAsyncThunk<void, PickedId, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/fetchGuitarById',
  async (pickedId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<GuitarById>(`${APIRoute.GuitarById}${pickedId}?_embed=comments`);
      dispatch(setGuitarLoadStatus(true));
      dispatch(loadGuitarById(data));
    } catch (error) {
      dispatch(setGuitarLoadStatus(false));
      errorHandle(error);
    }
  },
);

export const pushCommentAction = createAsyncThunk<void, CommentPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/pushComment',
  async ({guitarId, userName, advantage, disadvantage, comment, rating}, {dispatch, extra: api}) => {
    try {
      await api.post<GuitarById>(APIRoute.Comments, {guitarId, userName, advantage, disadvantage, comment, rating});
      dispatch(setIsNewCommentPush(true));
      dispatch(setModalWindowState(true));

      const {data} = await api.get<GuitarById>(`${APIRoute.GuitarById}${guitarId}?_embed=comments`);
      dispatch(loadGuitarById(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchGuitarsBySearchAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/fetchGuitarsBySearch',
  async (searchRequest, {dispatch, extra: api}) => {
    try {
      const response = await api.get<Guitars>(`${APIRoute.Guitars}?name_like=${searchRequest}`);
      const filtredGuitars = response.data.filter((item: Guitar) => item.name);
      dispatch(loadSearchResults(filtredGuitars));

    } catch (error) {
      errorHandle(error);
    }
  },
);
