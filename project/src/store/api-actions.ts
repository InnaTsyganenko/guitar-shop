import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadGuitars, loadGuitarById, getTotalCountGuitars } from './guitars-data/guitars-data';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state.js';
import { PickedId, GuitarById, CurrentPageCatalog } from '../types/guitars';
import { errorHandle  } from '../services/error-handle';
import { GUITARS_COUNT_FOR_RENDER } from '../const';

export const fetchGuitarsAction = createAsyncThunk<void, CurrentPageCatalog, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitars',
  async (currentPageCatalog, {dispatch, extra: api}) => {
    try {
      const response = await api.get<JSON>(`${APIRoute.Guitars}?_start=${currentPageCatalog * GUITARS_COUNT_FOR_RENDER - GUITARS_COUNT_FOR_RENDER}&_limit=${GUITARS_COUNT_FOR_RENDER}&_embed=comments`);

      dispatch(getTotalCountGuitars(response.headers['x-total-count']));
      dispatch(loadGuitars(response.data));

    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchGuitarByIdAction = createAsyncThunk<void, PickedId, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitarById',
  async (pickedId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<GuitarById>(`${APIRoute.GuitarById}${pickedId}?_embed=comments`);
      dispatch(loadGuitarById(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
