import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import ModalReviewNew from './modal-review-new';
import { makeFakeGuitar } from '../../utils/mock';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const guitar = makeFakeGuitar();
const store = mockStore({
  DATA: {isDataLoaded: true},
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

describe('Component: ModalReviewNew', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalReviewNew guitar={guitar} onModalCommentCloseClick={jest.fn()} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });
});

