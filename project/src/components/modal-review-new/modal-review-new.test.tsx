import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import ModalReviewNew from './modal-review-new';
import { makeFakeGuitar } from '../../utils/mock';
import thunk from 'redux-thunk';
import ModalOverlay from '../modal-overlay/modal-overlay';

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

const guitar = makeFakeGuitar();

describe('Component: ModalReviewNew', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalOverlay onModalCloseClick={jest.fn()} >
            <ModalReviewNew guitar={guitar} onModalCommentCloseClick={jest.fn()} />
          </ModalOverlay>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/modal-review-new/i)).toBeInTheDocument();
  });
});

