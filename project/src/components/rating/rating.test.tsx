import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Rating from './rating';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {isDataLoaded: true},
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

describe('Component: ProductReviews', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Rating  rating={1} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Оценка/i)).toBeInTheDocument();
  });
});


