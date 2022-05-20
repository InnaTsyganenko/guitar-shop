import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import ProductScreen from './product-screen';
import { makeFakeGuitar } from '../../utils/mock';
import { waitFor } from '@testing-library/react';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import { fetchGuitarByIdAction } from '../../store/api-actions';
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
  DATA: {guitarById: makeFakeGuitar()},
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

const history = createMemoryHistory();

describe('Component: ProductScreen', () => {
  it('should render correctly', async() => {
    const mockGuitar = makeFakeGuitar();
    mockAPI
      .onGet(APIRoute.GuitarById)
      .reply(200, mockGuitar);

    await store.dispatch(fetchGuitarByIdAction(1));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => screen.findByText(/Характеристики/i));
  });
});
