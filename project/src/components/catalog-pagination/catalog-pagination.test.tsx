import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import CatalogPagination from './catalog-pagination';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  DATA: {isDataLoaded: true},
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

describe('Component: CatalogPagination', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogPagination
            page={1}
            totalPages={3}
            onPaginationClick={jest.fn()}
          />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });
});
