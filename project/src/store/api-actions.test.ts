import { makeFakeGuitars, makeFakeGuitar, makeFakeCommentPost } from './../utils/mock';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import { fetchGuitarByIdAction, pushCommentAction } from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  const store = mockStore({
    GUITARS: {pickedId: 1, currentPageCatalog: 1},
  });

  it('should dispatch LoadGuitars when GET /guitars', async () => {
    const mockGuitars = makeFakeGuitars;
    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, mockGuitars);

    //await store.dispatch(fetchGuitarsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain('DATA/fetchGuitars/pending');
  });

  it('should dispatch LoadGuitarById when GET /guitars/1', async () => {
    const mockGuitar = makeFakeGuitar();
    mockAPI
      .onGet(APIRoute.GuitarById)
      .reply(200, mockGuitar);

    await store.dispatch(fetchGuitarByIdAction(1));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain('DATA/fetchGuitarById/pending');
  });

  it('should dispatch PushReview when POST /comments', async () => {
    const fakeComment = makeFakeCommentPost();

    mockAPI
      .onPost(APIRoute.Comments)
      .reply(200, fakeComment);

    await store.dispatch(pushCommentAction(fakeComment));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain('DATA/pushComment/pending');
  });
});
