import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import CartScreen from './cart-screen';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

describe('Component: CartScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/cart/i)).toBeInTheDocument();
  });
});
