import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import ModalCartAdd from './modal-cart-add';
import { makeFakeGuitar } from '../../utils/mock';
import thunk from 'redux-thunk';
import ModalOverlay from '../modal-overlay/modal-overlay';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const guitar = makeFakeGuitar();
const store = mockStore({
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

describe('Component: ModalCartAdd', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalOverlay onModalCloseClick={jest.fn()} >
            <ModalCartAdd guitar={guitar} onModalCloseClick={jest.fn()} />
          </ModalOverlay>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/modal-cart-add/i)).toBeInTheDocument();
  });
});

