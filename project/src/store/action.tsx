import { createAction } from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_GUITARS: 'data/loadGuitars',
  LOAD_GUITAR_BY_ID: 'data/loadGuitarById',
  GET_ID_GUITAR: 'getIdGuitar',
  RESET_STATE: 'resetState',
};

export const loadGuitars = createAction(ActionType.LOAD_GUITARS, (guitars) => ({
  payload: guitars,
}));

export const loadGuitarById = createAction(ActionType.LOAD_GUITAR_BY_ID, (guitar) => ({
  payload: guitar,
}));

export const getIdGuitar = createAction(ActionType.GET_ID_GUITAR, (pickedId) => ({
  payload: pickedId,
}));

export const resetState = createAction(ActionType.RESET_STATE);
