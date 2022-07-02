import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import ModalSuccessAdd from './modal-success-add';
import ModalOverlay from '../modal-overlay/modal-overlay';
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

describe('Component: ModalSuccessAdd', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalOverlay onModalCloseClick={jest.fn()}>
            <ModalSuccessAdd onModalSuccessAddCloseClick={jest.fn()}/>
          </ModalOverlay>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });
});
