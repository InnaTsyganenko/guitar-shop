import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import ModalCartDelete from './modal-cart-delete';
import { makeFakeGuitarCart } from '../../utils/mock';
import thunk from 'redux-thunk';
import ModalOverlay from '../modal-overlay/modal-overlay';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const guitar = makeFakeGuitarCart();
const store = mockStore({
  GUITARS: {pickedId: 1, currentPageCatalog: 1},
});

describe('Component: ModalCartDelete', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalOverlay onModalCloseClick={jest.fn()} >
            <ModalCartDelete guitar={guitar} onModalCloseClick={jest.fn()} />
          </ModalOverlay>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/modal-cart-delete/i)).toBeInTheDocument();
  });
});

