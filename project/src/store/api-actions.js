import { loadGuitars, loadGuitarById } from './action';
import { APIRoute } from '../const';

export const fetchGuitarList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.GUITARS)
    .then(({data}) => dispatch(loadGuitars(data.map((element) => element))))
);

export const fetchQuestById = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.GUITAR_BY_ID}${id}`)
    .then(({data}) => dispatch(loadGuitarById(data)))
);
