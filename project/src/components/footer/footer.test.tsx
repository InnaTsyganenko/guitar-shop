import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Footer from './footer';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {isDataLoaded: true},
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Footer />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
  });
});

