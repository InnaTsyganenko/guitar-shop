import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Spinner from './spinner';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  DATA: {},
  GUITARS: {pickedId: 1, currentPageCatalog: 1, isModalOpen: true},
});

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Spinner />
          <span>Spinner component</span>
        </HistoryRouter>
      </Provider>,
    );

    const textElement = screen.getByText('Spinner component');

    expect(textElement).toBeInTheDocument();
  });
});
