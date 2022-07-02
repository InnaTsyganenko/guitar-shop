import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import ModalReviewThanks from './modal-review-thanks';
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

describe('Component: ModalReviewThanks', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalOverlay onModalCloseClick={jest.fn()} >
            <ModalReviewThanks onModalThanksCloseClick={jest.fn()} />
          </ModalOverlay>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за ваш отзыв/i)).toBeInTheDocument();
  });
});
