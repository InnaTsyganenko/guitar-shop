import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import ModalOverlay from './modal-overlay';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  DATA: {},
  GUITARS: {
    pickedId: 1,
    currentPageCatalog: 1,
    isModalOpen: true,
    guitarsInCart: [],
    isGuitarAddedInCart: true,
  },
});

describe('Component: ModalOverlay', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalOverlay onModalCloseClick={jest.fn()} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/close-modal/i)).toBeInTheDocument();
  });
});

