import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadGuitarById, setTotalCountGuitarsFromResponse, setIsNewCommentPush, setGuitarLoadStatus, loadSearchResults, loadGuitarsSortFilter, setLoadGuitarsSortFilter, setGuitarsMinPrice, setGuitarsMaxPrice } from './guitars-data/guitars-data';
import { setModalWindowState } from './guitars-operations/guitars-operations';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state.js';
import { Guitars, PickedId, GuitarById, CommentPost, Guitar, FilterAndSortOptions } from '../types/guitars';
import { errorHandle  } from '../services/error-handle';


export const fetchGuitarsAction = createAsyncThunk<void, FilterAndSortOptions, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA/fetchGuitars',
  async ({sortType, sortOrder, priceMin, priceMax, guitarTypes, stringQt}, {dispatch, extra: api}) => {
    try {
      const queryTypes = guitarTypes.map((item) => `&type=${item}`).join('');
      const response = await api.get<Guitars>(`${APIRoute.Guitars}?_embed=comments${sortType !== '' ? `&_sort=${sortType}&_order=${sortOrder}` : ''}${(priceMin > 0) ? `&price_gte=${priceMin}` : ''}${(priceMax > 0) ? `&price_lte=${priceMax}` : ''}${guitarTypes.length !== 0 ? `&type=${queryTypes}` : ''}`);

      const filtredGuitars = response.data.filter((item: Guitar) => item.name);
      // if (stringQt.length > 0) {
      // filtredGuitars = filtredGuitars.filter((guitar) => stringQt?.includes((guitar.stringCount).toString() as keyof object));
      // }

      if ((sortType === '') && (stringQt.length === 0) &&(sortOrder === '') && (priceMin === 0) && (priceMax === 0) && (guitarTypes.length === 0)) {
        dispatch(setGuitarsMinPrice(Math.min(...filtredGuitars.map((item) => item.price))));
        dispatch(setGuitarsMaxPrice(Math.max(...filtredGuitars.map((item) => item.price))));
      }

      dispatch(setTotalCountGuitarsFromResponse(filtredGuitars.length));
      dispatch(loadGuitarsSortFilter(filtredGuitars));
      dispatch(setLoadGuitarsSortFilter(true));


    } catch (error) {
      dispatch(setLoadGuitarsSortFilter(false));
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
