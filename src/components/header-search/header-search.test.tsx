import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import HeaderSearch from './header-search';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

describe('Component: Header', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderSearch />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить поиск/i)).toBeInTheDocument();
  });
});
