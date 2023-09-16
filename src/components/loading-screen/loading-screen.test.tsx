import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import LoadingScreen from './loading-screen';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  DATA: {},
  GUITARS: {pickedId: 1, currentPageCatalog: 1, isModalOpen: true},
});

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoadingScreen text={'Load'} />
        </HistoryRouter>
      </Provider>,
    );

    const textElement = screen.getByText('Load');

    expect(textElement).toBeInTheDocument();
  });
});
