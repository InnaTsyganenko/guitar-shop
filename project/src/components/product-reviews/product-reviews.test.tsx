import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import ProductReviews from './product-reviews';
import thunk from 'redux-thunk';
import { makeFakeGuitar } from '../../utils/mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

describe('Component: ProductReviews', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const guitar = makeFakeGuitar();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductReviews currentGuitar={guitar} reviews={[]} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });
});

