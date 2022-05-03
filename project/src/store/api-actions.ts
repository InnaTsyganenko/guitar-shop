import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { loadGuitars, loadGuitarById } from './guitars-data/guitars-data';
import { APIRoute } from '../const';
import {AppDispatch, State} from '../types/state.js';
import {Guitars, PickedId, GuitarById} from '../types/guitars';
import {errorHandle} from '../services/error-handle';

export const fetchGuitarsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitars',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Guitars>(APIRoute.Guitars);
      dispatch(loadGuitars(data));
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
      const {data} = await api.get<GuitarById>(`${APIRoute.GuitarById}${pickedId}`);
      dispatch(loadGuitarById(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
