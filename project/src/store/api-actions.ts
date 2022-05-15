import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadGuitars, loadGuitarById, setTotalCountGuitarsFromResponse, setIsNewCommentPush } from './guitars-data/guitars-data';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state.js';
import { PickedId, GuitarById, CurrentPageCatalog, CommentPost, Guitar } from '../types/guitars';
import { errorHandle  } from '../services/error-handle';
import { GUITARS_QUANTITY_FOR_DISPLAY } from '../const';

export const fetchGuitarsAction = createAsyncThunk<void, CurrentPageCatalog, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitars',
  async (currentPageCatalog, {dispatch, extra: api}) => {
    try {
      const response = await api.get(`${APIRoute.Guitars}?_start=${currentPageCatalog * GUITARS_QUANTITY_FOR_DISPLAY - GUITARS_QUANTITY_FOR_DISPLAY}&_limit=${GUITARS_QUANTITY_FOR_DISPLAY}&_embed=comments`);

      const filtredGuitars = response.data.filter((item: Guitar) => item.name);

      dispatch(setTotalCountGuitarsFromResponse(response.headers['x-total-count']));
      dispatch(loadGuitars(filtredGuitars));

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

export const pushCommentAction = createAsyncThunk<void, CommentPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/pushComment',
  async ({guitarId, userName, advantage, disadvantage, comment, rating}, {dispatch, extra: api}) => {
    try {
      await api.post<GuitarById>(APIRoute.Comments, {guitarId, userName, advantage, disadvantage, comment, rating});
      dispatch(setIsNewCommentPush(true));

      const {data} = await api.get<GuitarById>(`${APIRoute.GuitarById}${guitarId}?_embed=comments`);
      dispatch(loadGuitarById(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
