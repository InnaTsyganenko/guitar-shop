import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import ModalReviewThanks from './modal-review-thanks';
import ModalOverlay from '../modal-overlay/modal-overlay';

const mockStore = configureMockStore();

const store = mockStore({
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

describe('Component: ModalReviewThanks', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

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
