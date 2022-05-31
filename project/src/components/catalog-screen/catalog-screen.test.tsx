import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import CatalogScreen from './catalog-screen';
import { makeFakeGuitars } from './../../utils/mock';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import { fetchGuitarsAction } from '../../store/api-actions';
import {APIRoute} from '../../const';
import {State} from '../../types/state';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  DATA: {guitars: makeFakeGuitars},
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

const history = createMemoryHistory();

describe('Component: CatalogScreen', () => {
  it('should render correctly', () => {
    const mockGuitars = makeFakeGuitars;
    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, mockGuitars);

    store.dispatch(fetchGuitarsAction());

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
